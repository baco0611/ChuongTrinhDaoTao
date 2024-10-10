import React, { useContext, useState } from 'react'
import Loader from '../../../components/Loader/Loader'
import { UserContext } from '../../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getData } from '../../../utils/function';
// import { searchLecturer, handleChangeRequest } from './authorization-function';

export default function RequestBlock({ request, department, setRequest, setLecturerList}) {

    const { apiURL, fakeAPI, token, serverAPI } = useContext(UserContext); 
    const navigate = useNavigate()

    return (
        <div className="search-request mt-2">
            <div className="conditional">
                <div className="block" style={{width: "30%"}}>
                    <p>Đơn vị</p>
                    <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {request.department && request.departmentName || "-----"}
                        </button>
                        <ul className="dropdown-menu">
                            <li 
                                className="dropdown-item cursorPointer"
                                // onClick={() => (handleChangeRequest("department", setRequest))}    
                            >-----</li>
                            {
                                department.map((element, index) => {
                                    return <li 
                                        className="dropdown-item cursorPointer" 
                                        key={index}
                                        // onClick={() => handleChangeRequest("department", setRequest, element)}
                                    >{element.departmentName}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>

                <div className="block" style={{width: "50%"}}>
                    <p>Từ khóa</p>
                    <input
                        type="text"
                        placeholder="Nhập từ khóa"
                        // onChange={(e) => handleChangeRequest("keyword", setRequest, e.target.value)}
                    />
                </div>
            </div>
            <div className="submit">
                <button
                    // onClick={async () => await searchLecturer(apiURL, "/api/lecturer/getAll", token, request, setLecturerList)}
                >Tìm kiếm</button>
                <button
                    // onClick={async () => await searchLecturer(apiURL, "/api/lecturer/getAll", token, request, setLecturerList)}
                >Tạo mới</button>
            </div>
        </div>
    )
}
