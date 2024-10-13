import React, { useContext, useState } from 'react'
import "./CreateUserBlock.scss"
import { checkValidDepartment, checkValidInformation, handleChangeInformation, handleCreateUser, validElement } from '../user-manage'
import { UserContext } from '../../../../context/ContextProvider'

export default function CreateUserBlock({ department, setIsHide }) {
    const [ information, setInformation ] = useState({
        firstName: "",
        lastName: "",
        lecturerCode: "",
        email: "",
        department: "",
        departmentName: ""
    })

    const { apiURL, token } = useContext(UserContext)

    return (
        <div id='create-user' className='content'>
            <div className='user-information'>
                <h1>Tạo người dùng</h1>
                <div className='information-block'>
                    <div className='input-block'>
                        <p>Mã giảng viên</p>
                        <input
                            type='text'
                            name='lecturerCode'
                            value={information.lecturerCode || ""}
                            autoComplete='off'
                            onChange={(e) => handleChangeInformation({
                                e,
                                setState: setInformation,
                            })}
                            onBlur={e => checkValidInformation({e, api: apiURL, token})}
                            onFocus={e => validElement(e.target)}
                        />
                        <span></span>
                    </div>
                    <div className='input-block available'>
                        <p>Họ</p>
                        <input
                            type='text'
                            name='lastName'
                            value={information.lastName || ""}
                            autoComplete='off'
                            onChange={(e) => handleChangeInformation({
                                e,
                                setState: setInformation,
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
                            value={information.firstName || ""}
                            autoComplete='off'
                            onChange={(e) => handleChangeInformation({
                                e,
                                setState: setInformation,
                            })}
                            onBlur={e => checkValidInformation({e, setState: setInformation})}
                            onFocus={e => validElement(e.target)}
                        />
                        <span></span>
                    </div>
                    <div className='input-block available'>
                        <p>Email</p>
                        <input
                            type='text'
                            name='email'
                            value={information.email || ""}
                            autoComplete='off'
                            onChange={(e) => handleChangeInformation({
                                e,
                                setState: setInformation,
                            })}
                            onBlur={e => checkValidInformation({e})}
                            onFocus={e => validElement(e.target)}
                        />
                        <span></span>
                    </div>
                    <div className='input-block'>
                        <p>Đơn vị</p>
                        <div className="dropdown">
                            <button 
                                className="btn dropdown-toggle" 
                                type="button" 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                                onFocus={e => validElement(e.target)}
                                onBlur={checkValidDepartment}
                            >
                                {information.department && information.departmentName || "-----"}
                            </button>
                            <ul className="dropdown-menu">
                            {
                                department.map((element, index) => {
                                    return <li 
                                        className="dropdown-item cursorPointer" 
                                        key={index}
                                        onClick={() => handleChangeInformation({
                                            element,
                                            setState: setInformation
                                        })}
                                        onFocus={e => validElement(e.target)}
                                    >{element.departmentName}</li>
                                })
                            }
                            </ul>
                        </div>
                        <span></span>
                    </div>
                    <div className='button-block'>
                        <button
                            style={{width: "100%"}}
                            onClick={(e) => handleCreateUser({
                                e,
                                api: apiURL,
                                token,
                                data: information,
                                setState: setInformation,
                                setIsHide
                            })}
                        >Tạo người dùng mới</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
