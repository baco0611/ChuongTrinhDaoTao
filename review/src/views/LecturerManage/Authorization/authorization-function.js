import { postData } from "../../../utils/function"
import Swal from 'sweetalert2'

const searchLecturer = async (api, url, token, payload, setState) => {
    if(!payload.pageOrder) {
        payload.pageOrder = 1
    }

    const result = await postData(api, url, token, payload)
    if(result.status == 200)
        setState(result.data)
}

const handleToggleAuthor = (e, setState) => {
    const code = e.target.name

    setState(prev => {
        if(prev.role.includes(code))
            return {
                ...prev,
                role: prev.role.filter(element => element != code)
            }
        else 
            return {
                ...prev,
                role: [...prev.role, code]
            }
    })
}

const updateRole = async (user, api, token) => {
    const result = await postData(api, "/api/lecturer/updateRoles", token, user)

    console.log(result)
}

const handleSubmitRole = async (user, api, token) => {
    await Swal.fire({
        title: "CẬP NHẬT QUYỀN",
        text: `Bạn có muốn cập nhật lại quyền cho giảng viên ${user.lastName} ${user.firstName} không?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        confirmButtonColor: '#BE0000', // Màu đỏ cho nút "Có"
        reverseButtons: true, // Đổi vị trí các nút
    }).then(async (result) => {
        if (result.isConfirmed) {
            await updateRole(user, api, token)
        }
    });
}

export {
    searchLecturer,
    handleToggleAuthor,
    handleSubmitRole
}