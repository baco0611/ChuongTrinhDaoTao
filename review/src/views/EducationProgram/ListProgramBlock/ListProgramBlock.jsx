import { Link } from "react-router-dom"
import "./ListProgramBlock.scss"
import "../EducationProgram.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPenClip, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Pagination from '@mui/material/Pagination';
import { useContext, useEffect, useState } from "react"
import { searchProgram } from "../educationProgram_function"
import { UserContext } from "../../../context/ContextProvider"
import { basic_encode } from "../../../utils/function"

export default function ListProgramBlock({ name, data, request, setProgram, setRequest, currentPage, setCurrentPage, statusList }) {

    const { apiURL, fakeAPI, token, serverAPI, user } = useContext(UserContext); 
    console.log(data)
    
    const handlePageChange = (e, value) => {
        setCurrentPage(value);
        setRequest(prev => {
            return {
                ...prev,
                pageOrder: value
            }
        })
    };

    /* 
        Tìm kiếm khi số trang thay đổi
        - Nếu name = manage tức đây là trang quản lý 
            ==> chỉ tìm kiếm các học phần được phụ trách ==> cần trả lại mã giảng viên và role
        - Nếu name = search thì trả hết bình thường thôi
        * Phải tìm ở component này vì cần biết name (tức là quản lý hay tìm kiếm) để có thể điều hướng dữ liệu
    */
    useEffect(() => {
        console.log(currentPage)
        async function fetchData() {
            let token = document.cookie.split("; ")
            token = token.filter(element => element.includes("ACCESS_TOKEN"))[0]
            token = token.split("=")[1]

            if(name == "manage") {
                await searchProgram(apiURL, "/api/education-programs/manage", token, request, setProgram)
            } else {
                await searchProgram(apiURL, "/api/education-programs/search", token, request, setProgram)
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
                            <th style={{ width: "6%" }}>Mã CTĐT</th>  
                            <th style={{ width: "16%" }}>Tên chương trình</th>  
                            <th style={{ width: "13%" }}>Tên ngành</th>  
                            <th className="center" style={{ width: "7%" }}>Phiên bản</th>
                            <th style={{ width: "11.5%" }}>Người biên soạn</th>  
                            <th style={{ width: "16.5%" }}>Khoa phụ trách</th>  
                            <th style={{ width: "9%" }}>Trạng thái</th>
                            <th className="center" style={{ width: "9%" }}>Thời gian cập nhật</th>  
                            <th style={{ width: "7%" }}></th>  
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data.data.map((element, index) => {
                            return <tr key={index}>
                                <td className="center">
                                    <Link target="_blank" to={`/view/program/${element.programId}}`}>
                                        {data.pageInformation.offset + index + 1}    
                                    </Link>
                                </td>
                                <td>
                                    <Link target="_blank" to={`/view/program/${element.programId}`}>
                                        {element.programCode}
                                    </Link>
                                </td>
                                <td>
                                    <Link target="_blank" to={`/view/program/${element.programId}`}>
                                        {element.programName}
                                    </Link>
                                </td>
                                <td>
                                    <Link target="_blank" to={`/view/program/${element.programId}`}>
                                        {element.fieldName}
                                    </Link>
                                </td>
                                <td className="center">
                                    <Link target="_blank" to={`/view/program/${element.programId}`}>
                                        {element.version}
                                    </Link>
                                </td>
                                <td>
                                    <Link target="_blank" to={`/view/program/${element.programId}`}>
                                        {element.responsiblePerson}
                                    </Link>
                                </td>
                                <td>
                                    <Link target="_blank" to={`/view/program/${element.programId}`}>
                                        {element.department}
                                    </Link>
                                </td>
                                <td>
                                    <Link target="_blank" to={`/view/program/${element.programId}`}>
                                        {statusList[element.status]}
                                    </Link> 
                                </td>
                                <td className="center">
                                    <Link target="_blank" to={`/view/program/${element.programId}`}>
                                        {element.updatedAt}
                                    </Link>
                                </td>
                                <td className="action">
                                    <Link target="_blank" to={`/view/program/${element.programId}`} className="blue">
                                        <FontAwesomeIcon icon={faEye} />
                                    </Link>
                                    {
                                        name == "manage" 
                                        && 
                                        <>
                                            {
                                                user.lecturersCode == element.responsiblePersonCode
                                                && element.status == 2
                                                &&
                                                <Link target="_blank" to={`/edit/program/sectionA/${element.programId}?t=${basic_encode(element.responsiblePersonCode)}&s=${element.status == "2"}`} className="green">
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
                        count={data.pageInformation.totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </div>
            </div>
        </div>
    )
}
