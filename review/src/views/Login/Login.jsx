import { useState } from "react"
import "./Login.scss"
import clsx from "clsx"
import { handleChangeValue, handleSubmit } from "./login_function"

export default function Login() {

    const [ userInformation, setUserInformation ] = useState({
        userId: "",
        password: ""
    })

    return (
        <div className='login' id='login'>
            <div className="login-container">
                <form>
                    <h1>đăng nhập</h1>
                    <div className="input-block">
                        <label htmlFor="login-userId">Mã giảng viên</label>
                        <input
                            id="login-userId"
                            name="userId"
                            value={userInformation.userId}
                            className={clsx({"filled": userInformation.userId})}
                            onChange={e => handleChangeValue(e, setUserInformation)}
                            autoComplete="off"
                        />
                        <span className="message"></span>
                    </div>
                    <div className="input-block">
                        <label htmlFor="login-userPassword">Mật khẩu</label>
                        <input
                            id="login-userPassword"
                            name="password"
                            value={userInformation.password}
                            className={clsx({"filled": userInformation.password})}
                            onChange={e => handleChangeValue(e, setUserInformation)}
                            autoComplete="off"
                        />
                        <span className="message"></span>
                    </div>
                    <button
                        onClick={e => handleSubmit(e, userInformation)}
                    >Đăng nhập</button>
                </form>
            </div>
        </div>
    )
}
