import { alertErrorDataSave, deleteData, getData, postData } from "../../utils/function"
import Swal from 'sweetalert2'

export const handleChangeValue = ({ e, id, setIsDataSaved, setState }) => {
    setIsDataSaved(false)
    
    setState(prev => {
        const result = prev.map(element => {
            if(element.id == id)
                return {
                    id: id,
                    condition: e.target.value
                }
            else    
                return element
        })

        return result
    })
}

export const updateDictionary = async({ api, url, token, data, setIsDataSaved}) => {
    const result = await postData(api, url, token, data)

    if(result.status == 200)
        setIsDataSaved(true)
    else   
        alertErrorDataSave()
}

export const getDataDictionary = async ({ api, url, token, setState, setIsDataSaved }) => {
    const result = await getData(api, url, token)

    if(result.status == 200) {
        setIsDataSaved(true)
        setState(result.data.data)
    } else {
        throw("Wrong")
    }
}

export const createDictionary = async({ api, url, token, setState, setIsDisable }) => {
    setIsDisable(true)
    const payload = {}
    const result = await postData(api, url, token, payload)

    if(result.status == 200) 
        setState(result.data.data)
    else
        alertErrorDataSave()

    setIsDisable(false)
}

export const deleteDictionary = async({ api, url, token, setState, id, index }) => {

    await Swal.fire({
        title: "XÓA NỘI DUNG TỪ ĐIỂN",
        text: `Bạn có muốn xóa mục ${index} không?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        confirmButtonColor: '#BE0000', // Màu đỏ cho nút "Có"
        reverseButtons: true, // Đổi vị trí các nút
    }).then(async (result) => {
        if (result.isConfirmed) {
            const payload = { id }
            const result = await deleteData(api, url, token, payload)
            console.log(result)

            if(result.status == 200)
                setState(result.data.data)
            else
                alertErrorDataSave()
        }
    });
}