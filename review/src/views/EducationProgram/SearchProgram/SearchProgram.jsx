import "../EducationProgram.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeMerge } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useContext, useEffect } from 'react'
import { UserContext } from "../../../../../frontend/src/context/ContextProvider"
import Loader from "../../../../../frontend/src/components/Loader/Loader"

export default function SearchProgram() {


    return (
        <div className='wrapper body-container program-section' id="search-program"> 
            <div className="title">
                <h1>Tra cứu chương trình đào tạo</h1>
                {/* <button><FontAwesomeIcon icon={faCodeMerge} />Cập nhật dữ liệu</button> */}
            </div>
            <div className="search-request">
                <div className="department">
                    <span>Đơn vị</span>
                </div>
            </div>
            <div className="main">
                <table>
                    
                </table>
            </div>
        </div>
    )
}
