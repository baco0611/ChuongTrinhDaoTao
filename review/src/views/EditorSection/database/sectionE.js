import { getData, postData } from "../../../utils/function"

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

export const handleSavingData = async ({ data, setState, setIsFetchData, api, token }) => {
    const deleteElement = [];

    for (const ploId in data) {
        for (const poId in data[ploId]) {
            const item = data[ploId][poId];
            if (item.id && item.isChecked === false) {
            deleteElement.push(item.id);
            }
        }
    }

    const createElement = [];

    for (const ploId in data) {
        for (const poId in data[ploId]) {
            const item = data[ploId][poId];
            if (!item.id && item.isChecked === true) {
            createElement.push({ PLOId: ploId, POId: poId });
            }
        }
    }

    setIsFetchData(true)
    const payload = {
        deleteElement,
        createElement
    }

    const result = await postData(api, "/program/po-plo-matrix/update", token, payload)

    console.log(result)
    if(result.status == 200) {
        setState(splitSectionEData(result.data.data))
    }
    
    setIsFetchData(false)
}

// {"id": 1, "POId": 1, "PLOId": 1},
// {"id": 2, "POId": 1, "PLOId": 2}
// {"id": 3, "POId": 1, "PLOId": 3},
// {"id": 4, "POId": 1, "PLOId": 4},
// {"id": 5, "POId": 1, "PLOId": 5},
// {"id": 6, "POId": 2, "PLOId": 6},
// {"id": 7, "POId": 2, "PLOId": 7},
// {"id": 8, "POId": 2, "PLOId": 8},
// {"id": 9, "POId": 3, "PLOId": 9},
// {"id": 10, "POId": 3, "PLOId": 12},
// {"id": 11, "POId": 2, "PLOId": 1},
// {"id": 12, "POId": 3, "PLOId": 1},
// {"id": 13, "POId": 4, "PLOId": 1},
// {"id": 14, "POId": 4, "PLOId": 2},
// {"id": 15, "POId": 4, "PLOId": 3}