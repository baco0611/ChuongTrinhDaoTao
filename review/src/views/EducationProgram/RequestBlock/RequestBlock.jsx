import { memo, useContext, useEffect, useState } from "react";
import "./RequestBlock.scss"
import { useLocation, useNavigate } from "react-router-dom";
import { getData } from "../../../utils/function.js";
import { useQuery } from "react-query";
import { UserContext } from "../../../context/ContextProvider.jsx";
import Loader from "../../../components/Loader/Loader.jsx";
import { handleChangeRequest, searchProgram } from "../educationProgram_function.js";

function RequestBlock({ name, setProgram, request, setRequest, setCurrentPage }) {
    const { apiURL, fakeAPI, token, serverAPI } = useContext(UserContext); 
    const navigate = useNavigate()
    const [ department, setDepartment ] = useState([])
    const pageSizeList = [ 15, 30, 50, 100 ]
    const statusList = {
        DA_PHAN_CONG: "Đã phân công",
        DANG_THUC_HIEN: "Đang thực hiện",
        DA_NOP: "Đã nộp",
        DA_DUYET_CAP_KHOA: "Đã duyệt cấp khoa",
        DA_DUYET: "Đã duyệt",
        DA_HUY: "Đã hủy"
    }

    const fetchDepartmentAPI = (api) => {
        let token = document.cookie.split("; ")
        token = token.filter(element => element.includes("ACCESS_TOKEN"))[0]
        token = token.split("=")[1]

        return async () => {
            const departmentResult = await getData(api, "/api/department/getAll", token)
            setDepartment(departmentResult.data.data)   
        }
    }

    const { data , isLoading, isError} = useQuery(`department-program`, fetchDepartmentAPI(apiURL, token),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    return (
        <div className="search-request mt-2">
            <div className="conditional">
                <div className="block" style={{width: "20%"}}>
                    <p>Đơn vị</p>
                    <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {request.departmentName || "-----"}
                        </button>
                        <ul className="dropdown-menu">
                            <li 
                                className="dropdown-item cursorPointer"
                                onClick={() => (handleChangeRequest("department", setRequest))}    
                            >-----</li>
                            {
                                department.map((element, index) => {
                                    return <li 
                                        className="dropdown-item cursorPointer" 
                                        key={index}
                                        onClick={() => handleChangeRequest("department", setRequest, element)}
                                    >{element.departmentName}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>

                <div className="block" style={{width: "30%"}}>
                    <p>Từ khóa</p>
                    <input
                        type="text"
                        placeholder="Nhập từ khóa"
                        onChange={(e) => handleChangeRequest("keyword", setRequest, e.target.value)}
                    />
                </div>
                <div className="block" style={{width: "20%"}}>
                    <p>Trạng thái</p>
                    <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {request.status && statusList[request.status] || "-----"}
                        </button>
                        <ul className="dropdown-menu">
                            <li 
                                className="dropdown-item cursorPointer"
                                onClick={() => (handleChangeRequest("status", setRequest, ""))}    
                            >-----</li>
                            {
                                Object.keys(statusList).map((element, index) => {
                                    return <li 
                                        className="dropdown-item cursorPointer" 
                                        key={index}
                                        onClick={() => handleChangeRequest("status", setRequest, element)}
                                    >{statusList[element]}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="block" style={{width: "10%"}}>
                    <p>Số lượng</p>
                    <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {request.pageSize}
                        </button>
                        <ul className="dropdown-menu">
                            {
                                pageSizeList.map((element, index) => {
                                    return <li 
                                        className="dropdown-item cursorPointer" 
                                        key={index}
                                        onClick={() => handleChangeRequest("pageSize", setRequest, element)}
                                    >{element}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="submit">
                <button
                    onClick={async () => await searchProgram(apiURL, `/api/education-programs/${name}`, token, request, setProgram, true, setCurrentPage)}
                >Tìm kiếm</button>
            </div>
        </div>
    )
}

export default memo(RequestBlock)