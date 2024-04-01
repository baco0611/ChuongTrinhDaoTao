import './Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Header () {
    return (
        <header id="header-section">
            <div className='header wrapper'>
                <div className='header-navigate'>
                    <i className='ti-menu cursorPointer'></i>
                    <Link to={'/'}>QUẢN LÝ CHƯƠNG TRÌNH ĐÀO TẠO - TRƯỜNG ĐẠI HỌC KHOA HỌC</Link>
                </div>
                <div className='header-user'>
                    <div className='header-user-main'>
                        <div>
                            <h3>Huỳnh Văn Nguyên Bảo</h3>
                            <h4>Sinh viên</h4>
                        </div>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className='logout-icon cursorPointer'/>
                </div>
            </div>
        </header>
    )
}

export default Header