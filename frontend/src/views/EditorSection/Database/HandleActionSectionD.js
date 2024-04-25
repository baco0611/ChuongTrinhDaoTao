import { debounce } from "lodash"
import { deleteData, getParent, postData } from "./HandleUpdateDatabase"

const sortCondition = (a, b) => {
    const aKiHieu = a.kiHieu.split('.')
    const bKiHieu = b.kiHieu.split('.')

    const aK = Number.parseInt(aKiHieu.pop())
    const bK = Number.parseInt(bKiHieu.pop())

    const cK = Number.parseInt(aKiHieu.pop())
    const dK = Number.parseInt(bKiHieu.pop())

    if(aK == bK)
        return cK < dK ? -1 : 1

    return aK < bK ? -1 : 1
}

const handleSplitSectionD = ({ data, setSectionDValue, idCTDT }) => {
    const typeList = [
        {type: 'KIEN_THUC', typeDetail: 'KIEN_THUC_DAI_HOC_HUE'},
        {type: 'KIEN_THUC', typeDetail: 'KIEN_THUC_DAI_HOC_KHOA_HOC'},
        {type: 'KIEN_THUC', typeDetail: 'KIEN_THUC_LINH_VUC'},
        {type: 'KIEN_THUC', typeDetail: 'KIEN_THUC_NHOM_NGANH'},
        {type: 'KIEN_THUC', typeDetail: 'KIEN_THUC_NGANH'},
        {type: 'KY_NANG', typeDetail: 'KY_NANG_CHUYEN_MON'},
        {type: 'KY_NANG', typeDetail: 'KY_NANG_MEM'},
        {type: 'THAI_DO', typeDetail: 'THAI_DO_CA_NHAN'},
        {type: 'THAI_DO', typeDetail: 'THAI_DO_NGHE_NGHIEP'},
        {type: 'THAI_DO', typeDetail: 'THAI_DO_XA_HOI'}
    ]

    typeList.forEach(item => {
        const type = item.type
        const typeDetail = item.typeDetail

        const value = data.filter(element => element.loaiChuanDauRa === type && element.loaiChuanDauRaChiTiet === typeDetail)
        setSectionDValue(prev => {
            const typeData = prev[type]
            const typeDetailData = typeData[typeDetail]

            return {
                ...prev,
                [type]: {
                    ...typeData,
                    [typeDetail]: {
                        ...typeDetailData,
                        data: handleChangeDataD(value, type, typeDetail, typeDetailData.typeIndex, idCTDT)
                        // data: value.sort(sortCondition)
                    }
                }
            }
        })
    })
}

const handleSplitSectionD_forMount = ({ data, setSectionDValue, idCTDT }) => {
    const typeList = [
        {type: 'KIEN_THUC', typeDetail: 'KIEN_THUC_DAI_HOC_HUE'},
        {type: 'KIEN_THUC', typeDetail: 'KIEN_THUC_DAI_HOC_KHOA_HOC'},
        {type: 'KIEN_THUC', typeDetail: 'KIEN_THUC_LINH_VUC'},
        {type: 'KIEN_THUC', typeDetail: 'KIEN_THUC_NHOM_NGANH'},
        {type: 'KIEN_THUC', typeDetail: 'KIEN_THUC_NGANH'},
        {type: 'KY_NANG', typeDetail: 'KY_NANG_CHUYEN_MON'},
        {type: 'KY_NANG', typeDetail: 'KY_NANG_MEM'},
        {type: 'THAI_DO', typeDetail: 'THAI_DO_CA_NHAN'},
        {type: 'THAI_DO', typeDetail: 'THAI_DO_NGHE_NGHIEP'},
        {type: 'THAI_DO', typeDetail: 'THAI_DO_XA_HOI'}
    ]

    typeList.forEach(item => {
        const type = item.type
        const typeDetail = item.typeDetail

        const value = data.filter(element => element.loaiChuanDauRa === type && element.loaiChuanDauRaChiTiet === typeDetail)
        // console.log(value)
        setSectionDValue(prev => {
            const typeData = prev[type]
            const typeDetailData = typeData[typeDetail]

            return {
                ...prev,
                [type]: {
                    ...typeData,
                    [typeDetail]: {
                        ...typeDetailData,
                        // data: handleChangeDataD(value, type, typeDetail, typeDetailData.typeIndex, idCTDT)
                        data: value.sort(sortCondition)
                    }
                }
            }
        })
    })
}

