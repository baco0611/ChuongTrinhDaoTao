import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../../context/ContextProvider"
import './SectionC.scss'
import EditHeader from "../EditHeader/EditHeader"
import EditFooter from "../EditFooter/EditFooter"
import Loader from "../../../components/Loader/Loader"
import { useQuery } from "react-query"
import axios from "axios"
import POBlock from "./POBlock"
import { DragDropContext } from 'react-beautiful-dnd' 
import { handleChangeDataC, handleSplitSectionC, handleUpdateSectionC } from "../Database/HandleActionSectionC"
import { resetPage } from "../Database/HandleUpdateDatabase"

function SectionC() {

    const { id } = useParams()
    const { apiURL, fakeApi } = useContext(UserContext)
    const navigate = useNavigate()
    const [ sectionCValue, setSectionCValue ] = useState({
        KIEN_THUC: {
            type: 'KIEN_THUC',
            typeIndex: 1,
            data: []
        },
        KY_NANG: {
            type: 'KY_NANG',
            typeIndex: 2,
            data: []
        },
        THAI_DO: {
            type: 'THAI_DO',
            typeIndex: 3,
            data: []
        }
    })
    const [ deleteElement, setDeleteElement ] = useState([])
    const [ isLoaded, setIsLoaded ] = useState(false)
    const currentSection = "B"
    const currentId = id
    const setData = {
        setSectionCValue,
        setDeleteElement
    }

    // console.log(sectionCValue)

    useEffect(() => {
        resetPage('C', id)
    }, [])

    const fecthAPI = (id) => {
        const sectionCValueApi = `${apiURL}/sectionC/${id}`
        // const sectionCValueApi = `${fakeApi}/sectionC/${id}`
        return async () => {
            await axios.get(sectionCValueApi) 
                .then(response => {
                    const restData = response.data
                    console.log(restData)
                    if(restData.data)
                        handleSplitSectionC({ 
                            data: restData.data,
                            setSectionCValue,
                            idctdt: id
                        })
                    setIsLoaded(true)
                })
                .catch(error => {
                    console.log(error)
                    navigate('/error')
                    setIsLoaded(true)
                })
        }
    }

    // useEffect(() => {
    //     if(isLoaded) {
    //         handleUpdateSectionC(currentId, apiURL, setData)
    //     }
    // }, [sectionCValue])

    useEffect(() => {
        sessionStorage.setItem(`sectionC-${id}`, JSON.stringify([...sectionCValue.KIEN_THUC.data, ...sectionCValue.KY_NANG.data, ...sectionCValue.THAI_DO.data]))
        sessionStorage.setItem(`sectionC-delete-${id}`, JSON.stringify(deleteElement))
    })

    const { isLoading, isError} = useQuery(`sectionC-${id}`, fecthAPI(id),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    const handleDragEnd = (results) => {
        // console.log(results)
        const { source, destination, type } = results
    
        if(!destination) return
    
        if(source.droppableId === destination.droppableId && source.index === destination.index) return 
        
        if(type === 'PO') {

            const handleChangeIndexComponent = ({ source, destination }) => {
                const sourceType = source.droppableId
                const destinationType = destination.droppableId

                setSectionCValue(prev => {
                    const dataSource = prev[sourceType]
                    const listSource = dataSource.data
                    const data = listSource[source.index]

                    const dataDestination = prev[destinationType]
                    const listDestination = dataDestination.data
                
                    return {
                        ...prev,
                        [sourceType]: {
                            ...dataSource,
                            data: handleChangeDataC([...listSource.slice(0, source.index), ...listSource.slice(source.index + 1)], dataSource.type, dataSource.typeIndex, id)
                        },
                        [destinationType]: {
                            ...dataDestination,
                            data: handleChangeDataC([...listDestination.slice(0, destination.index), data, ...listDestination.slice(destination.index)], dataDestination.type, dataDestination.typeIndex, id)
                        }
                    }
                })
            }

            const changeIndex = ({ source, destination }) => {

                const type = source.droppableId

                setSectionCValue(prev => {
                    const dataType = prev[type]
                    const list = dataType.data

                    const removedElement = list.splice(source.index, 1)[0]
                    list.splice(destination.index, 0, removedElement)
                
                    return {
                        ...prev,
                        [type]: {
                            ...dataType,
                            data: handleChangeDataC(list, type, dataType.typeIndex, id)
                        }
                    }
                })
            }

            // If The drag is in 1 PO block
            if(source.droppableId === destination.droppableId) {
                changeIndex({
                    source,
                    destination
                })
                return
            }

            // Handle change index and component
            handleChangeIndexComponent({ source, destination })
        }
    }

    console.log()

    return(
        <>
            <EditHeader 
                currentSection={2} 
                setData={setData}
            />
            <div id="section-C" className="section">
                <div className="section-header wrapper">
                    <h1>C. MỤC TIÊU CỤ THỂ</h1>
                </div>
                <div className="section-C wrapper">
                    <p className="section-C-details">Tối đa 05 mục tiêu cụ thể cho mỗi phần về kiến thức, kỹ năng và thái độ của sinh viên sau khi tốt nghiệp, PO = Program Objectives.<br/>
                        Sinh viên sau khi tốt nghiệp có các kiến thức, kỹ năng và thái độ được thể hiện như bên dưới.<br/>
                        <span style={{ fontWeight: 600, fontSize: '12px', color: '#BE0000' }}>
                            Lưu ý: Dữ liệu được lưu tự động khi click chuột ra khỏi ô nhập dữ liệu, thêm/xóa mục hoặc chuyển đổi giữa các phần.  Vui lòng không reload hay thoát khỏi trang khi dữ liệu chưa được lưu.
                            Khi đã xóa một mục tiêu cụ thể thì dữ liệu về mục tiêu đó ở ma trận mục tiêu - chuẩn đầu ra sẽ bị xóa. Vì vậy, hãy cẩn trọng trước khi thực hiện thao tác xóa!
                        </span>
                    </p>
                    <div className="section-C-main">
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <POBlock
                                title = {'1. KIẾN THỨC'}
                                data = {sectionCValue.KIEN_THUC}
                                setState = {setSectionCValue}
                                idCTDT = {id}
                                currentSection = {currentSection}
                                setData={setData}
                                dataSectionC = {sectionCValue}
                                apiURL = {apiURL}
                            />
                            <POBlock
                                title = {'2. KỸ NĂNG'}
                                data = {sectionCValue.KY_NANG}
                                setState = {setSectionCValue}
                                idCTDT = {id}
                                currentSection = {currentSection}
                                setData={setData}
                                dataSectionC = {sectionCValue}
                                apiURL = {apiURL}
                            />
                            <POBlock
                                title = {'3. THÁI ĐỘ'}
                                data = {sectionCValue.THAI_DO}
                                setState = {setSectionCValue}
                                idCTDT = {id}
                                currentSection = {currentSection}
                                setData={setData}
                                dataSectionC = {sectionCValue}
                                apiURL = {apiURL}
                            />
                        </DragDropContext>
                    </div>
                </div>
            </div>
            <EditFooter 
                currentSection={2} 
                setData={{
                    setSectionCValue,
                    setDeleteElement
                }}
            />
        </>
    )
}

export default SectionC