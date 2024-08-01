import { Link, useNavigate, useParams } from "react-router-dom"
import "./EditorHeader.scss"
import { memo, useContext } from "react"
import { UserContext } from "../../../context/ContextProvider"
import clsx from "clsx"
import { useQuery } from "react-query"
import axios from "axios"
import Loader from "../../../components/Loader/Loader"
import { getData } from "../../../utils/function"

function EditorHeader({ currentSection }) {
    const { id } = useParams()
    const { sectionList, apiURL, fakeAPI, serverAPI, isDataSaved, token } = useContext(UserContext)
    const navigate = useNavigate()

    const fecthAPI = (id) => {
        return async () => {
            return (await getData(fakeAPI, `/editorHeader/${id}`, token)).data.data
        }
    }

    const { data , isLoading, isError} = useQuery(`editorHeader-${id}`, fecthAPI(id),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    console.log(data)

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
                            <Link to={`/edit/program/section${element}/${id}`}>{element}</Link>
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