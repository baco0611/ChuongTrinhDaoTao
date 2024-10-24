import { getData, postData } from "../../../utils/function"

export const splitSectionEData = data => {
    const result = {}

    data.forEach(item => {
        if (!result[item.ploId]) {
            result[item.ploId] = {};
        }
        result[item.ploId][item.poId] = { 
            id: item.id,
            isChecked: true
        }
    })

    return result

}

export const getDataSectionE = async ({id, api, token, setSectionEValue}) => {
    const result = await getData(api, `/api/learning-objectives/getAll/${id}`, token)

    // console.log(splitSectionEData(result.data.data))
    if(result.status == 200)
        setSectionEValue(splitSectionEData(result.data.data))
}

export const handleChangValueE = ({ element, setState }) => {
    setState(prev => {
        const result = {...prev}

        console.log(result)
        
        if(result[element.ploId]?.[element.poId])
            result[element.ploId][element.poId] = {
                ...result[element.ploId][element.poId],
                isChecked: !element.isChecked
            }
        else
            result[element.ploId] = {
                ...result[element.ploId],
                [element.poId]: {
                    isChecked: !element.isChecked
                }
            }

        return result
    })
}

export const handleSavingData = async ({ data, setState, setIsFetchData, api, token, id }) => {
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
            createElement.push({ ploId: ploId, poId: poId });
            }
        }
    }

    setIsFetchData(true)
    const payload = {
        deleteElement,
        createElement,
        programId: id,
    }

    const result = await postData(api, "/api/learning-objectives/update", token, payload)

    console.log(result)
    if(result.status == 200) {
        setState(splitSectionEData(result.data))
    }
    
    setIsFetchData(false)
}

// {"id": 1, "poId": 1, "ploId": 1},
// {"id": 2, "poId": 1, "ploId": 2}
// {"id": 3, "poId": 1, "ploId": 3},
// {"id": 4, "poId": 1, "ploId": 4},
// {"id": 5, "poId": 1, "ploId": 5},
// {"id": 6, "poId": 2, "ploId": 6},
// {"id": 7, "poId": 2, "ploId": 7},
// {"id": 8, "poId": 2, "ploId": 8},
// {"id": 9, "poId": 3, "ploId": 9},
// {"id": 10, "poId": 3, "ploId": 12},
// {"id": 11, "poId": 2, "ploId": 1},
// {"id": 12, "poId": 3, "ploId": 1},
// {"id": 13, "poId": 4, "ploId": 1},
// {"id": 14, "poId": 4, "ploId": 2},
// {"id": 15, "poId": 4, "ploId": 3}