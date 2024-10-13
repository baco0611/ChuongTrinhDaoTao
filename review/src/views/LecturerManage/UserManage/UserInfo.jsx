import React, { useContext } from 'react'
import { checkValidInformation, handleChangeInformation, handleDeleteUser, handleSavingInformation, validElement } from './user-manage'
import { UserContext } from '../../../context/ContextProvider'

export default function UserInfo({ selectedUser, setSelectedUser, setState, request, department }) {
    
    const { apiURL, serverAPI, token } = useContext(UserContext)
    
    return (
        <div className='user-information' id='user-info'>
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
                        onChange={(e) => handleChangeInformation({
                            e,
                            setState: setSelectedUser,
                        })}
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
                        onChange={(e) => handleChangeInformation({
                            e,
                            setState: setSelectedUser,
                        })}
                        onBlur={e => checkValidInformation({e})}
                        onFocus={e => validElement(e.target)}
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
                        onChange={(e) => handleChangeInformation({
                            e,
                            setState: setSelectedUser,
                        })}
                        onBlur={e => checkValidInformation({e, setState: setSelectedUser})}
                        onFocus={e => validElement(e.target)}
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
                        onChange={(e) => handleChangeInformation({
                            e,
                            setState: setSelectedUser,
                        })}
                        onBlur={e => checkValidInformation({e})}
                        onFocus={e => validElement(e.target)}
                    />
                    <span></span>
                </div>
                <div className='input-block'>
                    <p>Đơn vị</p>
                    <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {selectedUser.department && selectedUser.departmentName || "-----"}
                        </button>
                        <ul className="dropdown-menu">
                        {
                            department.map((element, index) => {
                                return <li 
                                    className="dropdown-item cursorPointer" 
                                    key={index}
                                    onClick={() => handleChangeInformation({
                                        element,
                                        setState: setSelectedUser
                                    })}
                                >{element.departmentName}</li>
                            })
                        }
                        </ul>
                    </div>
                    <span></span>
                </div>
                <div className='button-block'>
                    <button
                        onClick={() => handleSavingInformation({
                            api: apiURL,
                            token,
                            data: selectedUser,
                            setState,
                        })}
                    >Cập nhật dữ liệu</button>
                    <button
                        className='delete-btn'
                        onClick={() => handleDeleteUser({
                            api: apiURL,
                            token,
                            data: selectedUser,
                            request,
                            setState,
                            setSelectedUser
                        })}
                    >Xóa người dùng</button>
                </div>
            </div>
            ||
            <div className='information-block'>
                <h3>Chọn giảng viên để chỉnh sửa thông tin</h3>
            </div>
        }
        </div>
    )
}
