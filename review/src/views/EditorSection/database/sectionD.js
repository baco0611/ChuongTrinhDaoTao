import { getData } from "../../../utils/function"

export const sortCondition = (a, b) => {
    const aSymbol = a.symbol.split('.')
    const bSymbol = b.symbol.split('.')

    const aK = Number.parseInt(aSymbol.pop())
    const bK = Number.parseInt(bSymbol.pop())

    return aK < bK ? -1 : 1
}

const splitProgramLearningOutcomes = (data) => {
    let KIEN_THUC = data.filter(element => element.type == "KIEN_THUC")
    let KY_NANG = data.filter(element => element.type == "KY_NANG")
    let THAI_DO = data.filter(element => element.type == "THAI_DO")

    KIEN_THUC = {
        KIEN_THUC_DAI_HOC_HUE: {
            type: 'KIEN_THUC',
            typeDetail: 'KIEN_THUC_DAI_HOC_HUE',
            data: KIEN_THUC.filter(element => element.typeDetail == "KIEN_THUC_DAI_HOC_HUE").sort(sortCondition),
            typeIndex: '1.1'
        },
        KIEN_THUC_DAI_HOC_KHOA_HOC: {
            type: 'KIEN_THUC',
            typeDetail: 'KIEN_THUC_DAI_HOC_KHOA_HOC',
            data: KIEN_THUC.filter(element => element.typeDetail == "KIEN_THUC_DAI_HOC_KHOA_HOC").sort(sortCondition),
            typeIndex: '1.2'
        },
        KIEN_THUC_LINH_VUC: {
            type: 'KIEN_THUC',
            typeDetail: 'KIEN_THUC_LINH_VUC',
            data: KIEN_THUC.filter(element => element.typeDetail == "KIEN_THUC_LINH_VUC").sort(sortCondition),
            typeIndex: '1.3'
        },
        KIEN_THUC_NHOM_NGANH: {
            type: 'KIEN_THUC',
            typeDetail: 'KIEN_THUC_NHOM_NGANH',
            data: KIEN_THUC.filter(element => element.typeDetail == "KIEN_THUC_NHOM_NGANH").sort(sortCondition),
            typeIndex: '1.4'
        },
        KIEN_THUC_NGANH: {
            type: 'KIEN_THUC',
            typeDetail: 'KIEN_THUC_NGANH',
            data: KIEN_THUC.filter(element => element.typeDetail == "KIEN_THUC_NGANH").sort(sortCondition),
            typeIndex: '1.5'
        }
    }

    KY_NANG = {
        KY_NANG_CHUYEN_MON: {
            type: 'KY_NANG',
            typeDetail: 'KY_NANG_CHUYEN_MON',
            data: KY_NANG.filter(element => element.typeDetail == "KY_NANG_CHUYEN_MON").sort(sortCondition),
            typeIndex: '2.1'
        },
        KY_NANG_MEM: {
            type: 'KY_NANG',
            typeDetail: 'KY_NANG_CHUYEN_MEM',
            data: KY_NANG.filter(element => element.typeDetail == "KY_NANG_CHUYEN_MEM").sort(sortCondition),
            typeIndex: '2.2'
        }
    }

    THAI_DO = {
        THAI_DO_CA_NHAN: {
            type: 'THAI_DO',
            typeDetail: 'THAI_DO_CA_NHAN',
            data: THAI_DO.filter(element => element.typeDetail =="THAI_DO_CA_NHAN").sort(sortCondition),
            typeIndex: '3.1'
        },
        THAI_DO_NGHE_NGHIEP: {
            type: 'THAI_DO',
            typeDetail: 'THAI_DO_NGHE_NGHIEP',
            data: THAI_DO.filter(element => element.typeDetail =="THAI_DO_NGHE_NGHIEP").sort(sortCondition),
            typeIndex: '3.2'
        },
        THAI_DO_XA_HOI: {
            type: 'THAI_DO',
            typeDetail: 'THAI_DO_XA_HOI',
            data: THAI_DO.filter(element => element.typeDetail =="THAI_DO_XA_HOI").sort(sortCondition),
            typeIndex: '3.3'
        }
    }

    return {
        KIEN_THUC,
        KY_NANG,
        THAI_DO
    }
}

export const getDataSectionD = async ({ id, api, token, completeMessage, errorMessage, setIsDataSaved, setSectionDValue }) => {
    const result = await getData(api, `/sectionD/${id}`, token, completeMessage, errorMessage)

    console.log(splitProgramLearningOutcomes(result.data.data))
}