import React, { useContext, useEffect, useState } from 'react'
// import { handleSubmitRole, handleToggleAuthor } from './authorization-function'
import { UserContext } from '../../../context/ContextProvider'
import { Pagination } from '@mui/material'
import { postData } from '../../../utils/function'
import { handleChangeInformation } from './user-manage'
import UserInfo from './UserInfo'

export default function UserBlock({ data, setState, currentPage, setCurrentPage, request, setRequest, department, selectedUser, setSelectedUser }) {
    
    const { user, apiURL, token, serverAPI } = useContext(UserContext)

    const handlePageChange = (e, value) => {
        setCurrentPage(value);
        setRequest(prev => {
            return {
                ...prev,
                pageOrder: value
            }
        })
    };

    useEffect(() => {
        console.log(currentPage)
        async function fetchData() {
            let token = document.cookie.split("; ")
            token = token.filter(element => element.includes("ACCESS_TOKEN"))[0]
            token = token.split("=")[1]

            const departmentResult = await postData(apiURL, "/api/lecturer/getAll", token, request)
            setState(departmentResult.data)   
        }
        fetchData();
    }, [currentPage])

    console.log(selectedUser)

    return (
        <div className='content mt-4'>
            <div className='lecturer-list'>
                <table>
                    <thead>
                        <tr>
                            <th className='center' style={{ width: "7%" }}>STT</th>
                            <th style={{ width: "10%" }}>Mã GV</th>
                            <th style={{ width: "20%" }}>Họ</th>
                            <th style={{ width: "13%" }}>Tên</th>
                            <th style={{ width: "50%" }}>Đơn vị</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data.data.map((element, index) => {
                            return (
                                <tr 
                                    key={index}
                                    className='cursorPointer'    
                                    onClick={() => setSelectedUser(element)}
                                >
                                    <td className='center'>{(data.pageInformation.pageOrder-1) * data.pageInformation.numOfElement + index + 1}</td>
                                    <td>{element.lecturerCode}</td>
                                    <td>{element.lastName}</td>
                                    <td>{element.firstName}</td>
                                    <td>{element.departmentName}</td>
                                </tr>
                            )
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
            <UserInfo
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                setState={setState}
                request={request}
                department={department}
            />
        </div>
    )
}
