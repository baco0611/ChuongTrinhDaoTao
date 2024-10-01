import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import "./Header.scss"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../context/ContextProvider"
import { getParentElementByClass } from "../../../utils/function"
import Swal from 'sweetalert2'

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
        Swal.fire({
            title: "ĐĂNG XUẤT",
            text: "Bạn có muốn đăng xuất?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Có",
            cancelButtonText: "Không",
            confirmButtonColor: '#BE0000', // Màu đỏ cho nút "Có"
            reverseButtons: true, // Đổi vị trí các nút
        }).then((result) => {
            if (result.isConfirmed) {
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
                                <Link to={"/user"}>
                                    <FontAwesomeIcon icon={faUser} />
                                </Link>
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
                            <li><Link to={"/dictionary/graduation"} onClick={() => setMenuOpen(!menuOpen)}>Điều kiện tốt nghiệp</Link></li>
                            <li><Link to={"/dictionary/certification"} onClick={() => setMenuOpen(!menuOpen)}>Chứng chỉ điều kiện</Link></li>
                        </ul>
                        <ul className="header-component">
                            <li className="primary">Học phần</li>
                            <li><Link to={"#"} onClick={() => setMenuOpen(!menuOpen)}>Quản lý đề cương</Link></li>
                            <li><Link to={"#"} onClick={() => setMenuOpen(!menuOpen)}>Tra cứu đề cương</Link></li>
                            <li><Link to={"#"} onClick={() => setMenuOpen(!menuOpen)}>Quản lý học phần</Link></li>
                        </ul>
                        <ul className="header-component">
                            <li className="primary">Chương trình đào tạo</li>
                            <li><Link to={"/program/manage"} onClick={() => setMenuOpen(!menuOpen)}>Quản lý chương trình đào tạo</Link></li>
                            <li><Link to={"/program/search"} onClick={() => setMenuOpen(!menuOpen)}>Tra cứu chương trình đào tạo</Link></li>
                            <li><Link to={"#"} onClick={() => setMenuOpen(!menuOpen)}>Quản lý ngành đào tạo</Link></li>
                        </ul>
                        <ul className="header-component">
                            <li className="primary">Quản trị</li>
                            <li><Link to={"/user/responsibility"} onClick={() => setMenuOpen(!menuOpen)}>Phân công phụ trách</Link></li>
                            <li><Link to={"/user/authorization"} onClick={() => setMenuOpen(!menuOpen)}>Phân quyền</Link></li>
                            <li><Link to={"/user/manage"} onClick={() => setMenuOpen(!menuOpen)}>Quản lý người dùng</Link></li>
                        </ul>
                    </div> 
                </div>
            }
        </>
    )
}
