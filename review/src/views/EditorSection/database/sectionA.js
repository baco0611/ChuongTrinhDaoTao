import { getData, postData } from "../../../utils/function";

/* 
    Xử lý hành đọng chỉnh sửa dữ liệu trong mỗi ô input trong đó:
    - Xử lý ô textarea, input dạng text
    - Xử lý nếu input yêu cầu dữ liệu là số
*/
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

// Xử lý việc thay đổi dữ liệu ô chuyên ngành đào tạo
const handleChangeValueSpecial = (e, setSpecialization, currentIndex, setIsDataSaved) => {
    setIsDataSaved(false)
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

// Lấy dữ liệu từ db khi mount vào component
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

// Lưu giá trị sau mỗi thay đổi
const saveChangeSectionAInfo = async ({ id, api, token, completeMessage, errorMessage, setIsDataSaved, payload}) => {
    payload.id = id
    const result = await postData(api, "/sectionA-info", token, payload, completeMessage, errorMessage)

    if(result.status == 200) {
        setIsDataSaved(true)
    }
}

const saveChangeSectionSpecialize = async ({ id, api, token, setIsDataSaved, payload, completeMessage, errorMessage }) => {
    console.log(payload, api)
    setIsDataSaved(true)
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