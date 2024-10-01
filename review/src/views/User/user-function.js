import { alertErrorDataSave, getData, getParentElementByClass, postData } from "../../utils/function"
import Swal from 'sweetalert2'


export const getUserInformation = async ({ api, token, setIsDataSaved, setUserInformation }) => {
    const result = await getData(api, "/api/lecturer/info", token)

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

export const checkValidInformation = ({e, newPassword, setState}) => {
    const element = e.target || e

    const name = element.name
    const value = element.value.trim()
    const fatherElement = getParentElementByClass(element, "input-block")

    if(name == "firstName") {
        const splitLetter = value.split(" ")
        if(splitLetter.length >= 2) {
            setState(prev => {
                return {
                    ...prev,
                    firstName: splitLetter.pop(),
                    lastName: prev.lastName + " " + splitLetter.join(" "),
                }
            })
        }
    }
    if(value == "") {
        invalidElement(fatherElement, "Vui lòng nhập dữ liệu ô này")
        return false
    } else
    if(name == "email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) != 1) {
        invalidElement(fatherElement, "Vui lòng nhập email đúng định dạng")
        return false
    } 
    if(name == "confirmPassword" && value != newPassword) {
        invalidElement(fatherElement, "Mật khẩu không trùng khớp")
        return false
    }
    if(name.includes("Password")) {
        if(value.length < 8) {
            invalidElement(fatherElement, "Mật khẩu có độ dài ít nhất là 8 ký tự")
            return false
        } else 
        if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value) != 1) {
            invalidElement(fatherElement, "Mật khẩu phải chứa kí tự thường, kí tự hoa, chữ số và kí hiệu đặc biệt")
            return false
        }
    }

    return true
}

const checkUserData = (blockName, newPassword) => {
    const element = document.querySelector(blockName)
    const inputElement = element.querySelectorAll("input")
    console.log(inputElement)

    const result = Array.from(inputElement).reduce((result, element) => {
        console.log(element)
        return checkValidInformation({e: element, newPassword: newPassword}) && result
    }, 1)

    return result
}

export const handleSavingInformation = async ({ api, token, data }) => {
    const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        lecturerCode: data.lecturerCode,
    }

    if(checkUserData("#user-info"))
    await Swal.fire({
        title: "CẬP NHÂT THÔNG TIN",
        text: `Bạn có muốn thay đổi thông tin cá nhân không?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        confirmButtonColor: '#BE0000', // Màu đỏ cho nút "Có"
        reverseButtons: true, // Đổi vị trí các nút
    }).then(async (result) => {
        if (result.isConfirmed) {
            const result = await postData(api, "/api/lecturer/change-password", token, payload)

            if(result.status != 200) 
                alertErrorDataSave()
            else
                Swal.fire({
                    title: "ĐÃ CẬP NHẬT",
                    text: `Đã cập nhật thông tin cá nhân thành công`,
                    icon: "info",
                })
        }
    });
}

export const handleSavingPassword = async ({ api, token, data, lecturerCode }) => {
    const payload = {
        ...data,
        lecturerCode
    }

    // if(checkUserData("#password-info", data.newPassword))
    await Swal.fire({
        title: "THAY ĐỔI MẬT KHẨU",
        text: `Bạn có muốn thay đổi mật khẩu không?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        confirmButtonColor: '#BE0000', // Màu đỏ cho nút "Có"
        reverseButtons: true, // Đổi vị trí các nút
    }).then(async (result) => {
        if (result.isConfirmed) {
            console.log(payload)

            const result = await postData(api, "/user/update", token, payload)

            if(result.status != 200) 
                alertErrorDataSave()
            else
                Swal.fire({
                    title: "ĐÃ THAY ĐỔI",
                    text: `Đã thay đổi mật khẩu thành công`,
                    icon: "info",
                })
        }
    });
}