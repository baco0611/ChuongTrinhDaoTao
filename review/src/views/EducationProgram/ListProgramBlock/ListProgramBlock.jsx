import { Link } from "react-router-dom"
import "./ListProgramBlock.scss"
import "../EducationProgram.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPenClip, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Pagination from '@mui/material/Pagination';
import { useContext, useEffect, useState } from "react"
import { searchProgram } from "../RequestBlock/requestBlock-function"
import { UserContext } from "../../../context/ContextProvider"

// "searchProgram": {
//         "data": [
//             {
//                 "programCode": "KH23671",
//                 "programName": "Công nghệ thông tin",
//                 "fieldName": "Công nghệ thông tin",
//                 "status": "DANG_THUC_HIEN",
//                 "programId": "10005",
//                 "responsiblePerson": "Trần Thanh Lương",
//                 "responsiblePersonCode": "GVDHKH1",
//                 "department":"Khoa công nghệ và kĩ thuật",
//                 "createdAt": "23/06/2023",
//                 "updatedAt": "23/06/2023"
//             },
//             {
//                 "programCode": "KH23671",
//                 "programName": "Công nghệ thông tin",
//                 "fieldName": "Công nghệ thông tin",
//                 "status": "DANG_THUC_HIEN",
//                 "programId": "10005",
//                 "responsiblePerson": "Trần Thanh Lương",
//                 "responsiblePersonCode": "GVDHKH1",
//                 "department":"Khoa công nghệ và kĩ thuật",
//                 "createdAt": "23/06/2023",
//                 "updatedAt": "23/06/2023"
//             },
//             {
//                 "programCode": "KH23671",
//                 "programName": "Công nghệ thông tin",
//                 "fieldName": "Công nghệ thông tin",
//                 "status": "DANG_THUC_HIEN",
//                 "programId": "10005",
//                 "responsiblePerson": "Trần Thanh Lương",
//                 "responsiblePersonCode": "GVDHKH1",
//                 "department":"Khoa công nghệ và kĩ thuật",
//                 "createdAt": "23/06/2023",
//                 "updatedAt": "23/06/2023"
//             }
//         ],
//         "pageInformation": {
//             "numOfElement": 3,
//             "pageSize": 10,
//             "offset": 0,
//             "firstPage": true,
//             "lastPage": false,
//             "pageOrder": 1,
//             "totalPages": 3,
//             "totalElements": 25
//         },
//         "status": 200
//     },

export default function ListProgramBlock({ name, data, request, setProgram }) {

    const { apiURL, fakeAPI, token, serverAPI } = useContext(UserContext); 

    const statusList = {
        DA_PHAN_CONG: "Đã phân công",
        DANG_THUC_HIEN: "Đang thực hiện",
        DA_NOP: "Đã nộp",
        DA_DUYET_CAP_KHOA: "Đã duyệt cấp khoa",
        DA_DUYET: "Đã duyệt",
        DA_HUY: "Đã hủy"
    }

    const [currentPage, setCurrentPage] = useState(data.pageInformation.pageOrder || 1);
    
    const handlePageChange = (e, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        async function fetchData() {
            const payload = request
            payload.pageOrder = currentPage

            await searchProgram(serverAPI, "/search-program", token, request, setProgram)
        }
        fetchData();
    }, [currentPage])

    return (
        <div className="list-block mt-4">
            <div className="notification">
                <p>Trang {data.pageInformation.pageOrder} / {data.pageInformation.totalPages}</p>
            </div>
            <div className="main">
                <table>
                    <thead>
                        <tr>
                            <th className="center" style={{ width: "3%" }}>STT</th>
                            <th style={{ width: "7%" }}>Mã CTĐT</th>  
                            <th style={{ width: "14%" }}>Tên chương trình</th>  
                            <th style={{ width: "14%" }}>Tên ngành</th>  
                            <th className="center" style={{ width: "7%" }}>Phiên bản</th>
                            <th style={{ width: "11.5%" }}>Người biên soạn</th>  
                            <th style={{ width: "16.5%" }}>Khoa phụ trách</th>  
                            <th style={{ width: "9%" }}>Trạng thái</th>
                            <th className="center" style={{ width: "9%" }}>Thời gian xử lý</th>  
                            <th style={{ width: "7%" }}></th>  
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data.data.map((element, index) => {
                            return <tr key={index}>
                                <td className="center">
                                    <Link to={`/view/program/${element.programId}`}>
                                        {data.pageInformation.offset + index}    
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/view/program/${element.programId}`}>
                                        {element.programCode}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/view/program/${element.programId}`}>
                                        {element.programName}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/view/program/${element.programId}`}>
                                        {element.fieldName}
                                    </Link>
                                </td>
                                <td className="center">
                                    <Link to={`/view/program/${element.programId}`}>
                                        {element.version}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/view/program/${element.programId}`}>
                                        {element.responsiblePerson}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/view/program/${element.programId}`}>
                                        {element.department}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/view/program/${element.programId}`}>
                                        {statusList[element.status]}
                                    </Link> 
                                </td>
                                <td className="center">
                                    <Link to={`/view/program/${element.programId}`}>
                                        {element.processAt}
                                    </Link>
                                </td>
                                <td className="action">
                                    <Link to={`/view/program/${element.programId}`} className="blue">
                                        <FontAwesomeIcon icon={faEye} />
                                    </Link>
                                    {
                                        name == "manage" 
                                        && 
                                        <>
                                            <Link to={`/view/program/${element.programId}`} className="green">
                                                <FontAwesomeIcon icon={faPenClip} />
                                            </Link>
                                            <Link to={`/view/program/${element.programId}`} className="red">
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </Link>
                                        </>
                                    }
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
                <div className="pagination mt-4">
                    <Pagination
                        count={data.pageInformation.totalPages * 10}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </div>
            </div>
        </div>
    )
}
