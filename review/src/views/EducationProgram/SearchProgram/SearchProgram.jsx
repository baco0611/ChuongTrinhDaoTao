import "../EducationProgram.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeMerge } from '@fortawesome/free-solid-svg-icons'
import RequestBlock from "../RequestBlock/RequestBlock"
import { useState } from "react"

export default function SearchProgram() {

    const [ programListInformation, setProgramListInformation ] = useState({
        data: [],
        pageInformation: {
            numOfElement: 0,
            pageSize: 0,
            offset: 0,
            firstPage: true,
            lastPage: false,
            totalPages: 1,
            totalElements: 0
        },
    })

    console.log(programListInformation)


    return (
        <div className='wrapper body-container program-section' id="search-program"> 
            <div className="title">
                <h1>Tra cứu chương trình đào tạo</h1>
                {/* <button><FontAwesomeIcon icon={faCodeMerge} />Cập nhật dữ liệu</button> */}
            </div>
            <RequestBlock
                name="manage"
                setProgram={setProgramListInformation}
            />
            <div className="main">
                <table>
                    
                </table>
            </div>
        </div>
    )
}
