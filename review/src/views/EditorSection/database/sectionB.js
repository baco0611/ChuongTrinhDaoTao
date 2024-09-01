import { getData, postData } from "../../../utils/function"

const getDataSectionB = async ({ id, api, token, completeMessage, errorMessage, setIsDataSaved, setSectionBValue }) => {
    const result = await getData(api, `/api/education-programs/sectionB/${id}`, token)
    if(result.status == 200) {
        console.log(result)
        setSectionBValue(result.data.data.overallObjectives)
        setIsDataSaved(true)
    } else {
        setIsDataSaved(true)
        throw "wrong"
    }
}

const handleSaveChangeSectionB = async ({ id, api, token, sectionBValue, completeMessage, errorMessage, setIsDataSaved }) => {
    const payload = {
        programId: id,
        overallObjectives: sectionBValue
    }
    const result = await postData(api, "/sectionB-info", token, payload)

    if(result.status == 200) {
        setIsDataSaved(true)
    }
}

const handleChangeValue = (e, setSectionBValue, setIsDataSaved) => {
    setIsDataSaved(false)
    setSectionBValue(e.target.value)
}

export {
    getDataSectionB,
    handleSaveChangeSectionB,
    handleChangeValue
}