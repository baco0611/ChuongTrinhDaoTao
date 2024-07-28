import { useContext, useState } from "react"
import "./Login.scss"
import clsx from "clsx"
import { checkValid, handleChangeValue, handleSubmit, handleValid } from "./login_function"
import { UserContext } from "../../context/ContextProvider"

export default function Login() {

    const [ userInformation, setUserInformation ] = useState({
        userId: "",
        password: ""
    })

    const { serverAPI, setUser, setToken } = useContext(UserContext)

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
                            onBlur={() => checkValid("userId")}
                            onFocus={() => handleValid("userId")}
                            style={{
                                textTransform: "uppercase"
                            }}
                        />
                        <span className="error-message"></span>
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
                            onBlur={() => checkValid("userPassword")}
                            onFocus={() => handleValid("userPassword")}
                        />
                        <span className="error-message"></span>
                    </div>
                    <button
                        onClick={
                            e => handleSubmit({ 
                                e, 
                                userInformation, 
                                serverAPI, 
                                setUser, 
                                setToken,
                            })}
                    >Đăng nhập</button>
                </form>
            </div>
        </div>
    )
}
