import React, { useContext, useState } from 'react'
import "./User.scss"
import { useQuery } from 'react-query'
import Loader from '../../components/Loader/Loader'
import { UserContext } from '../../context/ContextProvider'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { getUserInformation, handleChangeInformation } from './user-function'

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
                        />
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
                        />
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
                        />
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
                    </div>
                    <button>Cập nhật dữ liệu người dùng</button>
                </div>
            </div>
            <div className='user-block'>
                <div className='title'>
                    <h1>Thay đổi mật khẩu</h1>
                </div>
            </div>
        </div>
    )
}
