import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../../context/ContextProvider"
import './SectionH.scss'
import EditHeader from "../EditHeader/EditHeader"
import EditFooter from "../EditFooter/EditFooter"
import axios from "axios"
import { useQuery } from "react-query"
import Loader from "../../../components/Loader/Loader"
import { handleSplitSectionG } from "../Database/HandleActionSectionG"
import { handleSplitPLO } from "../Database/HandleActionSectionH"
import RowBlock from "./RowBlock"
import { resetPage } from "../Database/HandleUpdateDatabase"

function SectionH() {

    const { id } = useParams()
    const { apiURL, fakeApi } = useContext(UserContext)
    const navigate = useNavigate()

    const [ sectionGValue, setSectionGValue ] = useState({
        DAI_CUONG: {
            data: [],
            type: 'DAI_CUONG'
        },
        CHUYEN_NGHIEP: {
            type: 'CHUYEN_NGHIEP',
            CO_SO_NGANH: {
                data: [],
                type: 'CO_SO_NGANH',    
            },
            NGANH: {
                data: [],
                type: 'NGANH',    
            },
            BO_TRO: {
                data: [],
                type: 'BO_TRO',    
            },
            THUC_TAP: {
                data: [],
                type: 'THUC_TAP',    
            },
            DO_AN_KHOA_LUAN: {
                data: [],
                type: 'DO_AN_KHOA_LUAN',
            },
            THAY_THE_KHOA_LUAN: {
                data: [],
                type: 'THAY_THE_KHOA_LUAN'
            },
            CHUYEN_NGANH: {
                type: 'CHUYEN_NGANH'   
            }
        }
    })

    const [ PLOValue, setPLOValue ] = useState({
        KIEN_THUC: {
            type: 'KIEN_THUC',
            data: []
        },
        KY_NANG: {
            type: 'KY_NANG',
            data: []
        },
        THAI_DO: {
            type: 'THAI_DO',
            data: []
        }
    })

    const [ sectionHValue, setSectionHValue ] = useState([])

    useEffect(() => {
        resetPage('H', id)
    }, [])

    useEffect(() => {
        sessionStorage.setItem(`sectionH-${id}`, JSON.stringify(sectionHValue))
    })

    const fecthAPI = (id) => {
        
        const sectionGValueApi = `${apiURL}/sectionG/${id}`
        const PLOValueApi = `${apiURL}/sectionD/${id}`
        const sectionHValueApi = `${apiURL}/sectionH/${id}`
        
        return async () => {
            await axios.get(sectionGValueApi) 
                .then(response => {
                    const restData = response.data
                    if(restData.data)
                        handleSplitSectionG(restData.data, setSectionGValue, apiURL, id)
                })
                .catch(error => {
                    console.log(error)
                    navigate('/error')
                })

            await axios.get(PLOValueApi) 
                .then(response => {
                    const restData = response.data
                    if(restData.data)
                        handleSplitPLO({ 
                            data: restData.data,
                            setState: setPLOValue
                        })
                })
                .catch(error => {
                    console.log(error)
                    navigate('/error')
                })

            await axios.get(sectionHValueApi) 
                .then(response => {
                    const restData = response.data
                    if(restData.checkData)
                        setSectionHValue(restData.checkData)
                })
                .catch(error => {
                    console.log(error)
                    navigate('/error')
                })
        }
    }

    const { isLoading, isError} = useQuery(`sectionH-${id}`, fecthAPI(id),{
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
                currentSection={6}
                setData={{setSectionHValue}}
            />
            <div id="section-D" className="section">
                <div className="section-header wrapper">
                    <h1>H. MA TRẬN HỌC PHẦN ĐỐI VỚI CHUẨN ĐẦU RA</h1>
                </div>
                <div className="section-H wrapper">
                    <p className="section-H-details">
                        Hãy điền mức độ đáp ứng vào ô ứng với chuẩn đầu ra (PLO) mà học phầ đó đáp ứng.<br/>
                        <span style={{color: '#BE0000'}}><b>Lưu ý: Dữ liệu chỉ được lưu khi bấm lưu hoặc hoàn tất.</b></span>
                    </p>
                    <div className="section-H-main">
                        <table>
                            <thead>
                                <tr>
                                    <th rowSpan={3} style={{minWidth: '45px'}}>STT</th>
                                    <th rowSpan={3} style={{minWidth: '100px'}}>Mã HP</th>
                                    <th rowSpan={3} style={{minWidth: '350px'}}>Tên học phần</th>
                                    <th rowSpan={3} style={{minWidth: '45px'}}>STC</th>
                                    <th colSpan={PLOValue.KIEN_THUC.data.length || 1} style={{height: '40px'}}>Chuẩn về kiến thức</th>
                                    <th colSpan={PLOValue.KY_NANG.data.length || 1}>Chuẩn về kỹ năng</th>
                                    <th colSpan={PLOValue.THAI_DO.data.length || 1}>Chuẩn về thái độ</th>
                                </tr>
                                <tr>
                                    {
                                        PLOValue.KIEN_THUC.data.map((item, index) => {
                                            return <th key={index} style={{minWidth: '50px'}}>{
                                                <>
                                                    {splitItem(item.kiHieu)[0]} 
                                                    <br/>
                                                    {splitItem(item.kiHieu)[1]} 
                                                </>
                                            }</th>
                                        })
                                    }
                                    {
                                        PLOValue.KY_NANG.data.map((item, index) => {
                                            return <th key={index} style={{minWidth: '50px'}}>{
                                                <>
                                                    {splitItem(item.kiHieu)[0]} 
                                                    <br/>
                                                    {splitItem(item.kiHieu)[1]} 
                                                </>
                                            }</th>
                                        })
                                    }
                                    {
                                        PLOValue.THAI_DO.data.map((item, index) => {
                                            return <th key={index} style={{minWidth: '50px'}}>{
                                                <>
                                                    {splitItem(item.kiHieu)[0]} 
                                                    <br/>
                                                    {splitItem(item.kiHieu)[1]} 
                                                </>
                                            }</th>
                                        })
                                    }
                                </tr>
                                <tr>
                                    {
                                        PLOValue.KIEN_THUC.data.map((item, index) => {
                                            return <th key={index} style={{minWidth: '50px'}}>{item.trinhDoNangLuc}</th>
                                        })
                                    }
                                    {
                                        PLOValue.KY_NANG.data.map((item, index) => {
                                            return <th key={index} style={{minWidth: '50px'}}>{item.trinhDoNangLuc}</th>
                                        })
                                    }
                                    {
                                        PLOValue.THAI_DO.data.map((item, index) => {
                                            return <th key={index} style={{minWidth: '50px'}}>{item.trinhDoNangLuc}</th>
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                <RowBlock
                                    title={'KIẾN THỨC GIÁO DỤC ĐẠI CƯƠNG'}
                                    index={'I.'}
                                    size={PLOValue.KIEN_THUC.data.length + PLOValue.KY_NANG.data.length + PLOValue.THAI_DO.data.length}
                                    data={sectionGValue.DAI_CUONG}
                                    PLOList={PLOValue}
                                    value={sectionHValue}
                                    setState={setSectionHValue}
                                />
                                <RowBlock
                                    title={'KIẾN THỨC GIÁO DỤC CHUYÊN NGHIỆP'}
                                    index={'II.'}
                                    size={PLOValue.KIEN_THUC.data.length + PLOValue.KY_NANG.data.length + PLOValue.THAI_DO.data.length}
                                    data={sectionGValue.CHUYEN_NGHIEP}
                                    PLOList={PLOValue}
                                    value={sectionHValue}
                                    setState={setSectionHValue}
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <EditFooter
                currentSection={6}
                setData={{setSectionHValue}}
            />
        </>
    )
}

export default SectionH