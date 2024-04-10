import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../../context/ContextProvider"
import './SectionB.scss'
import EditHeader from "../EditHeader/EditHeader"
import EditFooter from "../EditFooter/EditFooter"
import { useQuery } from "react-query"
import axios from "axios"
import Loader from "../../../components/Loader/Loader"
import { handleUpdateDatabase, resetPage } from "../Database/HandleUpdateDatabase"
import { handleUpdateSectionB } from "../Database/HandleActionSectionB"

function SectionB() {

    const { id } = useParams()
    const { apiURL, fakeApi, isDataSaved, setIsDataSaved, handleBeforeUnload } = useContext(UserContext)
    const navigate = useNavigate()
    const currentSection = "B"
    const currentId = id

    //Use effec6t này để thêm phần remind thông tin chưa đc lưu
    useEffect(() => {
        // Thêm event listener khi component được mount
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Dọn dẹp event listener khi component bị unmount
        return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDataSaved]); // Phụ thuộc vào trạng thái của isDataSaved và isApiDone

    // Use effect này để chuyển session ở trên edit header
    useEffect(() => {
        resetPage('B', id)
      }, [])

    const [ sectionBValue, setSectionBValue ] = useState({
        id,
        mucTieuTongQuat: ''
    }) 

    useEffect(() => {
        sessionStorage.setItem(`sectionB-${id}`, JSON.stringify(sectionBValue))
    })


    const fecthAPI = (id) => {
        const sectionBValueApi = `${apiURL}/sectionB/${id}`
        // const sectionBValueApi = `${fakeApi}/sectionB/${id}`
        return async () => {
            await axios.get(sectionBValueApi) 
                .then(response => {
                    const restData = response.data
                    if(restData.data[0]) 
                        setSectionBValue(restData.data[0])
                    setIsDataSaved(true)
                })
                .catch(error => {
                    console.log(error)
                    navigate('/error')
                    setIsDataSaved(true)
                })
        }
    }

    const { isLoading, isError} = useQuery(`sectionB-${id}`, fecthAPI(id),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    const handleChangeTextArea = e => {
        const value = e.target.value

        if(value.length > 1500)
            setSectionBValue({
                ...sectionBValue,
                [e.target.name]: value.slice(0, 1500)
            })
        else
            setSectionBValue({
                ...sectionBValue,
                [e.target.name]: value
            })
        
        setIsDataSaved(false)
    }

    const setData = {
        setSectionBValue,
        setIsDataSaved
    }

    return(
        <>
            <EditHeader
                currentSection={1}
                setData
            />
            <div id="section-B" className="section">
                <div className="section-header wrapper">
                    <h1>B. MỤC TIÊU TỔNG QUÁT</h1>
                </div>
                <div className="section-B-main wrapper">
                    <p>
                        Viết tối đa 1500 kí tự: trình bày tổng quát về chương trình đào tạo, trong đó xác định mục tiêu tổng quát của chương trình đào tạo: 
                        năng lực về kiến thức, năng lực thực hành nghề nghiệp của sinh viên sau khi tốt nghiệp… <br/>
                        <span style={{ fontWeight: 600, fontSize: '14px', color: '#BE0000' }}>
                            Lưu ý: Dữ liệu sẽ được lưu tự động khi click chuột ra khỏi ô nhập dữ liệu hoặc chuyển đổi giữa các phần. Vui lòng không reload hay thoát khỏi trang khi dữ liệu chưa được lưu.
                        </span>
                    </p>
                    <textarea
                        type="text"
                        name="mucTieuTongQuat"
                        value={sectionBValue.mucTieuTongQuat || ''}
                        onChange={handleChangeTextArea}
                        onBlur={() => handleUpdateSectionB( currentId, apiURL, setData )}
                        rows={20}
                        autoComplete="off"
                    />
                </div>
            </div>
            <EditFooter
                currentSection={1}
                setData={{setSectionBValue}}
            />
        </>
    )
}

export default SectionB