// Handle changing value in an input element
const handleChangeValueD = ({ typeDetail, setState, type, setIsDataSaved }) => {
    const element = document.querySelectorAll(`#${typeDetail} div.element`)

    const value = Array.from(element).map((item, index) => {
        const textarea = item.querySelector('textarea')
        const input = item.querySelector('input')
        
        return {
            kiHieu: `PLO - ${textarea.getAttribute('data-typeindex')}.${index+1}`,
            noiDung: textarea.value,
            loaiChuanDauRa: textarea.getAttribute('data-type'),
            loaiChuanDauRaChiTiet: textarea.getAttribute('data-typedetail'),
            trinhDoNangLuc: input.value != '0' ? input.value : '',
            id: textarea.getAttribute('data-id'),
            idCTDT: textarea.getAttribute('data-idCTDT')
        }
    })

    value.sort(sortCondition)

    setState(prev => {
        const typeData = prev[type]
        const typeDetailData = typeData[typeDetail]

        return {
            ...prev,
            [type]: {
                ...typeData,
                [typeDetail]: {
                    ...typeDetailData,
                    data: value
                }
            }
        }
    })

    setIsDataSaved(false)
}

const handleAutoSaveD = async({ currentId, apiURL, setData }) => {
    const sectionDElement = JSON.parse(sessionStorage.getItem(`sectionD-${currentId}`))
    const updateElement = sectionDElement.filter(item => item.id != '')
    const updateD = await postData(apiURL, '/update_sectionD', { idCTDT: currentId, data: updateElement }, 'UPDATE_SECTIOND')

    // handleSplitSectionD({
    //     data: updateD.data.data,
    //     setSectionDValue: setData.setSectionDValue,
    //     idCTDT: currentId
    // })

    setData.setIsDataSaved(true)
}

// Handle changing many thing (like drop, ...)
const handleChangeDataD = (element, type, typeDetail, typeIndex, idCTDT) => {
    const value = element.map((item, index) => {
        return {
            kiHieu: `PLO - ${typeIndex}.${index+1}`,
            noiDung: item.noiDung,
            loaiChuanDauRa: type,
            loaiChuanDauRaChiTiet: typeDetail,
            id: item.id,
            idCTDT: idCTDT,
            trinhDoNangLuc: item.trinhDoNangLuc != '0' ? item.trinhDoNangLuc : ''
        }
    })

    value.sort(sortCondition)

    return value
}

// const handleChangeDataD = debounce(de_handleChangeDataD, 250)

const handleClickAddD = async ({ data, setState, idCTDT, type, typeDetail, typeIndex, apiURL, setData }) => {
    const typeData = data[type]
    const typeDetailData = typeData[typeDetail]

    let value = [
        ...typeDetailData.data,
        {
            id: '',
            idCTDT: idCTDT,
            kiHieu: '',
            noiDung: 'a',
            loaiChuanDauRa: '',
            loaiChuanDauRaChiTiet: '',
            trinhDoNangLuc: '1'
        }
    ]

    value = handleChangeDataD(value, type, typeDetail, typeIndex, idCTDT)

    const result = {
        ...data,
        [type]: {
            ...typeData,
            [typeDetail]: {
                ...typeDetailData,
                data: value
            }
        }
    }
    setData.setSectionDValue(result)

    const createElement = value.filter(item => item.id == '').map(item => {
        return {
            kiHieu:item.kiHieu, 
            noiDung: item.noiDung, 
            loaiChuanDauRa: item.loaiChuanDauRa,
            loaiChuanDauRaChiTiet: item.loaiChuanDauRaChiTiet,
            trinhDoNangLuc: item.trinhDoNangLuc,
            idCTDT: item.idCTDT
        }
    })

    // console.log(createElement)
    const createD = await postData(apiURL, '/create_sectionD', { idCTDT , data: createElement }, 'CREATE_SECIOND')

    handleSplitSectionD({
        data: createD.data.data,
        setSectionDValue: setData.setSectionDValue,
        idCTDT
    })
}

