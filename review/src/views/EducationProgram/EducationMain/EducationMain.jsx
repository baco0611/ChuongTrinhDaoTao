import "../EducationProgram.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeMerge } from '@fortawesome/free-solid-svg-icons'
import RequestBlock from "../RequestBlock/RequestBlock"
import { useEffect, useState } from "react"
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
        status: "",
        pageOrder: 1
    })

    console.log(programListInformation)

    // Scroll lên đầu trang mỗi khi mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // Init trang hiện tại, default là 1, không thì theo API.
    const [currentPage, setCurrentPage] = useState(programListInformation.pageInformation.pageOrder || 1);


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
                setCurrentPage={setCurrentPage}
            />
            <ListProgramBlock
                name={location}
                data={programListInformation}
                request={request}
                setProgram={setProgramListInformation}
                setRequest={setRequest}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}
