import { deleteData, getData, postData } from "../../../utils/function"
import Swal from 'sweetalert2'

export const sortCondition = (a, b) => {
    const aSymbol = a.symbol.split('.')
    const bSymbol = b.symbol.split('.')

    const aK = Number.parseInt(aSymbol.pop())
    const bK = Number.parseInt(bSymbol.pop())

    return aK < bK ? -1 : 1
}

const refreshProgramLearningOutComes = data => {
    Object.keys(data).forEach((type, index) => {
        const typeIndex = index + 1
        Object.keys(data[type]).forEach((typeDetail, index) => {
            const typeDetailIndex = index + 1
            data[type][typeDetail].data.forEach((element, index) => {
                element.symbol =`PLO - ${typeIndex}.${typeDetailIndex}.${index + 1}` 
            })
        })
    })

    return data
}

const splitProgramLearningOutcomes = (data) => {
    const categories = {
        KIEN_THUC: {
            KIEN_THUC_DAI_HOC_HUE: { typeIndex: '1.1', title: "Kiến thức chung trong toàn Đại học Huế" },
            KIEN_THUC_DAI_HOC_KHOA_HOC: { typeIndex: '1.2', title: "Kiến thức chung trong Trường Đại học Khoa học" },
            KIEN_THUC_LINH_VUC: { typeIndex: '1.3', title: "Kiến thức chung theo lĩnh vực" },
            KIEN_THUC_NHOM_NGANH: { typeIndex: '1.4', title: "Kiến thức chung của nhóm ngành" },
            KIEN_THUC_NGANH: { typeIndex: '1.5', title: "Kiến thức của ngành" }
        },
        KY_NANG: {
            KY_NANG_CHUYEN_MON: { typeIndex: '2.1', title: "Kỹ năng chuyên môn" },
            KY_NANG_MEM: { typeIndex: '2.2', title: "Kỹ năng mềm" }
        },
        THAI_DO: {
            THAI_DO_CA_NHAN: { typeIndex: '3.1', title: "Phẩm chất, đạo đức và thái độ của cá nhân" },
            THAI_DO_NGHE_NGHIEP: { typeIndex: '3.2', title: "Phẩm chất, đạo đức và thái độ đối với nghề nghiệp" },
            THAI_DO_XA_HOI: { typeIndex: '3.3', title: "Phẩm chất, đạo đức và thái độ đối với xã hội" }
        }
    };

    const result = {};

    Object.keys(categories).forEach(type => {
        result[type] = {};
        Object.keys(categories[type]).forEach(typeDetail => {
            result[type][typeDetail] = {
                type: type,
                typeDetail: typeDetail,
                data: data.filter(element => element.type === type && element.typeDetail === typeDetail).sort(sortCondition),
                ...categories[type][typeDetail]
            };
        });
    });

    console.log(result)
    return result;
};

export const getDataSectionD = async ({ id, api, token, completeMessage, errorMessage, setIsDataSaved, setSectionDValue }) => {
    const result = await getData(api, `/api/programLearningOutcomes/${id}`, token, completeMessage, errorMessage)
    
    if(result.status == 200) {
        const data = refreshProgramLearningOutComes(splitProgramLearningOutcomes(result.data.data))
        console.log(data)
        setSectionDValue(data)
        setIsDataSaved(true)
    
        // Lưu lại 1 lần để cập nhật symbol (nhiều lúc sai sót hay lỡ đụng vô db) ==> đảm bảo symbol luôn đúng
        const update = await postData(api, "/api/programLearningOutcomes/updatePLOs", token, [
            ...data.KIEN_THUC.KIEN_THUC_DAI_HOC_HUE.data,
            ...data.KIEN_THUC.KIEN_THUC_DAI_HOC_KHOA_HOC.data,
            ...data.KIEN_THUC.KIEN_THUC_LINH_VUC.data,
            ...data.KIEN_THUC.KIEN_THUC_NGANH.data,
            ...data.KIEN_THUC.KIEN_THUC_NHOM_NGANH.data,
            ...data.KY_NANG.KY_NANG_CHUYEN_MON.data,
            ...data.KY_NANG.KY_NANG_MEM.data,
            ...data.THAI_DO.THAI_DO_CA_NHAN.data,
            ...data.THAI_DO.THAI_DO_NGHE_NGHIEP.data,
            ...data.THAI_DO.THAI_DO_XA_HOI.data,
        ])
    } else {
        setIsDataSaved(true)
        throw "wrong"
    }

}

