import React, { useContext, useEffect, useState } from 'react'
import { handleSubmitRole, handleToggleAuthor } from './authorization-function'
import { UserContext } from '../../../context/ContextProvider'
import { Pagination } from '@mui/material'
import { postData } from '../../../utils/function'

export default function AuthorBlock({ data, setState, currentPage, setCurrentPage, request, setRequest }) {
    const [ selectedUser, setSelectedUser ] = useState()
    const { user, apiURL, token } = useContext(UserContext)
    const authorizationList = {
        "general": [
            {
                code: "ASSIGN_RESPONSIBILITY",
                name: "Phân công phụ trách"
            },
            {
                code: "MANAGE_DICTIONARY",
                name: "Quản lý từ điển"
            },
            {
                code: "ADMIN",
                name: "Admin"
            },
        ],
        "program": [
            {
                code: "UPDATE_FIELD",
                name: "Cập nhật dữ liệu ngành (thêm, sửa)"
            },
            {
                code: "APPROVE_PROGRAM",
                name: "Duyệt chương trình đào tạo"
            },
            {
                code: "DELETE_PROGRAM",
                name: "Xóa chương trình đào tạo"
            },
        ],
        "course": [
            {
                code: "UPDATE_COURSE",
                name: "Cập nhật dữ liệu học phần (thêm, sửa)"
            },
            {
                code: "APPROVE_COURSE_PLAN",
                name: "Duyệt đề cương"
            },
            {
                code: "DELETE_COURSE_PLAN",
                name: "Xóa đề cương"
            },
        ],
    }

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

    // console.log(selectedUser)
    // console.log(data)

    return (
        <div className='content mt-4'>
            <div className='lecturer-list'>
                <table>
                    <thead>
                        <tr>
                            <th className='center' style={{ width: "10%" }}>STT</th>
                            <th style={{ width: "23%" }}>Họ</th>
                            <th style={{ width: "17%" }}>Tên</th>
                            <th style={{ width: "60%" }}>Đơn vị</th>
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
            <div className='authorization'>
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: "70%" }}>Tên quyền</th>
                            <th className='center' style={{ width: "30%" }}>Cấp quyền</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        selectedUser
                        &&
                        <>
                            <tr>
                                <th className='center' colSpan={2}>Giảng viên {selectedUser.lastName} {selectedUser.firstName} - {selectedUser.lecturerCode}</th>
                            </tr>
                            <tr>
                                <th colSpan={2}>Quyền chung</th>
                            </tr>
                            {
                                authorizationList.general.map((element, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{element.name}</td>
                                            <td className='center'>
                                                <input
                                                    type='checkbox'
                                                    name={element.code}
                                                    checked={selectedUser.role.includes(element.code)}
                                                    onChange={(e) => {handleToggleAuthor(e, setSelectedUser)}}
                                                    disabled={!user.role.includes("ADMIN")}
                                                />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <th colSpan={2}>Chương trình đào tạo</th>
                            </tr>
                            {
                                authorizationList.program.map((element, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{element.name}</td>
                                            <td className='center'>
                                                <input
                                                    type='checkbox'
                                                    name={element.code}
                                                    checked={selectedUser.role.includes(element.code)}
                                                    onChange={(e) => {handleToggleAuthor(e, setSelectedUser)}}
                                                    disabled={!user.role.includes("ADMIN")}
                                                />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <th colSpan={2}>Đề cương học phần</th>
                            </tr>
                            {
                                authorizationList.course.map((element, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{element.name}</td>
                                            <td className='center'>
                                                <input
                                                    type='checkbox'
                                                    name={element.code}
                                                    checked={selectedUser.role.includes(element.code)}
                                                    onChange={(e) => {handleToggleAuthor(e, setSelectedUser)}}
                                                    disabled={!user.role.includes("ADMIN")}
                                                />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            {
                                user.role.includes("ADMIN")
                                &&
                                <tr>
                                    <th colSpan={2}>
                                        <div className='btn'>
                                            <button onClick={() => handleSubmitRole(selectedUser, apiURL, token, setState)}>Xác nhận</button>
                                        </div>
                                    </th>
                                </tr>
                            }
                        </>
                        ||
                        <tr>
                            <td colSpan={2}>Chọn giảng viên để cấp quyền</td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
