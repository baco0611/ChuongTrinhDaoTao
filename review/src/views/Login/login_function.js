import { getParentElementByClass, postData } from "../../utils/function"
import { $, $$} from "../../utils/variable"

const handleChangeValue = (e, setState) => {
    setState(prev => {
        return {
            ...prev,
            [e.target.name]: e.target.value
        }
    })
}

const handleInvalid = (element, message) => {
    const fatherElement = getParentElementByClass(element, "input-block")
    fatherElement.classList.add("invalid")
    const errorElement = fatherElement.querySelector(".error-message")
    errorElement.innerHTML = message
}

const handleValid = (name, element) => {
    let block = element

    if(!block) {
        block = $(`#login-${name}`)
    }

    const fatherElement = getParentElementByClass(block, "input-block")
    fatherElement.classList.remove("invalid")
    const errorElement = fatherElement.querySelector(".error-message")
    errorElement.innerHTML = ""
}

const checkValid = (name) => {
    const element = $(`#login-${name}`)
    
    if(!element.value) {
        handleInvalid(element, "Vui lòng nhập trường này")
        return false
    } else
        handleValid(name, element)

    return true
}

const handleSubmit = async ({ e, userInformation, api, url, setUser, setToken, setUserInformation }) => {
    e.preventDefault()

    const userId = checkValid("userId")
    const userPassword = checkValid("userPassword")
    
    if(userId && userPassword) {
        const payload = {
            lecturersCode: userInformation.userId.toUpperCase(),
            password: userInformation.password
        }

        const result = await postData(api, url, "", payload)

        if(result.status == 200) {
            setUser(result.data.data)
            setToken(result.data.token)
            setUserInformation({
                userId: "",
                password: ""
            })
        } else {
            if(result.data.lecturerCode) {
                const element = $(`#login-userId`)
                handleInvalid(element, result.data.lecturerCode)
            }

            if(result.data.password) {
                const element = $(`#login-userPassword`)
                handleInvalid(element, result.data.password)
            }
        }
    }
}

export {
    handleChangeValue,
    handleSubmit,
    checkValid,
    handleValid
}