import { useContext, useEffect, useState } from "react";
import "./RequestBlock.scss"
import { useNavigate } from "react-router-dom";
import { getData } from "../../../utils/function.js";
import { useQuery } from "react-query";
import { UserContext } from "../../../context/ContextProvider.jsx";
import Loader from "../../../components/Loader/Loader.jsx";
import { handleChangeRequest, searchProgram } from "./requestBlock.js";

export default function RequestBlock({ name, setProgram }) {
    const { apiURL, fakeAPI, token, serverAPI } = useContext(UserContext); 
    const navigate = useNavigate()
    const [ department, setDepartment ] = useState([])
    const pageSizeList = [ 15, 30, 50, 100 ]
    const statusList = {
        DANG_THUC_HIEN: "Đang thực hiện",
        DA_NOP: "Đã nộp",
        DA_DUYET: "Đã duyệt",
        DA_HUY: "Đã hủy"
    }
    const [ request, setRequest ] = useState({
        department: "",
        departmentName: "",
        keyWord: "",
        pageSize: 15,
        status: ""
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        async function fetchData() {
            await searchProgram(serverAPI, "/search-program", token, request, setProgram)
        }
        fetchData();
    }, [])

    const fecthAPI = (api) => {
        return async () => {
            const departmentResult = await getData(api, "/department", token)
            setDepartment(departmentResult.data.data) 
            
        }
    }

    const { data , isLoading, isError} = useQuery(`introduce`, fecthAPI(fakeAPI),{
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
                            {request.department && request.departmentName || "-----"}
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
                        onChange={(e) => handleChangeRequest("keyWord", setRequest, e.target.value)}
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
                    onClick={() => searchProgram(serverAPI, "/search-program", token, request, setProgram)}
                >Tìm kiếm</button>
            </div>
        </div>
    )
}