export const changeDataSectionD = ({ e, setState, id, type, typeDetail, setIsDataSaved }) => {
    function isValidCompetency(str) {
        // Kiểm tra nếu giá trị trống thì hợp lệ
        if (str.trim() === '') {
            return true;
        }

        // Kiểm tra nếu giá trị là số nguyên và nhỏ hơn hoặc bằng 5
        const num = +str;
        return Number.isInteger(num) && num <= 5;
    }

    // console.log(e.target.value, e.target.name)
    const elementValue = e.target.value
    const elementName = e.target.name

    setIsDataSaved(false)
    setState(prev => {
        let value = prev[type][typeDetail].data
        if(elementName == "competency" && !isValidCompetency(elementValue))
            return prev
        
        
        value = value.map(element => {
            if(element.id == id) {
                return {
                    ...element,
                    [elementName]: elementValue
                }
            } else 
            return element
        })

        return {
            ...prev,
            [type]: {
                ...prev[type],
                [typeDetail]: {
                    ...prev[type][typeDetail],
                    data: value
                }
            }
        }
    })
}

export const handleSaveChangeElement = async ({ api, token, data, setIsDataSaved, completeMessage, errorMessage }) => {
    const payload = {
        ...data,
        competency: parseInt(data.competency)
    }

    console.log(payload)

    const result = await postData(api, "/api/programLearningOutcomes/update", token, payload)
    console.log(result)

    if(result.status == 200)
        setIsDataSaved(true)
}

export const handleCreatePLO = async ({ api, token, numOfElement, type, typeDetail, typeIndex, programId, setState, setIsDisable, setIsDataSaved }) => {
    setIsDisable(true)
    setIsDataSaved(false)
    
    const payload = {
        programId,
        type,
        typeDetail,
        symbol: `PLO - ${typeIndex}.${numOfElement + 1}`
    }

    const result = await postData(api, "/api/programLearningOutcomes/createPLO", token, payload)

    if(result.status == 200) 
        setState(splitProgramLearningOutcomes(result.data.data))

    setIsDisable(false)
    setIsDataSaved(true)
} 

const handleSaveChangeTypeElement = async ({ api, token, value, completeMessage, errorMessage }) => {
    
    const payload = Object.keys(value).reduce((acc, element) => {
        return [ ...acc, ...value[element].data]
    }, [])

    console.log(payload)
    
    const result = await postData(api, "/api/programLearningOutcomes/updatePLOs", token, payload)
}

export const handleDeletePLO = async({ api, token, id, setState, symbol, type, setIsDataSaved }) => {
    const payload = {
        id
    }
    
    await Swal.fire({
        title: "XÓA CHUYÊN NGÀNH",
        text: `Bạn có muốn xóa chuẩn đầu ra ${symbol} không?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        confirmButtonColor: '#BE0000', // Màu đỏ cho nút "Có"
        reverseButtons: true, // Đổi vị trí các nút
    }).then(async (result) => {
        if(result.isConfirmed) {
            setIsDataSaved(false)
            const deleteResult = await deleteData(api, `/api/programLearningOutcomes/deletePLO/${id}`, token, payload)

            if(deleteResult.status == 200) {
                // const data = refreshProgramObjective(splitProgramObjective(deleteResult.data.data))
                const data = refreshProgramLearningOutComes(splitProgramLearningOutcomes(deleteResult.data.data))
                setState(data)

                const value = data[type]

                console.log(value)
                await handleSaveChangeTypeElement({ api, token, value })
            }

            console.log(payload)

            setIsDataSaved(true)
        }
    });
}
