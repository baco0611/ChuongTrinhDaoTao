import React, { useContext, useEffect, useState } from 'react'
// import { handleSubmitRole, handleToggleAuthor } from './authorization-function'
import { UserContext } from '../../../context/ContextProvider'
import { Pagination } from '@mui/material'
import { postData } from '../../../utils/function'

export default function UserBlock({ data, setState, currentPage, setCurrentPage, request, setRequest }) {
    const [ selectedUser, setSelectedUser ] = useState()
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

            const departmentResult = await postData(serverAPI, "/user-manage", token, request)
            setState(departmentResult.data)   
        }
        fetchData();
    }, [currentPage])

    console.log(selectedUser)
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
                        // onChange={handlePageChange}
                        color="primary"
                    />
                </div>
            </div>
            <div className='user-information'>
                {
                    selectedUser &&
                    <div className='information-block'>
                        <div className='input-block'>
                            <p>Mã giảng viên</p>
                            <input
                                type='text'
                                name='lecturerCode'
                                value={selectedUser.lecturerCode || ""}
                                autoComplete='off'
                            />
                            <span></span>
                        </div>
                        <div className='input-block available'>
                            <p>Họ</p>
                            <input
                                type='text'
                                name='lastName'
                                value={selectedUser.lastName || ""}
                                autoComplete='off'
                                // onChange={(e) => handleChangeInformation({
                                //     e,
                                //     setState: setUserInformation,
                                // })}
                                // onBlur={e => checkValidInformation({e})}
                                // onFocus={e => validElement(e.target)}
                            />
                            <span></span>
                        </div>
                        <div className='input-block available'>
                            <p>Tên (1 chữ cuối)</p>
                            <input
                                type='text'
                                name='firstName'
                                value={selectedUser.firstName || ""}
                                autoComplete='off'
                                // onChange={(e) => handleChangeInformation({
                                //     e,
                                //     setState: setUserInformation,
                                // })}
                                // onBlur={e => checkValidInformation({e})}
                                // onFocus={e => validElement(e.target)}
                            />
                            <span></span>
                        </div>
                        <div className='input-block available'>
                            <p>Email</p>
                            <input
                                type='text'
                                name='email'
                                value={selectedUser.email || ""}
                                autoComplete='off'
                                // onChange={(e) => handleChangeInformation({
                                //     e,
                                //     setState: setUserInformation,
                                // })}
                                // onBlur={e => checkValidInformation({e})}
                                // onFocus={e => validElement(e.target)}
                            />
                            <span></span>
                        </div>
                        <div className='input-block'>
                            <p>Đơn vị</p>
                            <input
                                type='text'
                                name='departmentName'
                                value={selectedUser.departmentName || ""}
                                autoComplete='off'
                            />
                            <span></span>
                        </div>
                        <div className='input-block'>
                            <p>Quyền truy cập</p>
                            <input
                                type='text'
                                name='role'
                                value={selectedUser.role.join(", ") || ""}
                                autoComplete='off'
                                readOnly
                            />
                            <span></span>
                        </div>
                        <button
                            // onClick={() => handleSavingInformation({
                            //     api: serverAPI,
                            //     token,
                            //     data: userInformation
                            // })}
                        >Cập nhật dữ liệu người dùng</button>
                    </div>
                }
            </div>
        </div>
    )
}
