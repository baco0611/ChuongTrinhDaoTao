import { deleteData, getData, postData } from "../../../utils/function"
import Swal from 'sweetalert2'

const typeList = ["KIEN_THUC", "KY_NANG", "THAI_DO"]

/**
 * Luồng hoạt động của PO
 * 
 * Khi thay đổi dữ liệu (changeDataSectionC)
 * Khi blur khỏi element ==> tự động lưu dữ liệu (saveChangeElement)
 * Khi nhấn create ==> Tạo element mới, Symbol tự động tăng lên (handelCreatePO) 
 *                 ==> lấy dữ liệu thì cần split để tách dữ liệu đúng thứ tự
 * Khi nhấn delete ==> Xóa phần tử đó ==> lấy dữ liệu thì cần split dữ liệu lại cho đúng thứ tự
 *                 ==> Lúc này trong DB thứ tự vẫn sai (nếu xóa 1 cái ở giữa thì bị hổng) ==> refresh lại để cập nhật trong db 
 */

export const sortCondition = (a, b) => {
    const aSymbol = a.symbol.split('.')
    const bSymbol = b.symbol.split('.')

    const aK = Number.parseInt(aSymbol.pop())
    const bK = Number.parseInt(bSymbol.pop())

    return aK < bK ? -1 : 1
}

const refreshProgramObjective = data => {
    typeList.forEach((type, index) => {
        const typeIndex = index + 1
        data[type].data.forEach((element, index)  => {
            element.symbol = `PO - ${typeIndex}.${index + 1}`
        })       
    })

    return data
}

const splitProgramObjective = (data) => {
    const sortedData = data.reduce((acc, element) => {
        if (acc[element.type]) {
            acc[element.type].push(element);
        } else {
            acc[element.type] = [element];
        }
        return acc;
    }, {});

    const formatResult = (type, index) => ({
        type,
        typeIndex: index,
        data: (sortedData[type] || []).sort(sortCondition) // Ví dụ sắp xếp theo id
    });

    return {
        KIEN_THUC: formatResult("KIEN_THUC", 1),
        KY_NANG: formatResult("KY_NANG", 2),
        THAI_DO: formatResult("THAI_DO", 3)
    };
};

export const getDataSectionC = async ({ id, api, token, completeMessage, errorMessage, setIsDataSaved, setSectionCValue }) => {
    const result = await getData(api, `/sectionC/${id}`, token, completeMessage, errorMessage)
    if(result.status == 200) {
        console.log(result)
        setSectionCValue(splitProgramObjective(result.data.data))
        setIsDataSaved(true)
    } else {
        setIsDataSaved(true)
        throw "wrong"
    }
}

export const changeDataSectionC = ({ e, setState, id, type, setIsDataSaved }) => {
    setIsDataSaved(false)
    setState(prev => {
        let value = prev[type].data
        
        value = value.map(element => {
            if(element.id == id) {
                return {
                    ...element,
                    content: e.target.value
                }
            } else 
            return element
        })

        return {
            ...prev,
            [type]: {
                ...prev[type],
                data: value
            }
        }
    })
}

export const handleSaveChangeTypeElement = async ({ api, token, payload, completeMessage, errorMessage}) => {
    console.log(payload)
    const result = await postData(api, "/update-program-objectives", token, payload.data, completeMessage, errorMessage)

    console.log(result)
}

export const handleSaveChangeElement = async ({ api, id, token, content, setIsDataSaved, errorMessage, completeMessage }) => {
    const payload = {
        id,
        content
    }
    
    const result = await postData(api, "/program-objective/update", token, payload, completeMessage, errorMessage)

    console.log(result)
    setIsDataSaved(true)
}

export const handleCreatePO = async ({ api, token, type, typeIndex, numOfElement, programId, setState, setIsDataSaved, completeMessage, errorMessage, setIsDisable }) => {
    setIsDisable(true)
    setIsDataSaved(false)
    const payload = {
        programId,
        symbol: `PO - ${typeIndex}.${numOfElement + 1}`,
        type: type,
    }

    const result = await postData(api, "/program-objective/create", token, payload, completeMessage, errorMessage)

    if(result.status == 200) {
        setState(splitProgramObjective(result.data.data))
    }

    setIsDisable(false)
    setIsDataSaved(true)
}

export const handleDeletePO = async ({ api, token, id, setState, symbol, typeIndex, setIsDataSaved }) => {
    const payload = {
        id
    }

    await Swal.fire({
        title: "XÓA CHUYÊN NGÀNH",
        text: `Bạn có muốn xóa mục tiêu ${symbol} không?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        confirmButtonColor: '#BE0000', // Màu đỏ cho nút "Có"
        reverseButtons: true, // Đổi vị trí các nút
    }).then(async (result) => {
        if(result.isConfirmed) {
            setIsDataSaved(false)
            const deleteResult = await deleteData(api, "/program-objective/delete", token, payload)

            if(deleteResult.status == 200) {
                const data = refreshProgramObjective(splitProgramObjective(deleteResult.data.data))
                setState(data)

                const value = typeIndex == 1 ? data["KIEN_THUC"] : typeIndex == 2 ? data["KY_NANG"] : data["THAI_DO"]

                await handleSaveChangeTypeElement({ api, token, payload: value })
            }

            setIsDataSaved(true)
        }
    });
}