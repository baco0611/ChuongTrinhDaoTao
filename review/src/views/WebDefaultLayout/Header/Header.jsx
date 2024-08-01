import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import "./Header.scss"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../context/ContextProvider"
import { getParentElementByClass } from "../../../utils/function"
import swal from 'sweetalert'

export default function Header() {
    const { user, token, setToken, setUser } = useContext(UserContext)
    const [ menuOpen, setMenuOpen ] = useState(false)
    const navigate = useNavigate()

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

    const deleteUserInformation = () => {
        setUser()
        setToken()
        navigate("/")
    }

    const handleLogout = () => {
        swal({
            title: "ĐĂNG XUẤT",
            text: "Bạn có muốn đăng xuất?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willLogout) => {
            if (willLogout) {
                deleteUserInformation();
            }
        });
    };

    return (
        <>

            <header id='layout-header'>
                <div className="header wrapper">
                    <div className='header-navigate'>
                        {
                            token &&
                            <i 
                                className='ti-menu cursorPointer'
                                onClick={() => setMenuOpen(!menuOpen)}
                            ></i>
                        }
                        <Link to={'/'}>QUẢN LÝ CHƯƠNG TRÌNH ĐÀO TẠO - TRƯỜNG ĐẠI HỌC KHOA HỌC</Link>
                    </div>
                    {
                        token
                        &&
                        <div className='header-user'>
                            <div className='header-user-main'>
                                <div>
                                    <h3>{user.lastName} {user.firstName}</h3>
                                    <h4>{user.departmentName}</h4>
                                </div>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <FontAwesomeIcon 
                                icon={faArrowRightFromBracket} 
                                className='logout-icon cursorPointer'
                                onClick={handleLogout}
                            />
                        </div>
                    }
                </div>
            </header>
            {
                menuOpen 
                &&
                <div id="header-menu">
                    <div className="header-menu wrapper">
                        <ul className="header-component">
                            <li className="primary">Từ điển dữ liệu</li>
                            <li><Link to={"#"} onClick={() => setMenuOpen(!menuOpen)}>Điều kiện tốt nghiêp</Link></li>
                            <li><Link to={"#"} onClick={() => setMenuOpen(!menuOpen)}>Chứng chỉ điều kiện</Link></li>
                        </ul>
                        <ul className="header-component">
                            <li className="primary">Học phần</li>
                            <li><Link to={"#"} onClick={() => setMenuOpen(!menuOpen)}>Quản lý học phần</Link></li>
                            <li><Link to={"#"} onClick={() => setMenuOpen(!menuOpen)}>Tra cứu học phần</Link></li>
                        </ul>
                        <ul className="header-component">
                            <li className="primary">Chương trình đào tạo</li>
                            <li><Link to={"/program/manage"} onClick={() => setMenuOpen(!menuOpen)}>Quản lý chương trình đào tạo</Link></li>
                            <li><Link to={"/program/search"} onClick={() => setMenuOpen(!menuOpen)}>Tra cứu chương trình đào tạo</Link></li>
                        </ul>
                        <ul className="header-component">
                            <li className="primary">Quản trị</li>
                            <li><Link to={"#"} onClick={() => setMenuOpen(!menuOpen)}>Giảng viên phụ trách</Link></li>
                            <li><Link to={"#"} onClick={() => setMenuOpen(!menuOpen)}>Phân quyền</Link></li>
                        </ul>
                    </div> 
                </div>
            }
        </>
    )
}
