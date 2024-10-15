import { getData } from "../../../utils/function"

export const splitSectionEData = data => {
    const result = {}

    data.forEach(item => {
        if (!result[item.PLOId]) {
            result[item.PLOId] = {};
        }
        result[item.PLOId][item.POId] = { 
            id: item.id,
            isChecked: true
        }
    })

    return result

}

export const getDataSectionE = async ({id, api, token, setSectionEValue}) => {
    const result = await getData(api, "/program/po-plo-matrix", token)

    // console.log(splitSectionEData(result.data.data))
    if(result.status == 200)
        setSectionEValue(splitSectionEData(result.data.data))
}

export const handleChangValueE = ({ element, setState }) => {
    setState(prev => {
        const result = {...prev}
        
        result[element.PLOId][element.POId] = {
            ...result[element.PLOId][element.POId],
            isChecked: !element.isChecked
        }
        
        return result
    })
}

export const handleSavingData = ({ data, setState, setIsFetchData, api, token }) => {
    console.log(JSON.stringify( data))
}