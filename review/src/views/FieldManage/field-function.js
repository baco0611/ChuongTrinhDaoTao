import { alertErrorDataSave, deleteData, getData, postData } from "../../utils/function"
import Swal from 'sweetalert2'

export const getFieldManageData = async ({api, token, setFieldValue, setDepartment, setIsDataSaved}) => {
    const result = await getData(api, "/api/fields/getAll", token)

    if(result.status = 200) {
        setFieldValue(result.data.data)

        const departmentResult = await getData(api, "/api/department/getAll", token)
        setDepartment(departmentResult.data.data)
    }

    setIsDataSaved(true)
}

export const changeValueInput = ({e, id, setState}) => {
    
    setState(prev => {
        const result = prev.map(element => {
            if(element.id != id)
                return element
            else 
                return {
                    ...element,
                    [e.target.name]: e.target.value
                } 
        })
        return result
    })
}

export const changeValueButton = async ({ api, token, id, data, department, setFieldValue, setIsDataSaved }) => {
    setIsDataSaved(false)
    console.log(department, data)

    const value = {
        ...data,
        department: department.departmentId,
        departmentName: department.departmentName
    }

    setFieldValue(prev => {
        const result = prev.map(element => {
            if(element.id != id)
                return element
            else 
                return value
        })
        return result
    })

    const result = await postData(api, "/api/fields/update", token, value)
    setIsDataSaved(true)
} 

export const updateField = async ({api, token, data, setIsDataSaved, oldElement, setFieldValue}) => {
    setIsDataSaved(false)
    if(oldElement) {
        if(oldElement.fieldCode == data.fieldCode.trim()) {
            setIsDataSaved(true)
            return
        }

        const checkCodeResult = await getData(api, `/api/fields/exists/${data.fieldCode.trim()}`, token)
        console.log(checkCodeResult)
        if(checkCodeResult.status!=200) {
            setFieldValue(prev => {
                const result = prev.map(element => {
                    if(element.id != data.id)
                        return element
                    else 
                        return oldElement
                })
                return result
            })
            setIsDataSaved(true)
    
            Swal.fire({
                title: "MÃ GIẢNG VIÊN ĐÃ TỒN TẠI",
                text: "Mã giảng viên đã tồn tại, vui lòng nhập mã giảng viên khác",
                icon: "error",
                confirmButtonColor: "#BE0000"
            });
            return
        }
    }
    
    setFieldValue(prev => {
        const result = prev.map(element => {
            if(element.id != data.id)
                return element
            else 
                return {
                    ...element,
                    fieldCode: element.fieldCode.trim(),
                    fieldName: element.fieldName.trim()
                }
        })
        return result
    })
    const result = await postData(api, "/api/fields/update", token, data)
    setIsDataSaved(true)
}

export const createField = async({api, token, setFieldValue, setIsDataSaved }) => {
    setIsDataSaved(false)

    const result = postData(api, "/api/fields/create", token)
    setFieldValue((await result).data.data)

    setIsDataSaved(true)
}

export const deleteField = async({api, token, data, setFieldValue, setIsDataSaved}) => {
    await Swal.fire({
        title: "XÓA NGÀNH ĐÀO TẠO",
        text: `Bạn có muốn xóa ngành ${data.fieldName} không?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        confirmButtonColor: '#BE0000', // Màu đỏ cho nút "Có"
        reverseButtons: true, // Đổi vị trí các nút
    }).then(async (result) => {
        if (result.isConfirmed) {
            const payload = {
                id: data.id,
                confirm: false
            }

            const result_1 = await deleteData(api, "/api/fields/delete", token, payload)
            console.log(result_1)
            // const result = await deleteData(api, url, token, payload)
            // console.log(result)

            // if(result.status == 200)
            //     setState(result.data.data)
            // else
            //     alertErrorDataSave()
        }
    });
}