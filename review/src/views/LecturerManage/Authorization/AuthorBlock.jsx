import React, { useState } from 'react'
import { handleToggleAuthor } from './authorization-function'

export default function AuthorBlock({ data }) {
    const [ selectedUser, setSelectedUser ] = useState()
    const authorizationList = {
        "general": [
            {
                code: "assign_responsibility",
                name: "Phân công phụ trách"
            },
            {
                code: "manage_dictionary",
                name: "Quản lý từ điển"
            },
        ],
        "program": [
            {
                code: "update_field",
                name: "Cập nhật dữ liệu ngành (thêm, sửa)"
            },
            {
                code: "approve_program",
                name: "Duyệt chương trình đào tạo"
            },
            {
                code: "delete_program",
                name: "Xóa chương trình đào tạo"
            },
        ],
        "course": [
            {
                code: "update_course",
                name: "Cập nhật dữ liệu học phần (thêm, sửa)"
            },
            {
                code: "approve_course_plan",
                name: "Duyệt đề cương"
            },
            {
                code: "delete_course_plan",
                name: "Xóa đề cương"
            },
        ],
    }

    console.log(selectedUser)

    return (
        <div className='content mt-4'>
            <div className='lecturer-list'>
                <table>
                    <thead>
                        <tr>
                            <th className='center' style={{ width: "10%" }}>STT</th>
                            <th style={{ width: "25%" }}>Họ</th>
                            <th style={{ width: "20%" }}>Tên</th>
                            <th style={{ width: "45%" }}>Đơn vị</th>
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
                                    <td className='center'>{data.pageInformation.pageOrder + index}</td>
                                    <td>{element.lastName}</td>
                                    <td>{element.firstName}</td>
                                    <td>{element.departmentName}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
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
                                                />
                                            </td>
                                        </tr>
                                    )
                                })
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
