import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../../context/ContextProvider"
import './SectionD.scss'
import EditHeader from "../EditHeader/EditHeader"
import EditFooter from "../EditFooter/EditFooter"
import { useQuery } from "react-query"
import Loader from "../../../components/Loader/Loader"
import axios from "axios"
import { handleSplitSectionD, handleChangeDataD } from "../Database/HandleActionSectionD"
import PLOSection from "./PLOSection.jsx"
import { DragDropContext } from "react-beautiful-dnd"
import { resetPage } from "../Database/HandleUpdateDatabase"

function SectionD() {

    const { id } = useParams()
    const { apiURL, fakeApi, isDataSaved, setIsDataSaved, handleBeforeUnload } = useContext(UserContext)
    const navigate = useNavigate()
    const [ isHiddenA, setIsHiddenA ] = useState(true)
    const [ isHiddenB, setIsHiddenB ] = useState(true)
    const [ isHiddenC, setIsHiddenC ] = useState(true)
    const [ sectionDValue, setSectionDValue ] = useState({
        KIEN_THUC: {
            KIEN_THUC_DAI_HOC_HUE: {
                type: 'KIEN_THUC',
                typeDetail: 'KIEN_THUC_DAI_HOC_HUE',
                data: [],
                typeIndex: '1.1'
            },
            KIEN_THUC_DAI_HOC_KHOA_HOC: {
                type: 'KIEN_THUC',
                typeDetail: 'KIEN_THUC_DAI_HOC_KHOA_HOC',
                data: [],
                typeIndex: '1.2'
            },
            KIEN_THUC_LINH_VUC: {
                type: 'KIEN_THUC',
                typeDetail: 'KIEN_THUC_LINH_VUC',
                data: [],
                typeIndex: '1.3'
            },
            KIEN_THUC_NHOM_NGANH: {
                type: 'KIEN_THUC',
                typeDetail: 'KIEN_THUC_NHOM_NGANH',
                data: [],
                typeIndex: '1.4'
            },
            KIEN_THUC_NGANH: {
                type: 'KIEN_THUC',
                typeDetail: 'KIEN_THUC_NGANH',
                data: [],
                typeIndex: '1.5'
            }
        },
        KY_NANG: {
            KY_NANG_CHUYEN_MON: {
                type: 'KY_NANG',
                typeDetail: 'KY_NANG_CHUYEN_MON',
                data: [],
                typeIndex: '2.1'
            },
            KY_NANG_MEM: {
                type: 'KY_NANG',
                typeDetail: 'KY_NANG_CHUYEN_MEM',
                data: [],
                typeIndex: '2.2'
            }
        },
        THAI_DO: {
            THAI_DO_CA_NHAN: {
                type: 'THAI_DO',
                typeDetail: 'THAI_DO_CA_NHAN',
                data: [],
                typeIndex: '3.1'
            },
            THAI_DO_NGHE_NGHIEP: {
                type: 'THAI_DO',
                typeDetail: 'THAI_DO_NGHE_NGHIEP',
                data: [],
                typeIndex: '3.2'
            },
            THAI_DO_XA_HOI: {
                type: 'THAI_DO',
                typeDetail: 'THAI_DO_XA_HOI',
                data: [],
                typeIndex: '3.3'
            }
        }
    })
    const [ deleteElement, setDeleteElement ] = useState([])
    const setData = {
        setSectionDValue,
        setDeleteElement,
        setIsDataSaved
    }

    useEffect(() => {
        resetPage('D', id)
    }, [])

    //Use effec6t này để thêm phần remind thông tin chưa đc lưu
    useEffect(() => {
        // Thêm event listener khi component được mount
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Dọn dẹp event listener khi component bị unmount
        return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDataSaved]); // Phụ thuộc vào trạng thái của isDataSaved và isApiDone

    useEffect(() => {
        sessionStorage.setItem(`sectionD-${id}`, JSON.stringify([
            ...sectionDValue.KIEN_THUC.KIEN_THUC_DAI_HOC_HUE.data,
            ...sectionDValue.KIEN_THUC.KIEN_THUC_DAI_HOC_KHOA_HOC.data,
            ...sectionDValue.KIEN_THUC.KIEN_THUC_LINH_VUC.data,
            ...sectionDValue.KIEN_THUC.KIEN_THUC_NHOM_NGANH.data,
            ...sectionDValue.KIEN_THUC.KIEN_THUC_NGANH.data,
            ...sectionDValue.KY_NANG.KY_NANG_CHUYEN_MON.data,
            ...sectionDValue.KY_NANG.KY_NANG_MEM.data,
            ...sectionDValue.THAI_DO.THAI_DO_CA_NHAN.data,
            ...sectionDValue.THAI_DO.THAI_DO_NGHE_NGHIEP.data,
            ...sectionDValue.THAI_DO.THAI_DO_XA_HOI.data
        ]))
        sessionStorage.setItem(`sectionD-delete-${id}`, JSON.stringify(deleteElement))
    })

    const fecthAPI = (id) => {
        const sectionDValueApi = `${apiURL}/sectionD/${id}`
        // const sectionDValueApi = `${fakeApi}/sectionD/${id}`
        return async () => {
            await axios.get(sectionDValueApi) 
                .then(response => {
                    const restData = response.data
                    if(restData.data)
                        handleSplitSectionD({ 
                            data: restData.data,
                            setSectionDValue,
                            idCTDT: id
                        })
                })
                .catch(error => {
                    console.log(error)
                    navigate('/error')
                })
        }
    }

    const { isLoading, isError} = useQuery(`sectionD-${id}`, fecthAPI(id),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    const handleDragEnd = (results) => {
        console.log(results)
        const { source, destination, type } = results

        if(!destination) return

        if(source.droppableId === destination.droppableId && source.index === destination.index) return 

        if(type === 'PLO') {

            const handleChangeIndexComponent = ({ source, destination }) => {
                const [ sourceType, sourceTypeDetail ] = source.droppableId.split('/')
                const [ destinationType, destinationTypeDetail ] = destination.droppableId.split('/')

                setSectionDValue(prev => {
                    const dataSource = prev[sourceType]
                    const dataSourceDetail = dataSource[sourceTypeDetail]
                    const sourceList = dataSourceDetail.data 
                    const data = sourceList[source.index]

                    const dataDestination = prev[destinationType]
                    const dataDestinationDetail = dataDestination[destinationTypeDetail]
                    const destinationList = dataDestinationDetail.data

                    const sourceData = handleChangeDataD(
                        [...sourceList.slice(0, source.index), ...sourceList.slice(source.index + 1)],
                        sourceType, sourceTypeDetail, dataSourceDetail.typeIndex, id
                    )

                    const destinationData = handleChangeDataD(
                        [...destinationList.slice(0, destination.index), data, ...destinationList.slice(destination.index)],
                        destinationType, destinationTypeDetail, dataDestinationDetail.typeIndex, id
                    )

                    if(sourceType !== destinationType)
                        return {
                            ...prev,
                            [sourceType]: {
                                ...dataSource,
                                [sourceTypeDetail]: {
                                    ...dataSourceDetail,
                                    data: sourceData
                                }
                            },
                            [destinationType]: {
                                ...dataDestination,
                                [destinationTypeDetail]: {
                                    ...dataDestinationDetail,
                                    data: destinationData
                                }
                            }
                        }
                    else 
                    return {
                        ...prev,
                        [sourceType]: {
                            ...dataSource,
                            [sourceTypeDetail]: {
                                ...dataSourceDetail,
                                data: sourceData
                            },
                            [destinationTypeDetail]: {
                                ...dataDestinationDetail,
                                data: destinationData
                            }
                        },
                    }
                })
            }

            const changeIndex = ({ source, destination }) => {
                const [type, typeDetail] = source.droppableId.split('/')
                
                setSectionDValue(prev => {
                    const typeData = prev[type]
                    const typeDetailData = typeData[typeDetail]
                    const list = typeDetailData.data

                    const removedElement = list.splice(source.index, 1)[0]
                    list.splice(destination.index, 0, removedElement)

                    return {
                        ...prev,
                        [type]: {
                            ...typeData,
                            [typeDetail]: {
                                ...typeDetailData,
                                data: handleChangeDataD(list, type, typeDetail, typeDetailData.typeIndex, id)
                            }
                        }
                    }
                })
            }

            if(source.droppableId === destination.droppableId) {
                changeIndex({ source, destination })
                return
            }

            handleChangeIndexComponent({ source, destination })
        }
    }

    return(
        <>
            <EditHeader
                currentSection={3}
                setData={setData}
            />
            <div id="section-D" className="section">
                <div className="section-header wrapper">
                    <h1>D. CHUẨN ĐẦU RA VÀ TRÌNH ĐỘ NĂNG LỰC</h1>
                </div>
                <div className="section-D wrapper">
                    <p className="section-D-details">
                        Viết theo từng chuẩn đầu ra, bao gồm các chủ đề chuẩn đầu ra và trình độ năng lực (TĐNL – tham khảo thêm tài liệu và thang trình độ năng lực kèm theo) mà chuẩn đầu ra yêu cầu khi sinh viên tốt nghiệp, PLO = Program Learning Outcomes.<br/>
                        <span style={{ fontWeight: 600, fontSize: '14px', color: '#BE0000' }}>Lưu ý: Dữ liệu chỉ được lưu lại khi bấm nút lưu hoặc nút hoàn tất. Khi đã xóa một chuẩn đầu ra thì dữ liệu về mục tiêu đó ở ma trận mục tiêu - chuẩn đầu ra sẽ bị xóa. Vì vậy, hãy cẩn trọng trước khi lưu lại những thao tác đó!</span>
                    </p>
                    <p className="section-D-details" style={{ fontWeight: 700, padding: '10px 0'}}>Hãy bấm vào từng tiêu đề để thao tác.</p>
                    <div className="section-D-main">
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <div className="section-D-block" id="KIEN_THUC">
                                <h1 onClick={() => setIsHiddenA(!isHiddenA)}>1. CHUẨN VỀ KIẾN THỨC</h1>
                                {
                                    !isHiddenA &&
                                    <>
                                        <PLOSection
                                            title={'1.1. Kiến thức chung trong toàn Đại học Huế'}
                                            type={'KIEN_THUC'}
                                            typeDetail={'KIEN_THUC_DAI_HOC_HUE'}
                                            idCTDT={id}
                                            data={sectionDValue}
                                            setState={setSectionDValue}
                                            setDelete={setDeleteElement}
                                            setData={setData}
                                        />
                                        <PLOSection
                                            title={'1.2. Kiến thức chung trong Trường Đại học Khoa học'}
                                            type={'KIEN_THUC'}
                                            typeDetail={'KIEN_THUC_DAI_HOC_KHOA_HOC'}
                                            idCTDT={id}
                                            data={sectionDValue}
                                            setState={setSectionDValue}
                                            setDelete={setDeleteElement}
                                            setData={setData}
                                        />
                                        <PLOSection
                                            title={'1.3. Kiến thức chung theo lĩnh vực'}
                                            type={'KIEN_THUC'}
                                            typeDetail={'KIEN_THUC_LINH_VUC'}
                                            idCTDT={id}
                                            data={sectionDValue}
                                            setState={setSectionDValue}
                                            setDelete={setDeleteElement}
                                            setData={setData}
                                        />
                                        <PLOSection
                                            title={'1.4. Kiến thức chung của nhóm ngành'}
                                            type={'KIEN_THUC'}
                                            typeDetail={'KIEN_THUC_NHOM_NGANH'}
                                            idCTDT={id}
                                            data={sectionDValue}
                                            setState={setSectionDValue}
                                            setDelete={setDeleteElement}
                                            setData={setData}
                                        />
                                        <PLOSection
                                            title={'1.5. Kiến thức của ngành'}
                                            type={'KIEN_THUC'}
                                            typeDetail={'KIEN_THUC_NGANH'}
                                            idCTDT={id}
                                            data={sectionDValue}
                                            setState={setSectionDValue}
                                            setDelete={setDeleteElement}
                                            setData={setData}
                                        />
                                    </>
                                }
                                
                            </div>
                            <div className="section-D-block" id="KY_NANG">
                                <h1 onClick={() => setIsHiddenB(!isHiddenB)}>2. CHUẨN VỀ KỸ NĂNG</h1>
                                {
                                    !isHiddenB &&
                                    <>
                                        <PLOSection
                                            title={'2.1. Kỹ năng chuyên môn'}
                                            type={'KY_NANG'}
                                            typeDetail={'KY_NANG_CHUYEN_MON'}
                                            idCTDT={id}
                                            data={sectionDValue}
                                            setState={setSectionDValue}
                                            setDelete={setDeleteElement}
                                            setData={setData}
                                        />
                                        <PLOSection
                                            title={'2.2. Kỹ năng mềm'}
                                            type={'KY_NANG'}
                                            typeDetail={'KY_NANG_MEM'}
                                            idCTDT={id}
                                            data={sectionDValue}
                                            setState={setSectionDValue}
                                            setDelete={setDeleteElement}
                                            setData={setData}
                                        />
                                    </>
                                }
                            </div>
                            <div className="section-D-block" id="THAI_DO">
                                <h1 onClick={() => setIsHiddenC(!isHiddenC)}>3. CHUẨN VỀ THÁI ĐỘ</h1>
                                {
                                    !isHiddenC &&
                                    <>
                                        <PLOSection
                                            title={'3.1. Phẩm chất, đạo đức và thái độ của cá nhân'}
                                            type={'THAI_DO'}
                                            typeDetail={'THAI_DO_CA_NHAN'}
                                            idCTDT={id}
                                            data={sectionDValue}
                                            setState={setSectionDValue}
                                            setDelete={setDeleteElement}
                                            setData={setData}
                                        />
                                        <PLOSection
                                            title={'3.2. Phẩm chất, đạo đức và thái độ đối với nghề nghiệp'}
                                            type={'THAI_DO'}
                                            typeDetail={'THAI_DO_NGHE_NGHIEP'}
                                            idCTDT={id}
                                            data={sectionDValue}
                                            setState={setSectionDValue}
                                            setDelete={setDeleteElement}
                                            setData={setData}
                                        />
                                        <PLOSection
                                            title={'3.3. Phẩm chất, đạo đức và thái độ đối với xã hội'}
                                            type={'THAI_DO'}
                                            typeDetail={'THAI_DO_XA_HOI'}
                                            idCTDT={id}
                                            data={sectionDValue}
                                            setState={setSectionDValue}
                                            setDelete={setDeleteElement}
                                            setData={setData}
                                        />
                                    </>
                                }
                            </div>
                        </DragDropContext>
                    </div>
                </div>
            </div>
            <EditFooter
                currentSection={3}
                setData={{
                    setSectionDValue,
                    setDeleteElement
                }}
            />
        </>
    )
}

export default SectionD