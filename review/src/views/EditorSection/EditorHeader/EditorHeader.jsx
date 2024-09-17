import { Link, useNavigate, useParams } from "react-router-dom"
import "./EditorHeader.scss"
import { memo, useContext, useEffect } from "react"
import { UserContext } from "../../../context/ContextProvider"
import clsx from "clsx"
import { useQuery } from "react-query"
import axios from "axios"
import Loader from "../../../components/Loader/Loader"
import { getData } from "../../../utils/function"
import { basic_decode, basic_encode } from "../../../utils/function"

function EditorHeader({ currentSection }) {
    const { id } = useParams()
    const { sectionList, apiURL, fakeAPI, serverAPI, isDataSaved, token, user } = useContext(UserContext)
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(window.location.search)
    const responsiveTeacher = basic_decode(queryParams.get("t"))
    const programStatus = queryParams.get("s")

    // Check user có quyền để truy cập chỉnh sửa không
    // Nhưng đang không ổn lắm do lỡ nhiều người ko biết query ==> check bằng api
    // useEffect(() => {
    //     console.log(user.lecturersCode, responsiveTeacher)
    //     if(!responsiveTeacher || !programStatus) {
    //         alert("KHÔNG THỂ XÁC MINH QUYỀN TRUY CẬP")
    //         navigate("/program/manage")
    //     } else
    //     if(programStatus != "true") {
    //         alert("CHƯƠNG TRÌNH KHÔNG THỂ CHỈNH SỬA")
    //         navigate("/program/manage")
    //     } else
    //     if(!responsiveTeacher) {
    //         alert("KHÔNG THỂ XÁC MINH QUYỀN TRUY CẬP")
    //         navigate("/program/manage")
    //     } else
    //     if(user.lecturersCode != responsiveTeacher) {
    //         alert("NGƯỜI DÙNG KHÔNG ĐƯỢC CẤP QUYỀN TRUY CẬP")
    //         navigate("/program/manage")
    //     }
    // }, [])

    const fetchAPI = (id) => {
        return async () => {
            return (await getData(apiURL, `/api/education-programs/sectionHeader/${id}`, token)).data.data
        }
    }

    const { data , isLoading, isError} = useQuery(`editorHeader-${id}`, fetchAPI(id),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    return (
        <>
            <nav id="editor-navigation">
                <div className="nav-element wrapper">
                {
                    sectionList.map((element, index) => {
                        return <div 
                            key={index} 
                            className={clsx("element", {active: index == currentSection})}
                        >
                            <Link to={`/edit/program/section${element}/${id}?t=${basic_encode(responsiveTeacher)}&s=${programStatus}`}>{element}</Link>
                        </div>
                    })
                }
                    <div className="line"></div>
                </div>
            </nav>
            <header id='editor-header'>
                <div className="wrapper content">
                    <h2>Chương trình đào tạo đại học ngành <span>{data.fieldName}</span></h2>
                    <h2>Mã chương trình đào tạo: <span>{data.programCode}</span></h2>
                    <h2>Phiên bản: <span>{data.version}</span></h2>
                </div>
            </header>
        </>
    )
}

export default memo(EditorHeader)