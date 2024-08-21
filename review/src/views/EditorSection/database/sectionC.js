import { getData } from "../../../utils/function"

const sortCondition = (a, b) => {
    const aSymbol = a.symbol.split('.')
    const bSymbol = b.symbol.split('.')

    const aK = Number.parseInt(aSymbol.pop())
    const bK = Number.parseInt(bSymbol.pop())

    return aK < bK ? -1 : 1
}

const splitProgramObjective = (data) => {
    // Tách thành 3 loại
    let KIEN_THUC = data.filter(element => element.type == "KIEN_THUC")
    let KY_NANG = data.filter(element => element.type == "KY_NANG")
    let THAI_DO = data.filter(element => element.type == "THAI_DO")

    // Sort đúng thứ tự
    KIEN_THUC.sort(sortCondition)
    KY_NANG.sort(sortCondition)
    THAI_DO.sort(sortCondition)

    // Convert lại cho đúng dạng
    KIEN_THUC = {
        type: "KIEN_THUC",
        typeIndex: 1,
        data: KIEN_THUC
    }
    KY_NANG = {
        type: "KY_NANG",
        typeIndex: 2,
        data: KY_NANG
    }
    THAI_DO = {
        type: "THAI_DO",
        typeIndex: 3,
        data: THAI_DO
    }

    return {
        KIEN_THUC,
        KY_NANG,
        THAI_DO
    }
}

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
