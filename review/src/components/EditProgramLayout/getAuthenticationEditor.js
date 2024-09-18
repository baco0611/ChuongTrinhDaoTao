import { postData } from "../../utils/function"
import Swal from 'sweetalert2'

export const verifyAuthentication = async ({ api, id, lecturerCode, token, navigate, setIsLoading }) => {
    const payload = {
        lecturerCode,
        programId: id
    }
    const result = await postData(api, "/api/education-programs/validateProgramAccess", token, payload)
    
    // console.log(result)
    if(result.status != 200) {
        await Swal.fire({
            title: "KHÔNG THỂ TRUY CẬP",
            text: `Bạn không có quyền chỉnh sửa chương trình đào tạo này`,
            icon: "warning",
            confirmButtonText: "OK",
            confirmButtonColor: '#BE0000', // Màu đỏ cho nút "Có"
            reverseButtons: true, // Đổi vị trí các nút
            showCancelButton: false,
        }).then((result) => {
            if(result.isConfirmed)
                navigate("/program/manage")
            navigate("/program/manage")
        });
    } 

    setIsLoading(false)
}