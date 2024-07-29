import { postData } from "../../../utils/function"

const handleChangeRequest = (name, setRequest, element) => {

    if(name == "department")
        setRequest(prev => {
            return {
                ...prev,
                department: element.departmentId || "",
                departmentName: element.departmentName || "",
            }
        })
    else {
        setRequest(prev => {
            return {
                ...prev,
                [name]: element
            }
        })
    }
}

const searchProgram = async (api, url, token, payload, setProgram) => {
    console.log(123)
    const result = await postData(api, url, token, payload)
    console.log(result)
    if(result.status == 200) 
        setProgram(result.data)
}

export {
    handleChangeRequest,
    searchProgram,
}