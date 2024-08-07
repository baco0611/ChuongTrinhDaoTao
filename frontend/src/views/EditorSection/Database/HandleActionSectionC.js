// For SECTION C

import { deleteData, getParent, postData } from "./HandleUpdateDatabase"

const sortCondition = (a, b) => {
    const aKiHieu = a.kiHieu.split('.')
    const bKiHieu = b.kiHieu.split('.')

    const aK = Number.parseInt(aKiHieu.pop())
    const bK = Number.parseInt(bKiHieu.pop())

    return aK < bK ? -1 : 1
}

const handleSplitSectionC = ({ data, setSectionCValue, idctdt }) => {

    const typeList = ['KIEN_THUC', 'KY_NANG', 'THAI_DO']

    typeList.forEach(type => {
        const dataList = data.filter(item => item.loaiMucTieu === type)
        dataList.sort(sortCondition)
        setSectionCValue(prev => {
            const dataType = prev[type]
            return {
                ...prev,
                [type]: {
                    ...dataType,
                    // data: handleChangeDataC(dataList, type, dataType.typeIndex, idctdt)
                    data: handleChangeDataC(dataList, type, dataType.typeIndex, idctdt)
                }
            }
        })     
    })
}

// Handle changing value in an input element
const handleChangeValueC = ({ type, setState, setIsDataSaved }) => {
    const element = document.querySelectorAll(`#${type} input, #${type} textarea`)

    const value = Array.from(element).map((item, index) => {
        return {
            kiHieu: `PO - ${item.getAttribute('data-typeindex')}.${index+1}`,
            noiDung: item.value,
            loaiMucTieu: type,
            id: item.getAttribute('data-id'),
            idCTDT: item.getAttribute('data-idctdt')
        }
    })

    value.sort(sortCondition)

    setIsDataSaved(false)

    setState(prev => {
        const dataType = prev[type]
        
        return {
            ...prev,
            [type]: {
                ...dataType,
                data: value
            }
        }
    })
}

// Handle changing many thing (like drop, ...)
const handleChangeDataC = (element, type, typeIndex, idCTDT) => {
    const value = element.map((item, index) => {
        return {
            kiHieu: `PO - ${typeIndex}.${index+1}`,
            noiDung: item.noiDung,
            loaiMucTieu: type,
            id: item.id,
            idCTDT: idCTDT
        }
    })

    value.sort(sortCondition)

    return value
}

const handleSaveDragC = ({ data, setData, apiURL, idCTDT }) => {
    const updateData = [...data.KIEN_THUC.data, ...data.KY_NANG.data, ...data.THAI_DO.data]
    const updateC = postData(apiURL, '/update_sectionC', { idCTDT: idCTDT, data: updateData }, 'UPDATE_SECTIONC')

    // handleSplitSectionC({
    //     data: updateC.data.data,
    //     setSectionCValue: setData.setSectionCValue,
    //     idctdt: idCTDT
    // })
}

const handleAutoSaveC = async ({id, apiURL, setData, setIsDataSaved}) => {
    const sectionCElement = JSON.parse(sessionStorage.getItem(`sectionC-${id}`))
    const updateElement = sectionCElement.filter(item => item.id != '')
    const updateC = await postData(apiURL, '/update_sectionC', { idCTDT: id, data: updateElement }, 'UPDATE_SECTIONC')

    // handleSplitSectionC({
    //     data: updateC.data.data,
    //     setSectionCValue: setData.setSectionCValue,
    //     idctdt: id
    // })

    setIsDataSaved(true)
}

const handleClickDeleteC = async ({ e, data, idctdt, apiURL, setData, type }) => {
    const parentElement = getParent(e.target, 'element')
    const inputElement = parentElement.querySelector('textarea')
    const dataset = inputElement.dataset
    
    const list = [...data]
    let deleteElement = list[dataset.index - 1]
    // console.log(deleteElement)
    list.splice(dataset.index - 1, 1)

    // Set state to performance
    setData.setSectionCValue(prev => {
        const dataType = prev[type]
        
        return {
            ...prev,
            [type]: {
                ...dataType,
                data: handleChangeDataC(list, dataType.type, dataType.typeIndex, idctdt)
            }
        }
    })


    // Call api to delete element
    deleteElement = [{
        id: deleteElement.id, 
        idCTDT: deleteElement.idCTDT
    }] 
    
    // console.log(deleteElement)
    const deleteC = await deleteData(apiURL, '/delete_sectionC', { idCTDT: idctdt, deleteData: deleteElement }, 'DELETE_SECTIONC')

    handleSplitSectionC({
        data: deleteC.data.data,
        setSectionCValue: setData.setSectionCValue,
        idctdt: idctdt
    })
}