const handleClickDeleteD = async ({  e, setState, data , setDelete, idctdt, apiURL }) => {
    const parentElement = getParent(e.target, 'element')
    const inputElement = parentElement.querySelector('textarea')
    const dataset = inputElement.dataset

    const list = [...data]
    let deleteElement = list[dataset.index - 1]
    list.splice(dataset.index - 1, 1)

    setState(prev => {
        const type = dataset.type
        const typeDetail = dataset.typedetail
        const typeData = prev[type]
        const typeDetailData = typeData[typeDetail]

        return {
            ...prev,
            [type]: {
                ...typeData,
                [typeDetail]: {
                    ...typeDetailData,
                    data: handleChangeDataD(list, type, typeDetail, typeDetailData.typeIndex, idctdt)
                }
            }
        }
    })

    deleteElement = [deleteElement]
    // console.log(deleteElement)
    const deleteD = await deleteData(apiURL, '/delete_sectionD', { idCTDT: idctdt, deleteData: deleteElement }, 'DELETE_SECTIOND')

}

const handleSaveDragD = async ({ data, apiURL, currentId }) => {
    const sectionDElement = [
        ...data.KIEN_THUC.KIEN_THUC_DAI_HOC_HUE.data,
        ...data.KIEN_THUC.KIEN_THUC_DAI_HOC_KHOA_HOC.data,
        ...data.KIEN_THUC.KIEN_THUC_LINH_VUC.data,
        ...data.KIEN_THUC.KIEN_THUC_NHOM_NGANH.data,
        ...data.KIEN_THUC.KIEN_THUC_NGANH.data,
        ...data.KY_NANG.KY_NANG_CHUYEN_MON.data,
        ...data.KY_NANG.KY_NANG_MEM.data,
        ...data.THAI_DO.THAI_DO_CA_NHAN.data,
        ...data.THAI_DO.THAI_DO_NGHE_NGHIEP.data,
        ...data.THAI_DO.THAI_DO_XA_HOI.data
    ]

    const updateElement = sectionDElement.filter(item => item.id != '')
    const updateD = await postData(apiURL, '/update_sectionD', { idCTDT: currentId, data: updateElement }, 'UPDATE_SECTIOND')
}

const handleUpdateSectionD = async (id, api, setData) => {
    const sectionDElement = JSON.parse(sessionStorage.getItem(`sectionD-${id}`))
    const sectionDDelete = JSON.parse(sessionStorage.getItem(`sectionD-delete-${id}`))

    const deleteElement = sectionDDelete.filter(item => item.id != '').map(item => {
        return {
            id: item.id, 
            idCTDT: item.idCTDT
        }
    })
    const createElement = sectionDElement.filter(item => item.id == '').map(item => {
        return {
            kiHieu:item.kiHieu, 
            noiDung: item.noiDung, 
            loaiChuanDauRa: item.loaiChuanDauRa,
            loaiChuanDauRaChiTiet: item.loaiChuanDauRaChiTiet,
            trinhDoNangLuc: item.trinhDoNangLuc,
            idCTDT: item.idCTDT
        }
    })
    const updateElement = sectionDElement.filter(item => item.id != '')

    
    const deleteD = await deleteData(api, '/delete_sectionD', { idCTDT: id, deleteData: deleteElement }, 'DELETE_SECTIOND')
    const createD = await postData(api, '/create_sectionD', { idCTDT: id, data: createElement }, 'CREATE_SECIOND')
    const updateD = await postData(api, '/update_sectionD', { idCTDT: id, data: updateElement }, 'UPDATE_SECTIOND')


    console.log(updateD)

    if( deleteD.status == 200 &&
        createD.status == 200 &&
        updateD.status == 200
    ) {
        handleSplitSectionD({
            data: updateD.data.data,
            setSectionDValue: setData.setSectionDValue,
            idCTDT: id
        })
        setData.setDeleteElement([])
    }

    return (
        deleteD.status == 200 &&
        createD.status == 200 &&
        updateD.status == 200
    )
}

export { 
    handleSplitSectionD, 
    handleChangeValueD, 
    handleClickAddD,
    handleClickDeleteD, 
    handleChangeDataD, 
    handleUpdateSectionD,
    handleAutoSaveD ,
    handleSaveDragD,
    handleSplitSectionD_forMount
}