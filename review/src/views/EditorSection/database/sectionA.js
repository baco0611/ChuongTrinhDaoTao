import { deleteData, getData, postData } from "../../../utils/function";
import Swal from 'sweetalert2'

/* 
    Xử lý hành đọng chỉnh sửa dữ liệu trong mỗi ô input trong đó:
    - Xử lý ô textarea, input dạng text
    - Xử lý nếu input yêu cầu dữ liệu là số
*/
const handleChangeValue = ({ e, name, max, setSectionAValue, setIsDataSaved}) => {
    function isInteger(str) {
        return Number.isInteger(+str);
    }

    setIsDataSaved(false)

    const value = e.target.value

    if(name == "textarea" && value.length) {
        if(value.length > max)
            setSectionAValue(prev => {
                return {
                    ...prev,
                    [e.target.name]: value.slice(0, max)
                }
            })
        else 
        setSectionAValue(prev => {
            return {
                ...prev,
                [e.target.name]: value
            }
        })
    } else 
    if(name == "number") {
        if(isInteger(value))
            setSectionAValue(prev => {
                return {
                    ...prev,
                    [e.target.name]: value
                }
            })
    } else {
        setSectionAValue(prev => {
            return {
                ...prev,
                [e.target.name]: value
            }
        })
    }
}

// Xử lý việc thay đổi dữ liệu ô chuyên ngành đào tạo
const handleChangeValueSpecial = (e, setSpecialization, currentIndex, setIsDataSaved) => {
    setIsDataSaved(false)
    setSpecialization(prev => {
        return prev.map((element, index) => {
            if(index == currentIndex) {
                return {
                    ... element,
                    specializationName: e.target.value
                }
            } else 
                return element
        })
    })
}

// Lấy dữ liệu từ db khi mount vào component
const getDataSectionA = async ({ id, api, token, completeMessage, errorMessage, setIsDataSaved, setSectionAValue, setSpecialization }) => {
    const sectionAValue = await getData("http://localhost:3002", `/sectionA/${id}`, token, completeMessage, errorMessage)
    console.log(sectionAValue)
    if(sectionAValue.status == 200) {
        setSectionAValue(sectionAValue.data.data)

        const specialization = await getData(api, `/api/specialization/${id}`, token, completeMessage, errorMessage)
        if(specialization.status == 200) {
            setSpecialization(specialization.data.data)
            setIsDataSaved(true)
        } else {
            setIsDataSaved(true)
            throw "wrong"
        }
    } else {
        setIsDataSaved(true)
        throw "wrong"
    }
}

// Lưu giá trị sau mỗi thay đổi
const saveChangeSectionAInfo = async ({ id, api, token, completeMessage, errorMessage, setIsDataSaved, payload}) => {
    payload.id = id
    const result = await postData(api, "/sectionA-info", token, payload, completeMessage, errorMessage)

    if(result.status == 200) {
        setIsDataSaved(true)
    }
}

const saveChangeSectionSpecialize = async ({ id, api, token, setIsDataSaved, payload, completeMessage, errorMessage }) => {
    const result = await postData(api, "/api/specialization/update", token, payload, completeMessage, errorMessage)
    
    if(result.status == 200) {
        setIsDataSaved(true)
    }
}

const handleCreateSpecialize = async ({ id, api, token, setSpecialization, setIsDisableButton, completeMessage, errorMessage }) => {
    const payload = {
        programId: id,
    }
    setIsDisableButton(true)
    const result = await postData(api, "/api/specialization/create", token, payload, completeMessage, errorMessage)
    console.log(result)
    if(result.status == 200) {
        setSpecialization(result.data.data)
        setIsDisableButton(false)
    }
}

const deleteSpecialize = async ({ id, api, token, payload, completeMessage, errorMessage, setSpecialization }) => {
    const result = await deleteData(api, "/api/specialization/delete", token, payload, completeMessage, errorMessage)

    if(result.status == 200)
        setSpecialization(result.data.data)
}       

const handleDeleteSpecialize = async ({ id, api, token, payload, completeMessage, errorMessage, setSpecialization }) => {
    await Swal.fire({
        title: "XÓA CHUYÊN NGÀNH",
        text: `Bạn có muốn xóa chuyên ngành ${payload.specializationName} không?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        confirmButtonColor: '#BE0000', // Màu đỏ cho nút "Có"
        reverseButtons: true, // Đổi vị trí các nút
    }).then((result) => {
        if (result.isConfirmed) {
            deleteSpecialize({ id, api, token, payload, completeMessage, errorMessage, setSpecialization })
        }
    });
}

export {
    handleChangeValue,
    handleChangeValueSpecial,
    getDataSectionA,
    saveChangeSectionAInfo,
    saveChangeSectionSpecialize,
    handleCreateSpecialize,
    handleDeleteSpecialize
}