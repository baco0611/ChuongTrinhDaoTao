import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../../context/ContextProvider"
import './SectionG.scss'
import EditHeader from "../EditHeader/EditHeader"
import EditFooter from "../EditFooter/EditFooter"
import { useQuery } from "react-query"
import Loader from "../../../components/Loader/Loader"
import axios from "axios"
import SectionGBlock from "./SectionGBlock"
import { handleSplitSectionG } from "../Database/HandleActionSectionG"
import NavIcon from "./NavIcon"
import { resetPage } from "../Database/HandleUpdateDatabase"

function SectionG() {

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

    useEffect(() => {
        resetPage('G', id)
    }, [])

    const fecthAPI = (id) => {
        const sectionGValueApi = `${apiURL}/sectionG/${id}`
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
        }
    }

    useEffect(() => {
        sessionStorage.setItem(`sectionG-${id}`, JSON.stringify(sectionGValue))
    })

    const { isLoading, isError} = useQuery(`sectionC-${id}`, fecthAPI(id),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    return(
        <>
            <EditHeader
                currentSection={5}
            />
            <div id="section-D" className="section">
                <div className="section-header wrapper">
                    <h1>G. KHUNG CHƯƠNG TRÌNH ĐÀO TẠO</h1>
                </div>
                <div className="section-G wrapper">
                    <p className="section-G-details">
                        <b>Hãy bấm vào từng tiêu đề để thao tác</b><br/>
                        <span style={{color: '#BE0000'}}>Lưu ý: Dữ liệu sẽ được cập nhật sau mỗi bước thực hiện.</span>
                    </p>
                </div>
                <div className="section-G-main wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th style={{minWidth: '50px'}} rowSpan={2}>STT</th>
                                <th style={{minWidth: '120px'}} rowSpan={2}>Mã học phần</th>
                                <th style={{minWidth: '250px'}} rowSpan={2}>Tên học phần</th>
                                <th style={{minWidth: '50px' }} rowSpan={2}>Bắt<br/>buộc</th>
                                <th style={{minWidth: '50px'}} rowSpan={2}>STC</th>
                                <th colSpan={6}>Phân bố giờ</th>
                                <th colSpan={3}>Quan hệ với các học phần</th>
                                <th style={{minWidth: '50px'}} rowSpan={2}>Học<br/>kỳ</th>
                            </tr>
                            <tr>
                                <th style={{minWidth: '50px'}}>LT</th>
                                <th style={{minWidth: '50px'}}>BT</th>
                                <th style={{minWidth: '50px'}}>TL</th>
                                <th style={{minWidth: '50px'}}>TH</th>
                                <th style={{minWidth: '50px'}}>TT</th>
                                <th style={{minWidth: '50px'}}>KT</th>
                                <th style={{minWidth: '120px'}}>Tiên quyết</th>
                                <th style={{minWidth: '120px'}}>Học trước</th>
                                <th style={{minWidth: '120px'}}>Song hành</th>
                            </tr>
                        </thead>
                        <tbody>
                            <SectionGBlock
                                title={'KIẾN THỨC GIÁO DỤC ĐẠI CƯƠNG'}
                                index={'I.'}
                                data={sectionGValue.DAI_CUONG}
                                setState={setSectionGValue}
                            />  
                            <SectionGBlock
                                title={'KIẾN THỨC GIÁO DỤC CHUYÊN NGHIỆP'}
                                index={"II."}
                                data={sectionGValue.CHUYEN_NGHIEP}
                                setState={setSectionGValue}
                            />   
                        </tbody>
                    </table>
                </div>
            </div>
            <EditFooter
                currentSection={5}
            />
            <NavIcon
                sectionGValue={sectionGValue}
            />
        </>
    )
}

export default SectionG