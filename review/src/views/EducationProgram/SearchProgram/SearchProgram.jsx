import "../EducationProgram.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeMerge } from '@fortawesome/free-solid-svg-icons'
import RequestBlock from "../RequestBlock/RequestBlock"
import { useState } from "react"
import ListProgramBlock from "../ListProgramBlock/ListProgramBlock"

export default function SearchProgram() {

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
        keyWord: "",
        pageSize: 15,
        status: ""
    })

    console.log(programListInformation)


    return (
        <div className='wrapper body-container program-section' id="search-program"> 
            <div className="title">
                <h1>Tra cứu chương trình đào tạo</h1>
                {/* <button><FontAwesomeIcon icon={faCodeMerge} />Cập nhật dữ liệu</button> */}
            </div>
            <RequestBlock
                name="search"
                setProgram={setProgramListInformation}
                request={request}
                setRequest={setRequest}
            />
            <ListProgramBlock
                name="search"
                data={programListInformation}
                request={request}
                setProgram={setProgramListInformation}
            />
        </div>
    )
}
