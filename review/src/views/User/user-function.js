import { getData, getParentElementByClass } from "../../utils/function"

export const getUserInformation = async ({ api, token, setIsDataSaved, setUserInformation }) => {
    const result = await getData(api, "/user", token)

    if(result.status == 200) {
        setUserInformation(result.data.data)
    } else {
        throw "wrong"
    }
}

export const handleChangeInformation = ({ e, setIsDataSaved, setState }) => {
    const name = e.target.name
    const value = e.target.value

    setState(prev => {
        return {
            ...prev,
            [name]: value
        }
    })
}

const invalidElement = (element, message) => {
    element.classList.add("invalid")

    const spanElement = element.querySelector("span")
    spanElement.innerHTML = message
}

export const validElement = (element) => {
    const fatherElement = getParentElementByClass(element, "input-block")
    fatherElement.classList.remove("invalid")

    const spanElement = fatherElement.querySelector("span")
    spanElement.innerHTML = ""
}

export const checkValidInformation = ({e, newPassword}) => {
    
    const name = e.target.name
    const value = e.target.value
    const fatherElement = getParentElementByClass(e.target, "input-block")

    if(value == "") {
        invalidElement(fatherElement, "Vui lòng nhập dữ liệu ô này")
    } else
    if(name == "email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) != 1) {
        invalidElement(fatherElement, "Vui lòng nhập email đúng định dạng")
    } 
    if(name == "confirmPassword" && value != newPassword) {
        invalidElement(fatherElement, "Mật khẩu không trùng khớp")
    }
}