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

const handleChangeIndexComponent = ({ source, destination, setState }) => {
    const sourceType = source.droppableId
    const destinationType = destination.droppableId

    setState(prev => {
        const dataSource = prev[sourceType]
        const listSource = dataSource.data
        const data = listSource[source.index]

        const dataDestination = prev[destinationType]
        const listDestination = dataDestination.data
    
        return {
            ...prev,
            [sourceType]: {
                ...dataSource,
                data: sortData([...listSource.slice(0, source.index), ...listSource.slice(source.index + 1)], dataSource.type, dataSource.typeIndex)
            },
            [destinationType]: {
                ...dataDestination,
                data: sortData([...listDestination.slice(0, destination.index), data, ...listDestination.slice(destination.index)], dataDestination.type, dataDestination.typeIndex)
            }
        }
    })
}

const changeIndex = ({ source, destination, setState }) => {

    const type = source.droppableId

    setState(prev => {
        const dataType = prev[type]
        const list = dataType.data

        const removedElement = list.splice(source.index, 1)[0]
        list.splice(destination.index, 0, removedElement)
    
        return {
            ...prev,
            [type]: {
                ...dataType,
                data: sortData(list, type, dataType.typeIndex)
            }
        }
    })
}

export const handleDragEnd = async ({ e, setState, setIsDataSaved }) => {
    const { source, destination, type } = e

    if(!destination) return

    if(source.droppableId === destination.droppableId && source.index === destination.index) return 

    if(type === "PO") {
        if(source.droppableId === destination.droppableId) {
            changeIndex({
                source,
                destination,
                setState,
            })
            return
        }

        // Handle change index and component
        handleChangeIndexComponent({ 
            source, 
            destination,
            setState,
        })
    }
}