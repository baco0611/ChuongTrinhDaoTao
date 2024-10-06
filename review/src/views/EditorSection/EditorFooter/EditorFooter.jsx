import { Link, useNavigate, useParams } from "react-router-dom"
import "./EditorFooter.scss"
import { useContext } from "react"
import { UserContext } from "../../../context/ContextProvider"
import { basic_decode, basic_encode } from "../../../utils/function"

export default function EditorFooter({ currentSection }) {
    const { id } = useParams()
    const { sectionList, apiURL, fakeAPI, serverAPI, isDataSaved, token } = useContext(UserContext)
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(window.location.search)
    const responsiveTeacher = basic_decode(queryParams.get("t"))
    const programStatus = queryParams.get("s")
    
    return (
        <div id="editor-footer">
            <div className="wrapper editor-footer">
                <div>
                    <Link to={"/program/manage"}>
                        <button>
                            <i className="ti-back-left"></i>
                            Trang quản lý
                        </button>
                    </Link>
                </div>
                <div>
                {
                    currentSection != 0 &&
                    <Link to={`/edit/program/section${sectionList[currentSection - 1]}/${id}?t=${basic_encode(responsiveTeacher)}&s=${programStatus}`}>
                        <button>
                            <i className="ti-arrow-circle-left"></i>
                            Lùi lại
                        </button>
                    </Link>
                }
                {
                    currentSection != 6 &&
                    <Link to={`/edit/program/section${sectionList[currentSection + 1]}/${id}?t=${basic_encode(responsiveTeacher)}&s=${programStatus}`}>
                        <button>
                            Tiếp theo
                            <i className="ti-arrow-circle-right"></i>
                        </button>
                    </Link>
                }
                    <Link to={`/view/program/${id}`}>
                        <button>
                            <i className="ti-eye"></i>
                            Xem lại
                        </button>
                    </Link>
                    <Link to={"/program/manage"}>
                        <button>
                            <i className="ti-check"></i>
                            Hoàn tất
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
