import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import "./Header.scss"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../context/ContextProvider"
import { getParentElementByClass } from "../../../utils/function"

export default function Header() {
    const { user, token } = useContext(UserContext)
    const [ menuOpen, setMenuOpen ] = useState(false)
    console.log(menuOpen)

    const handleDocumentClick = e => {
        const element = e.target
        const fatherElement = getParentElementByClass(element, "header-menu")
        const navigateElement = getParentElementByClass(element, "ti-menu")

        if(!fatherElement && !navigateElement)
            setMenuOpen(false)
    }

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick)
        return () => {
            document.removeEventListener('click', handleDocumentClick)
        }
    })

    return (
        <header id='layout-header'>
            <div className="header wrapper">
                <div className='header-navigate'>
                    <i 
                        className='ti-menu cursorPointer'
                        onClick={() => setMenuOpen(!menuOpen)}
                    ></i>
                    <Link to={'/'}>QUẢN LÝ CHƯƠNG TRÌNH ĐÀO TẠO - TRƯỜNG ĐẠI HỌC KHOA HỌC</Link>
                </div>
                {
                    token
                    &&
                    <div className='header-user'>
                        <div className='header-user-main'>
                            <div>
                                <h3>{user.lastName} {user.firstName}</h3>
                                <h4>{user.workUnit}</h4>
                            </div>
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className='logout-icon cursorPointer'/>
                    </div>
                }
                {
                    menuOpen 
                    &&
                    <div className="header-menu">
                        <ul className="header-component">
                            <li className="primary">Từ điển dữ liệu</li>
                            <li><a href="#">Điều kiện tốt nghiêp</a></li>
                            <li><a href="#">Chứng chỉ điều kiện</a></li>
                        </ul>
                        <ul className="header-component">
                            <li className="primary">Học phần</li>
                            <li><a href="#">Quản lý học phần</a></li>
                            <li><a href="#">Tra cứu học phần</a></li>
                        </ul>
                        <ul className="header-component">
                            <li className="primary">Chương trình đào tạo</li>
                            <li><a href="#">Quản lý chương trình đào tạo</a></li>
                            <li><a href="#">Tra cứu chương trình đào tạo</a></li>
                        </ul>
                        <ul className="header-component">
                            <li className="primary">Quản trị</li>
                            <li><a href="#">Giảng viên phụ trách</a></li>
                            <li><a href="#">Phân quyền</a></li>
                        </ul>
                    </div> 
                }
            </div>
        </header>
    )
}
