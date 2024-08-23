import { postData } from "../../utils/function"

// Thay đổi request
const handleChangeRequest = (name, setRequest, element) => {

    if(name == "department")
        setRequest(prev => {
            if (element)
                return {
                    ...prev,
                    department: element.departmentId,
                    departmentName: element.departmentName,
                }
            else
                return {
                    ...prev,
                    department: "",
                    departmentName: "",
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

/**
 * Hàm tra cứu chương trình đào tạo
 * Mặc định nếu không có pageOrder thì là 1
 * Nếu flag là true, tức là search còn mặc định là false. Nếu search thì phải bắt đầu từ đầu ==> page về 1
 */
const searchProgram = async (api, url, token, payload, setProgram, flag = false, setCurrentPage) => {
    console.log(payload)

    if(flag) {
        payload.pageOrder = 1
        setCurrentPage(1)
    }

    const result = await postData(api, url, token, payload)
    if(result.status == 200) {
        setProgram(result.data)
        window.scrollTo(0, 0)
    }
}

export {
    handleChangeRequest,
    searchProgram,
}