const handleClickAddC = async({ e, idCTDT, type, setData, dataSectionC, apiURL }) => {

    const getButton = (element) => {
        if(element.tagName.toLowerCase() === 'button')
            return element

        while(element.parentElement) {
            if(element.parentElement.tagName.toLowerCase() === 'button')
                return element.parentElement
            
            element = element.parentElement
        }
    }

    console.log(e)
    // Set button into non-active to ignore many request
    const button = getButton(e)
    console.log(e)
    button.classList.add('nonactive');

    const dataType = dataSectionC[type]
    const data = dataType.data
    let list = [
        ...data,
        {
            kiHieu: '',
            loaiMucTieu: '',
            noiDung: '',
            id: '',
            idCTDT: Number.parseInt(idCTDT)
        }
    ]

    
    list = handleChangeDataC(list, dataType.type, dataType.typeIndex, idCTDT)


    // Set state to performance
    setData.setSectionCValue(prev => {
        return {
            ...prev,
            [type]: {
                ...dataType,
                data: list
            }
        }
    })

    // Call api to create
    const createElement = list.filter(item => item.id == '').map(item => {
    return {
            kiHieu:item.kiHieu, 
            noiDung: item.noiDung, 
            loaiMucTieu: item.loaiMucTieu, 
            idCTDT: item.idCTDT
        }
    })
    // console.log( { idCTDT: idCTDT, data: createElement }) 
    const createC = await postData(apiURL, '/create_sectionC', { idCTDT: idCTDT, data: createElement }, 'CREATE_SECIONC')
    // console.log(createC)

    handleSplitSectionC({
        data: createC.data.data,
        setSectionCValue: setData.setSectionCValue,
        idctdt: idCTDT
    })

    button.classList.remove('nonactive');
}

const handleUpdateSectionC = async (id, api, setData) => {
    const sectionCElement = JSON.parse(sessionStorage.getItem(`sectionC-${id}`))
    const sectionCDelete = JSON.parse(sessionStorage.getItem(`sectionC-delete-${id}`))

    const deleteElement = sectionCDelete.filter(item => item.id != '').map(item => {
        return {
            id: item.id, 
            idCTDT: item.idCTDT
        }
    })
    const createElement = sectionCElement.filter(item => item.id == '').map(item => {
        return {
                kiHieu:item.kiHieu, 
                noiDung: item.noiDung, 
                loaiMucTieu: item.loaiMucTieu, 
                idCTDT: item.idCTDT
            }
        })
    const updateElement = sectionCElement.filter(item => item.id != '')

    // debugger
    const deleteC = await deleteData(api, '/delete_sectionC', { idCTDT: id, deleteData: deleteElement }, 'DELETE_SECTIONC')
    
    // debugger
    const createC = await postData(api, '/create_sectionC', { idCTDT: id, data: createElement }, 'CREATE_SECIONC')

    // debugger
    const updateC = await postData(api, '/update_sectionC', { idCTDT: id, data: updateElement }, 'UPDATE_SECTIONC')

    if( deleteC.status == 200 &&
        createC.status == 200 &&
        updateC.status == 200) 
    {
        handleSplitSectionC({
            data: updateC.data.data,
            setSectionCValue: setData.setSectionCValue,
            idctdt: id
        })
        setData.setDeleteElement([])
    }

    return (
        deleteC.status == 200 &&
        createC.status == 200 &&
        updateC.status == 200
    )
}

export { 
    handleChangeDataC, 
    handleClickAddC, 
    handleClickDeleteC, 
    handleChangeValueC, 
    handleSplitSectionC, 
    handleUpdateSectionC,
    handleAutoSaveC,
    handleSaveDragC
}