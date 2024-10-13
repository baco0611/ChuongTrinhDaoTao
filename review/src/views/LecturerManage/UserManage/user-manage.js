import { alertErrorDataSave, deleteData, getParentElementByClass, postData } from "../../../utils/function"
import Swal from 'sweetalert2'

export const handleChangeInformation = ({ e, setState, element }) => {
    console.log(element)
    if(e) {
        const name = e.target.name
        const value = e.target.value
    
        setState(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    } else {
        setState(prev => {
            return {
                ...prev,
                department: element.departmentId,
                departmentName: element.departmentName,
            }
        })
    }
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

export const checkValidInformation = ({e, setState}) => {
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

    if(name == "email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) != 1 && value != "") {
        invalidElement(fatherElement, "Vui lòng nhập email đúng định dạng")
        return false
    } else
    if(value == "" && name != "email") {
        invalidElement(fatherElement, "Vui lòng nhập dữ liệu ô này")
        return false
    }

    return true
}

const checkUserData = (blockName, newPassword) => {
    const element = document.querySelector(blockName)
    const inputElement = element.querySelectorAll("input")
    // console.log(inputElement)

    const result = Array.from(inputElement).reduce((result, element) => {
        // console.log(element)
        return checkValidInformation({e: element, newPassword: newPassword}) && result
    }, 1)

    return result
}

export const handleSavingInformation = async ({ api, token, data, setState }) => {
    data.roles = data.role

    if(checkUserData("#user-info"))
    await Swal.fire({
        title: "CẬP NHÂT THÔNG TIN",
        text: `Bạn có muốn thay đổi thông tin của giảng viên ${data.lastName} ${data.firstName} không?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        confirmButtonColor: '#BE0000', // Màu đỏ cho nút "Có"
        reverseButtons: true, // Đổi vị trí các nút
    }).then(async (result) => {
        if (result.isConfirmed) {
            console.log(data)
            const result = await postData(api, "/api/lecturer/update", token, data)

            if(result.status != 200) 
                alertErrorDataSave()
            else {
                Swal.fire({
                    title: "ĐÃ CẬP NHẬT",
                    text: `Đã cập nhật thông tin cá nhân thành công`,
                    icon: "info",
                })

                console.log(result.data)

                setState(prev => {
                    const update_data = prev.data.map((element) => {
                        if(element.lecturerId != data.lecturerId)
                            return element
                        else 
                            return data
                    })

                    return {
                        ...prev,
                        data: update_data
                    }
                })
            }
        }
    });
}

export const handleDeleteUser = async ({ api, token, data, request, setState, setSelectedUser }) => {

    if(checkUserData("#user-info"))
    await Swal.fire({
        title: "CẬP NHÂT THÔNG TIN",
        html: `Bạn có muốn xóa giảng viên <strong>${data.lastName} ${data.firstName}</strong> khỏi hệ thống không?
            <br/>Việc này sẽ khiến cho người dùng không còn khả năng truy cập vào hệ thống nữa. Nhưng các chương trình đào tạo vẫn được giữ nguyên.
        `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        confirmButtonColor: '#BE0000', // Màu đỏ cho nút "Có"
        reverseButtons: true, // Đổi vị trí các nút
    }).then(async (result) => {
        if (result.isConfirmed) {
            const result = await deleteData(api, `/api/lecturer/delete/${data.lecturerCode}`, token, data)

            if(result.status != 200) 
                alertErrorDataSave()
            else {
                const updateData = await postData(api, "/api/lecturer/getAll", token, request)

                setState(updateData.data)
                setSelectedUser(null)

                Swal.fire({
                    title: "ĐÃ XÓA",
                    html: `Đã xóa thành công người dùng <strong>${data.lastName} ${data.firstName}</strong>`,
                    icon: "info",
                })
            }
        }
    });
}

export const handleChangeRequest = (name, setRequest, element) => {

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

export const searchLecturer = async (api, url, token, payload, setState, setSelectedUser) => {
    if(!payload.pageOrder) {
        payload.pageOrder = 1
    }

    const result = await postData(api, url, token, payload)
    if(result.status == 200) {
        setState(result.data)
        setSelectedUser(null)
    }
}