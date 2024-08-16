import "../EducationProgram.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeMerge } from '@fortawesome/free-solid-svg-icons'
import RequestBlock from "../RequestBlock/RequestBlock"
import { useState } from "react"
import ListProgramBlock from "../ListProgramBlock/ListProgramBlock"
import { useLocation } from "react-router-dom"

export default function EducationMain() {

    const location = useLocation().pathname.split("/").pop()
    const [ programListInformation, setProgramListInformation ] = useState({
        data: [],
        pageInformation: {
            numOfElement: 0,
            pageSize: 0,
            offset: 1,
            firstPage: true,
            lastPage: false,
            totalPages: 1,
            totalElements: 0
        },
    })

    const [ request, setRequest ] = useState({
        department: "",
        departmentName: "",
        keyword: "",
        pageSize: 15,
        status: ""
    })

    console.log(programListInformation)


    return (
        <div className='wrapper body-container program-section' id="search-program"> 
            <div className="title">
            {
                location == "search"
                &&
                    <h1>Tra cứu chương trình đào tạo</h1>
                ||
                    <h1>Quản lý chương trình đào tạo</h1>
            }
                {/* <button><FontAwesomeIcon icon={faCodeMerge} />Cập nhật dữ liệu</button> */}
            </div>
            <RequestBlock
                name={location}
                setProgram={setProgramListInformation}
                request={request}
                setRequest={setRequest}
            />
            <ListProgramBlock
                name={location}
                data={programListInformation}
                request={request}
                setProgram={setProgramListInformation}
            />
        </div>
    )
}
