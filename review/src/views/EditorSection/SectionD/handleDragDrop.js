import { alertErrorDataSave, postData } from "../../../utils/function"
import { sortCondition } from "../database/sectionD"

const sortData = (data, typeIndex) => {
    const value = data.map((item, index) => {
        return {
            symbol: `PLO - ${typeIndex}.${index+1}`,
            content: item.content,
            type: item.type,
            typeDetail: item.typeDetail,
            id: item.id,
            programId: item.programId,
            competency: item.competency
        }
    })

    value.sort(sortCondition)
    return value
}

const autoSavePLO = async ({ api, token, payload, setIsDataSaved }) => {
    const result = await postData(api, "/api/programLearningOutcomes/updatePLOs", token, payload)

    if(result.status == 200)
        setIsDataSaved(true)
    else
        alertErrorDataSave()
}

const changeIndex = ({source, destination, data, api, token, setState, setIsDataSaved}) => {
    setIsDataSaved(false)
    const [type, typeDetail] = source.droppableId.split('/')

    const typeData = data[type]
    const typeDetailData = typeData[typeDetail]
    let list = typeDetailData.data

    const removedElement = list.splice(source.index, 1)[0]
    list.splice(destination.index, 0, removedElement)
    list = sortData(list, typeDetailData.typeIndex)

    const value = {
        ...data,
        [type]: {
            ...typeData,
            [typeDetail]: {
                ...typeDetailData,
                data: list,
            }
        }
    }

    setState(value)
    autoSavePLO({api, token, payload: list, setIsDataSaved})
}

const handleChangeIndexComponent = async ({source, destination, data, api, token, setState, setIsDataSaved}) => {
    setIsDataSaved(false)
    
    const [ sourceType, sourceTypeDetail ] = source.droppableId.split('/')
    const [ destinationType, destinationTypeDetail ] = destination.droppableId.split('/')

    const dataSource = data[sourceType]
    const dataSourceDetail = dataSource[sourceTypeDetail]
    let sourceList = dataSourceDetail.data 
    let element = sourceList[source.index]

    const dataDestination = data[destinationType]
    const dataDestinationDetail = dataDestination[destinationTypeDetail]
    let destinationList = dataDestinationDetail.data

    element.type = destinationType
    element.typeDetail = destinationTypeDetail

    sourceList = sortData(
        [...sourceList.slice(0, source.index), ...sourceList.slice(source.index + 1)], 
        dataSourceDetail.typeIndex
    )
    destinationList = sortData(
        [...destinationList.slice(0, destination.index), element, ...destinationList.slice(destination.index)],
        dataDestinationDetail.typeIndex
    )


    let value

    if(sourceType != destinationType) 
        value = {
            ...data,
            [sourceType]: {
                ...dataSource,
                [sourceTypeDetail]: {
                    ...dataSourceDetail,
                    data: sourceList,
                }
            },
            [destinationType]: {
                ...dataDestination,
                [destinationTypeDetail]: {
                    ...dataDestinationDetail,
                    data: destinationList,
                }
            },
        }
    else 
        value = {
            ...data,
            [sourceType]: {
                ...dataSource,
                [sourceTypeDetail]: {
                    ...dataSourceDetail,
                    data: sourceList,
                },
                [destinationTypeDetail]: {
                    ...dataDestinationDetail,
                    data: destinationList,
                }
            },
        }

    // console.log(value)

    setState(value)
    autoSavePLO({api, token, payload: [...sourceList, ...destinationList], setIsDataSaved})
}

export const handleDragEnd = ({ e, api, data, token, setState, setIsDataSaved }) => {
    const { source, destination, type } = e
    console.log(source, destination, type)

    if(!destination) return

    if(source.droppableId === destination.droppableId && source.index === destination.index) return 

    if(type == "PLO") {
        if(source.droppableId === destination.droppableId) {
            changeIndex({ source, destination, data, api, token, setState, setIsDataSaved })
            return
        }

        handleChangeIndexComponent({ source, destination, data, api, token, setState, setIsDataSaved })
    }
}