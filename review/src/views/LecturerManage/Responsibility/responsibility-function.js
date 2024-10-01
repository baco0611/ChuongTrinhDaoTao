import Swal from 'sweetalert2'
import { postData } from '../../../utils/function';

export const changeResponsibility = async ({ api, token, element, department, type, setState, setIsDataSaved, user }) => {
    if(!user || !user.role.includes("ASSIGN_RESPONSIBILITY")) return
    
    if (type == "1") return;
    let title, text, payload;

    if (type == "0") {
        title = "PHÂN CÔNG PHỤ TRÁCH";
        text = `Bạn có muốn phân công giảng viên ${element.lecturerName} phụ trách đơn vị ${department.name} không?`;
        payload = {
            ...element,
            ...department,
            lecturerId: element.id
        };
    } else if (type == "2") {
        title = "HỦY PHÂN CÔNG PHỤ TRÁCH";
        text = `Bạn có muốn hủy phân công phụ trách đơn vị ${department.name} không?`;
        payload = { ...department };
    }

    const result = await Swal.fire({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        confirmButtonColor: '#BE0000',
        reverseButtons: true,
    });

    if (result.isConfirmed) {
        setIsDataSaved(false);
        const apiResult = await postData(api, "/api/department/updateManager", token, payload);
        if (apiResult.status === 200) {
            setState(apiResult.data.data);
            setIsDataSaved(true);
        }
    }
}
