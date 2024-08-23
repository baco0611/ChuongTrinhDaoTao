import { alertErrorDataSave, postData } from "../../../utils/function"
import { sortCondition } from "../database/sectionC"

const sortData = (element, type, typeIndex) => {
    const value = element.map((item, index) => {
        return {
            symbol: `PO - ${typeIndex}.${index+1}`,
            content: item.content,
            type: type,
            id: item.id,
            programId: item.programId
        }
    })

    value.sort(sortCondition)

    return value
}

const autoSavePO = async ({ api, token, payload, setIsDataSaved }) => {
    const result = await postData(api, "/update-program-objectives", token, payload)

    console.log(result)
    if(result.status == 200)
        setIsDataSaved(true)
    else
        alertErrorDataSave()
}

const handleChangeIndexComponent = async ({ data, api, token, source, destination, setState, setIsDataSaved }) => {
    setIsDataSaved(false)

    const sourceType = source.droppableId
    const destinationType = destination.droppableId

    const dataSource = data[sourceType]
    const listSource = dataSource.data
    const element = listSource[source.index]

    const dataDestination = data[destinationType]
    const listDestination = dataDestination.data

    const sourceResult = sortData([...listSource.slice(0, source.index), ...listSource.slice(source.index + 1)], dataSource.type, dataSource.typeIndex)
    const destinationResult = sortData([...listDestination.slice(0, destination.index), element, ...listDestination.slice(destination.index)], dataDestination.type, dataDestination.typeIndex)

    console.log(sourceResult)
    console.log(destinationResult)

    const stateData = {
        ...data,
        [sourceType]: {
            ...dataSource,
            data: sourceResult
        },
        [destinationType]: {
            ...dataDestination,
            data: destinationResult
        }
    }

    await autoSavePO({ 
        api, 
        token, 
        payload: [...sourceResult, ...destinationResult],
        setIsDataSaved
    })

    
    setState(stateData)
}

const changeIndex = async ({ data, api, token, source, destination, setState, setIsDataSaved }) => {
    setIsDataSaved(false)

    const type = source.droppableId
    const dataType = data[type]
    const list = dataType.data

    const removedElement = list.splice(source.index, 1)[0]
    list.splice(destination.index, 0, removedElement)
    const dataResult = sortData(list, type, dataType.typeIndex)

    console.log(dataResult)

    const stateData = {
        ...data,
        [type]: {
            ...dataType,
            data: dataResult
        }
    }

    await autoSavePO({ 
        api, 
        token, 
        payload: dataResult,
        setIsDataSaved
    })

    setState(stateData)
}

export const handleDragEnd = async ({ e, data, api, token, setState, setIsDataSaved }) => {
    const { source, destination, type } = e

    if(!destination) return

    if(source.droppableId === destination.droppableId && source.index === destination.index) return 

    if(type === "PO") {
        if(source.droppableId === destination.droppableId) {
            changeIndex({ source, destination, data, api, token, setState, setIsDataSaved })
            return
        }

        // Handle change index and component
        handleChangeIndexComponent({ source, destination, data, api, token, setState, setIsDataSaved })
    }
}