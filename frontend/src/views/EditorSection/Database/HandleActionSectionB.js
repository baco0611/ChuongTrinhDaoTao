import { postData } from "./HandleUpdateDatabase"

const handleUpdateSectionB = async (id, api, setData) => {
    const sectionBValue = JSON.parse(sessionStorage.getItem(`sectionB-${id}`))

    const updateB = await postData(api, '/update_sectionB', sectionBValue, 'UPDATE_SECTIONB')

    console.log(setData)

    if(updateB.status == 200)
        setData.setSectionBValue(
        {
            id: id,
            mucTieuTongQuat: updateB.data.data[0].mucTieuTongQuat
        })
    
    console.log(updateB)

    return updateB.status == 200
}

export { handleUpdateSectionB }