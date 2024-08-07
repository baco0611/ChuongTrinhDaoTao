import { Link } from "react-router-dom"
import "./ListProgramBlock.scss"
import "../EducationProgram.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPenClip, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Pagination from '@mui/material/Pagination';
import { useContext, useEffect, useState } from "react"
import { searchProgram } from "../educationProgram_function"
import { UserContext } from "../../../context/ContextProvider"
import Cookies from 'js-cookie'


export default function ListProgramBlock({ name, data, request, setProgram }) {

    const { apiURL, fakeAPI, token, serverAPI, user } = useContext(UserContext); 

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
            const payload = { ...request, pageOrder: currentPage };

            if(name == "manage") {
                const information = JSON.parse(sessionStorage.getItem("USER"))
                payload.role = information.role
                payload.lecturerCode = information.lecturerCode

                console.log(payload)
                await searchProgram(serverAPI, "/manage-program", token, payload, setProgram)
            } else {
                await searchProgram(serverAPI, "/search-program", token, request, setProgram)
            }

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
                                            {
                                                user.lecturerCode == element.responsiblePersonCode 
                                                && element.status == "DANG_THUC_HIEN"
                                                &&
                                                <Link to={`/edit/program/sectionA/${element.programId}`} className="green">
                                                    <FontAwesomeIcon icon={faPenClip} />
                                                </Link>
                                            }
                                            {
                                                user.role.includes("delete_program") &&
                                                <Link to={`/view/program/${element.programId}`} className="red">
                                                    <FontAwesomeIcon icon={faTrashCan} />
                                                </Link>
                                            }
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
