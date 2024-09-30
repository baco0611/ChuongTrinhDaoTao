import React, { useContext, useState } from 'react'
import "./User.scss"
import { useQuery } from 'react-query'
import Loader from '../../components/Loader/Loader'
import { UserContext } from '../../context/ContextProvider'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { checkValidInformation, getUserInformation, handleChangeInformation, handleSavingInformation, handleSavingPassword, validElement } from './user-function'
import PasswordBlock from './PasswordBlock'

export default function User() {

    const navigate = useNavigate()

    const { user, apiURL, token, serverAPI, isDataSaved, setIsDataSaved, handleBeforeUnload } = useContext(UserContext)
    const [ userInformation, setUserInformation ] = useState({
        firstName: "",
        lastName: "",
        email: "",
        lecturerCode: "",
        role: [],
        departmentName: ""
    })

    const [ password, setPassword ] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    // Lấy dữ liệu từ db
    const fetchAPI = (id) => {
        const token = Cookies.get("ACCESS_TOKEN")

        return async () => {
            return await getUserInformation({
                api: serverAPI,
                token,
                setIsDataSaved,
                setUserInformation
            })
        }
    }

    const { data , isLoading, isError} = useQuery(`user-information`, fetchAPI(),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    console.log(userInformation)

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')


    return (
        <div className='wrapper body-container user-section'>
            <div className='user-block'>
                <div className='title'>
                    <h1>Thông tin người dùng</h1>
                </div>
                <div className='content'>
                    <div className='input-block'>
                        <p>Mã giảng viên</p>
                        <input
                            type='text'
                            name='lecturerCode'
                            value={userInformation.lecturerCode || ""}
                            autoComplete='off'
                            readOnly
                        />
                        <span></span>
                    </div>
                    <div className='input-block available'>
                        <p>Họ</p>
                        <input
                            type='text'
                            name='lastName'
                            value={userInformation.lastName || ""}
                            autoComplete='off'
                            onChange={(e) => handleChangeInformation({
                                e,
                                setState: setUserInformation,
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
                            value={userInformation.firstName || ""}
                            autoComplete='off'
                            onChange={(e) => handleChangeInformation({
                                e,
                                setState: setUserInformation,
                            })}
                            onBlur={e => checkValidInformation({e})}
                            onFocus={e => validElement(e.target)}
                        />
                        <span></span>
                    </div>
                    <div className='input-block available'>
                        <p>Email</p>
                        <input
                            type='text'
                            name='email'
                            value={userInformation.email || ""}
                            autoComplete='off'
                            onChange={(e) => handleChangeInformation({
                                e,
                                setState: setUserInformation,
                            })}
                            onBlur={e => checkValidInformation({e})}
                            onFocus={e => validElement(e.target)}
                        />
                        <span></span>
                    </div>
                    <div className='input-block'>
                        <p>Đơn vị</p>
                        <input
                            type='text'
                            name='departmentName'
                            value={userInformation.departmentName || ""}
                            autoComplete='off'
                            readOnly
                        />
                        <span></span>
                    </div>
                    <div className='input-block'>
                        <p>Quyền truy cập</p>
                        <input
                            type='text'
                            name='role'
                            value={userInformation.role.join(", ") || ""}
                            autoComplete='off'
                            readOnly
                        />
                        <span></span>
                    </div>
                    <button
                        onClick={() => handleSavingInformation({
                            api: serverAPI,
                            token,
                            data: userInformation
                        })}
                    >Cập nhật dữ liệu người dùng</button>
                </div>
            </div>
            <div className='user-block'>
                <div className='title'>
                    <h1>Thay đổi mật khẩu</h1>
                </div>
                <div className='content'>
                    <PasswordBlock
                        data={password.oldPassword}
                        name={"oldPassword"}
                        title={"Mật khẩu cũ"}
                        setState={setPassword}
                    />
                    <PasswordBlock
                        data={password.newPassword}
                        name={"newPassword"}
                        title={"Mật khẩu mới"}
                        setState={setPassword}
                    />
                    <PasswordBlock
                        data={password.confirmPassword}
                        name={"confirmPassword"}
                        title={"Xác nhận mật khẩu"}
                        setState={setPassword}
                        newPassword={password.newPassword}
                    />
                    <button
                        onClick={() => handleSavingPassword({
                            api: serverAPI,
                            token,
                            data: password,
                            lecturerCode: userInformation.lecturerCode
                        })}
                    >Lưu mật khẩu</button>
                </div>
            </div>
        </div>
    )
}
