import { deleteData, postData } from "./HandleUpdateDatabase"

const handleChangValueE = (setState, valueList) => {
    const value = {...valueList}
    const inputElement = document.querySelectorAll('input')
    const element = Array.from(inputElement).filter(item => item.checked == true)

    const state = element.map(item => {
        const dataSet = item.dataset
        if(dataSet.id && dataSet.id!='false')
            return {
                PLO: dataSet.plo,
                PO: dataSet.po,
                id: dataSet.id,
                isCheck: item.checked
            }
        else 
            return {
                PLO: dataSet.plo,
                PO: dataSet.po,
                id: '',
                isCheck: item.checked
            }
    })

    const uncheckElement = Array.from(inputElement).filter(item => item.checked != true && item.getAttribute('data-id')!=null)

    uncheckElement.forEach(item => {
        const dataSet = item.dataset

        value[dataSet.plo][dataSet.po] = {
            id: dataSet.id,
            isCheck: false
        }
    })

    state.forEach(item => {
        let { PLO, PO, id } = item

        if(!value[PLO]) {
            value[PLO] = {
                [PO]: {
                    id,
                    isCheck: true
                }
            }     
        } else value[PLO][PO] = {id, isCheck: true}
    })

    const stateValue = []

    Object.keys(value).forEach(PLO => {
        Object.keys(value[PLO]).forEach(PO => {
            stateValue.push({
                PLO,
                PO,
                id: value[PLO][PO].id,
                isCheck: value[PLO][PO].isCheck
            })
        })
    })

    setState(stateValue)
}

const handleUpdateSectionE = async ( id, api, setData) => {
    const value = JSON.parse(sessionStorage.getItem(`sectionE-${id}`))

    const createValue = value.map(item => {
        if(item.id=='')
            return {
                PLO: item.PLO,
                PO: item.PO
            }
    }).filter(item => item != undefined)

    const deleteValue = value.map(item => {
        if(item.isCheck == false && item.id != '')
            return item.id
    }).filter(item => item != undefined)

    const createE = await postData(api, '/create_sectionE', { idCTDT: id, data: createValue }, 'CREATE_SECTIONE')
    const deleteE = await deleteData(api, '/delete_sectionE', { idCTDT: id, deleteData: deleteValue }, 'DELETE_SECTIONE')

    if( createE.status == 200 &&
        deleteE.status == 200
    ) {
        setData.setSectionEValue(convertValueE(deleteE.data.data))
    }

    return (
        createE.status == 200 &&
        deleteE.status == 200
    )
}

const convertValueE = (value) => {
    if(value)
        return value.map(item => {
            return {
                ...item,
                isCheck: true
            }
        })
    else 
        return []
}


export { handleChangValueE, handleUpdateSectionE, convertValueE }