import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../../context/ContextProvider"
import './SectionE.scss'
import EditHeader from "../EditHeader/EditHeader"
import EditFooter from "../EditFooter/EditFooter"
import axios from "axios"
import { useQuery } from "react-query"
import Loader from "../../../components/Loader/Loader"
import { handleSplitSectionD } from "../Database/HandleActionSectionD"
import { handleSplitSectionC } from "../Database/HandleActionSectionC"
import RowBlock from "./RowBlock"
import { convertValueE } from "../Database/HandleActionSectionE"
import { resetPage } from "../Database/HandleUpdateDatabase"

function SectionE() {

    const { id } = useParams()
    const { apiURL, fakeApi } = useContext(UserContext)
    const navigate = useNavigate()
    const [ sectionEValue, setSectionEValue ] = useState()

    const [ POValue, setPOValue ] = useState({
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

    const [ PLOValue, setPLOValue ] = useState({
        KIEN_THUC: {
            KIEN_THUC_DAI_HOC_HUE: {
                type: 'KIEN_THUC',
                typeDetail: 'KIEN_THUC_DAI_HOC_HUE',
                title: 'Kiến thức chung trong toàn Đại học Huế',
                data: [],
                typeIndex: '1.1'
            },
            KIEN_THUC_DAI_HOC_KHOA_HOC: {
                type: 'KIEN_THUC',
                typeDetail: 'KIEN_THUC_DAI_HOC_KHOA_HOC',
                title: 'Kiến thức chung trong Trường Đại học Khoa học',
                data: [],
                typeIndex: '1.2'
            },
            KIEN_THUC_LINH_VUC: {
                type: 'KIEN_THUC',
                typeDetail: 'KIEN_THUC_LINH_VUC',
                title: 'Kiến thức chung theo lĩnh vực',
                data: [],
                typeIndex: '1.3'
            },
            KIEN_THUC_NHOM_NGANH: {
                type: 'KIEN_THUC',
                typeDetail: 'KIEN_THUC_NHOM_NGANH',
                title: 'Kiến thức chung của nhóm ngành',
                data: [],
                typeIndex: '1.4'
            },
            KIEN_THUC_NGANH: {
                type: 'KIEN_THUC',
                typeDetail: 'KIEN_THUC_NGANH',
                title: 'Kiến thức của ngành',
                data: [],
                typeIndex: '1.5'
            }
        },
        KY_NANG: {
            KY_NANG_CHUYEN_MON: {
                type: 'KY_NANG',
                typeDetail: 'KY_NANG_CHUYEN_MON',
                title: 'Kỹ năng chuyên môn',
                data: [],
                typeIndex: '2.1'
            },
            KY_NANG_MEM: {
                type: 'KY_NANG',
                typeDetail: 'KY_NANG_CHUYEN_MEM',
                title: 'Kỹ năng mềm',
                data: [],
                typeIndex: '2.2'
            }
        },
        THAI_DO: {
            THAI_DO_CA_NHAN: {
                type: 'THAI_DO',
                typeDetail: 'THAI_DO_CA_NHAN',
                title: 'Phẩm chất, đạo đức và thái độ của cá nhân',
                data: [],
                typeIndex: '3.1'
            },
            THAI_DO_NGHE_NGHIEP: {
                type: 'THAI_DO',
                typeDetail: 'THAI_DO_NGHE_NGHIEP',
                title: 'Phẩm chất, đạo đức và thái độ đối với nghề nghiệp',
                data: [],
                typeIndex: '3.2'
            },
            THAI_DO_XA_HOI: {
                type: 'THAI_DO',
                typeDetail: 'THAI_DO_XA_HOI',
                title: 'Phẩm chất, đạo đức và thái độ đối với xã hội',
                data: [],
                typeIndex: '3.3'
            }
        }
    })

    const [ POSize, setPOSize ] = useState(0)

    useEffect(() => {
        const POList = [
            ...POValue.KIEN_THUC.data,
            ...POValue.KY_NANG.data,
            ...POValue.THAI_DO.data
        ]

        setPOSize(POList.length)
    }, [POValue, PLOValue])

    useEffect(() => {
        resetPage('E', id)
    }, [])

    useEffect(() => {
        sessionStorage.setItem(`sectionE-${id}`, JSON.stringify(sectionEValue))
    })

    const fecthAPI = (id) => {
        const sectionEValueApi = `${apiURL}/sectionE/${id}`
        const PLOValueApi = `${apiURL}/sectionD/${id}`
        const POValueApi = `${apiURL}/sectionC/${id}`

        return async () => {
            await axios.get(sectionEValueApi) 
                .then(response => {
                    const restData = response.data
                    setSectionEValue(convertValueE(restData.checkData))
                })
                .catch(error => {
                    console.log(error)
                    navigate('/error')
                })

            await axios.get(PLOValueApi) 
                .then(response => {
                    const restData = response.data
                    if(restData.data)
                        handleSplitSectionD({ 
                            data: restData.data,
                            setSectionDValue: setPLOValue,
                            idCTDT: id
                        })
                })
                .catch(error => {
                    console.log(error)
                    navigate('/error')
                })

            await axios.get(POValueApi) 
                .then(response => {
                    const restData = response.data
                    if(restData.data)
                        handleSplitSectionC({ 
                            data: restData.data,
                            setSectionCValue: setPOValue,
                            idctdt: id
                        })
                })
                .catch(error => {
                    console.log(error)
                    navigate('/error')
                })
        }
    }

    const { isLoading, isError} = useQuery(`sectionE-${id}`, fecthAPI(id),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    const splitItem = (data) => {
        return data.split('-')
    }

    return(
        <>
            <EditHeader
                currentSection={4}
                setData={{setSectionEValue}}
            />
            <div id="section-E" className="section">
                <div className="section-header wrapper">
                    <h1>E. MA TRẬN ĐẦU RA ĐỐI VỚI MỤC TIÊU</h1>
                </div>
                <div className="section-E wrapper">
                    <p className="section-E-details">
                        Hãy bấm vào ô tương ứng với Mục tiêu (PO) theo cột và Chuẩn đầu ra (PLO) theo dòng.<br/>
                        Chỉ tick <span style={{color: '#BE0000'}}><b>X</b></span> vào những ô được chọn.<br/>
                        <span style={{color: '#BE0000'}}>Lưu ý: Dữ liệu chỉ được lưu khi bấm lưu hoặc hoàn tất.</span>
                    </p>
                    <div className="section-E-main">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{minWidth: '100px'}} rowSpan={3}>Ký kiệu</th>
                                    <th style={{minWidth: '550px'}} className="title" rowSpan={3}>Chuẩn đầu ra</th>
                                    <th colSpan={POSize || 3}>Mục tiêu</th>
                                </tr>
                                <tr>
                                    <th colSpan={POValue.KIEN_THUC.data.length}>Kiến thức</th>
                                    <th colSpan={POValue.KY_NANG.data.length}>Kỹ năng</th>
                                    <th colSpan={POValue.THAI_DO.data.length}>Thái độ</th>
                                </tr>
                                <tr>
                                    {
                                        POValue.KIEN_THUC.data.map((item, index) => {
                                            return (
                                                <th style={{minWidth: '50px'}} key={index}>{
                                                    <>
                                                        {splitItem(item.kiHieu)[0]} 
                                                        <br/>
                                                        {splitItem(item.kiHieu)[1]} 
                                                    </>
                                                }</th>
                                            )
                                        })
                                    }
                                    {
                                        POValue.KY_NANG.data.map((item, index) => {
                                            return (
                                                <th style={{minWidth: '50px'}} key={index}>{
                                                    <>
                                                        {splitItem(item.kiHieu)[0]} 
                                                        <br/>
                                                        {splitItem(item.kiHieu)[1]} 
                                                    </>
                                                }</th>
                                            )
                                        })
                                    }
                                    {
                                        POValue.THAI_DO.data.map((item, index) => {
                                            return (
                                                <th style={{minWidth: '50px'}} key={index}>{
                                                    <>
                                                        {splitItem(item.kiHieu)[0]} 
                                                        <br/>
                                                        {splitItem(item.kiHieu)[1]} 
                                                    </>
                                                }</th>
                                            )
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                <RowBlock
                                    POList={POValue}
                                    POSize={POSize}
                                    PLOList={PLOValue.KIEN_THUC}
                                    title={'Kiến thức'}
                                    index={'1.'}
                                    value={sectionEValue}
                                    setState={setSectionEValue}
                                />
                                <RowBlock
                                    POList={POValue}
                                    POSize={POSize}
                                    PLOList={PLOValue.KY_NANG}
                                    title={'Kỹ năng'}
                                    index={'2.'}
                                    value={sectionEValue}
                                    setState={setSectionEValue}
                                />
                                <RowBlock
                                    POList={POValue}
                                    POSize={POSize}
                                    PLOList={PLOValue.THAI_DO}
                                    title={'Thái độ'}
                                    index={'3.'}
                                    value={sectionEValue}
                                    setState={setSectionEValue}
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <EditFooter
                currentSection={4}
                setData={{setSectionEValue}}
            />
        </>
    )
}

export default SectionE