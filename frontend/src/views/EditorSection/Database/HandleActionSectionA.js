import { deleteData, postData } from "./HandleUpdateDatabase"

const handleUpdateSectionA = async (id, api, setData) => {
    const sectionAValue = JSON.parse(sessionStorage.getItem(`sectionA-${id}`))
    const sectionAChuyenNganh = JSON.parse(sessionStorage.getItem(`sectionA-ChuyenNganh-${id}`))
    const deleteValue = JSON.parse(sessionStorage.getItem(`sectionA-delete-${id}`))

    const updateValue = sectionAChuyenNganh.filter(item => item.idChuyenNganh != '')
    const createValue = sectionAChuyenNganh.filter(item => item.idChuyenNganh == '').map(item => item.tenChuyenNganh)

    const updateA= await postData(api, '/update_sectionA', sectionAValue, 'UPDATE_SECTIONA', 'SOMETHING HAS BEEN INTERESTED WITH THE UPDATE')
    const deleteCN = await deleteData(api, '/delete_ChuyenNganhDaoTao', { idCTDT: id, deleteData: deleteValue }, 'DELETE_CHUYEN_NGANH')
    const updateCN = await postData(api, '/update_ChuyenNganhDaoTao', { idCTDT: id, data: updateValue }, 'UPDATE_CHUYEN_NGANH' )
    const createCN = await postData(api, '/create_ChuyenNganhDaoTao', { idCTDT: id, data: createValue }, 'UPDATE_CHUYEN_NGANH')

    if(updateA.status == 200 && 
        deleteCN.status == 200 &&
        updateCN.status == 200 &&
        createCN.status == 200)
    {
        setData.setSectionAValue(updateA.data.data[0])
        setData.setChuyenNganh(createCN.data.data)
        setData.setDeleteElement([])
    }

    setData.setIsDataSaved(true)

    return (
        updateA.status == 200 && 
        deleteCN.status == 200 &&
        updateCN.status == 200 &&
        createCN.status == 200
    )
}

const handleUpdateSectionAValue = async (id, api, setData) => {
    const sectionAValue = JSON.parse(sessionStorage.getItem(`sectionA-${id}`))

    const updateA= await postData(api, '/update_sectionA', sectionAValue, 'UPDATE_SECTIONA', 'SOMETHING HAS BEEN INTERESTED WITH THE UPDATE')

    if(updateA.status == 200)
    {
        setData.setSectionAValue(updateA.data.data[0])
    }

    setData.setIsDataSaved(true)

    return updateA.status == 200
}

const handleChangeValueCNA = (e, setState, indexItem, setIsDataSaved) => {
    setState(prev => {
        const value = prev.map((item, index) => {
            if(index !== indexItem)
                return item
            else {
                item.tenChuyenNganh = e.target.value
                return item
            }
        })

        return value
    })

    setIsDataSaved(false)
}

const handleAutoSaveCNA = async ({ currentId, apiURL, setData }) => {
    const sectionAChuyenNganh = JSON.parse(sessionStorage.getItem(`sectionA-ChuyenNganh-${currentId}`))
    const updateValue = sectionAChuyenNganh.filter(item => item.idChuyenNganh != '')
    const updateCN = await postData(apiURL, '/update_ChuyenNganhDaoTao', { idCTDT: currentId, data: updateValue }, 'UPDATE_CHUYEN_NGANH' )

    setData.setIsDataSaved(true)
}

const handleDeleteChuyenNganh = async (setState, indexItem, id, apiURL, currentId) => {
    setState(prev => {
        const value = prev.filter((item, index) => {
            if(index != indexItem)
                return item
        })
        
        console.log(value)
        return value
    })

    const deleteValue = [id]
    const deleteCN = await deleteData(apiURL, '/delete_ChuyenNganhDaoTao', { idCTDT: currentId, deleteData: deleteValue }, 'DELETE_CHUYEN_NGANH')
}

const handleAddChuyenNganh = async ( setState, chuyenNganh, currentId, apiURL ) => {
    const value = [
        ...chuyenNganh,
        {
            idChuyenNganh: '',
            tenChuyenNganh: 'a'
        }
    ]

    setState(value)

    console.log(value)

    const createValue = value.filter(item => item.idChuyenNganh == '').map(item => item.tenChuyenNganh)
    console.log(createValue)

    const createCN = await postData(apiURL, '/create_ChuyenNganhDaoTao', { idCTDT: currentId, data: createValue }, 'UPDATE_CHUYEN_NGANH')

    setState(createCN.data.data)
}

export { 
    handleUpdateSectionA, 
    handleDeleteChuyenNganh,
    handleChangeValueCNA,
    handleAddChuyenNganh,
    handleUpdateSectionAValue,
    handleAutoSaveCNA
}