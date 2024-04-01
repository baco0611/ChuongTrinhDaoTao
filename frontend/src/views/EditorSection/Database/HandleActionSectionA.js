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

    return (
        updateA.status == 200 && 
        deleteCN.status == 200 &&
        updateCN.status == 200 &&
        createCN.status == 200
    )
}

const handleChangeValueA = (e, setState, indexItem) => {
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
}

const handleDeleteChuyenNganh = (setState, setDelete, indexItem, id) => {
    setState(prev => {
        const value = prev.filter((item, index) => {
            if(index != indexItem)
                return item
        })
        
        console.log(value)
        return value
    })


    if(id != '')
        setDelete(prev => [...prev, id])
}

const handleAddChuyenNganh = ( setState ) => {
    setState(prev => [
        ...prev,
        {
            idChuyenNganh: '',
            tenChuyenNganh: ''
        }
    ])
}

export { 
    handleUpdateSectionA, 
    handleDeleteChuyenNganh,
    handleChangeValueA,
    handleAddChuyenNganh
}