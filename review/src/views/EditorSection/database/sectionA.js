import { getData, postData } from "../../../utils/function";

const handleChangeValue = ({ e, name, max, setSectionAValue, setIsDataSaved}) => {
    function isInteger(str) {
        return Number.isInteger(+str);
    }

    setIsDataSaved(false)

    const value = e.target.value

    if(name == "textarea" && value.length) {
        if(value.length > max)
            setSectionAValue(prev => {
                return {
                    ...prev,
                    [e.target.name]: value.slice(0, max)
                }
            })
        else 
        setSectionAValue(prev => {
            return {
                ...prev,
                [e.target.name]: value
            }
        })
    } else 
    if(name == "number") {
        if(isInteger(value))
            setSectionAValue(prev => {
                return {
                    ...prev,
                    [e.target.name]: value
                }
            })
    } else {
        setSectionAValue(prev => {
            return {
                ...prev,
                [e.target.name]: value
            }
        })
    }
}

const handleChangeValueSpecial = (e, setSpecialization, currentIndex) => {
    setSpecialization(prev => {
        return prev.map((element, index) => {
            if(index == currentIndex) {
                return {
                    ... element,
                    specializationName: e.target.value
                }
            } else 
                return element
        })
    })
}

const getDataSectionA = async ({ id, api, token, completeMessage, errorMessage, setIsDataSaved, setSectionAValue, setSpecialization }) => {
    const sectionAValue = await getData(api, `/sectionA/${id}`, token, completeMessage, errorMessage)
    console.log(sectionAValue)
    if(sectionAValue.status == 200) {
        setSectionAValue(sectionAValue.data.data)

        const specialization = await getData(api, `/specialization/${id}`, token, completeMessage, errorMessage)
        if(specialization.status == 200) {
            setSpecialization(specialization.data.data)
            setIsDataSaved(true)
        } else {
            setIsDataSaved(true)
            throw "wrong"
        }
    } else {
        setIsDataSaved(true)
        throw "wrong"
    }
}

const saveChangeSectionAInfo = async ({ id, api, token, completeMessage, errorMessage, setIsDataSaved, payload}) => {
    payload.id = id
    const result = await postData(api, "/sectionA-info", token, payload)

    if(result.status == 200) {
        setIsDataSaved(true)
    }
}

const saveChangeSectionSpecialize = async () => {

}

const handleCreateSpecialize = async () => {

}

const handleDeleteSpecialize = async () => {

}

export {
    handleChangeValue,
    handleChangeValueSpecial,
    getDataSectionA,
    saveChangeSectionAInfo,
    saveChangeSectionSpecialize,
    handleCreateSpecialize,
    handleDeleteSpecialize
}