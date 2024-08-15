import { useContext, useState } from "react"
import "./Login.scss"
import clsx from "clsx"
import { checkValid, handleChangeValue, handleSubmit, handleValid } from "./login_function"
import { UserContext } from "../../context/ContextProvider"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export default function Login() {

    const [ userInformation, setUserInformation ] = useState({
        userId: "",
        password: ""
    })

    const [ showPassword, setShowPassword ] = useState(false)

    const { apiURL, serverAPI, setUser, setToken } = useContext(UserContext)

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
                            type="text"
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
                            type={showPassword && "text" || "password"}
                            value={userInformation.password}
                            className={clsx({"filled": userInformation.password})}
                            onChange={e => handleChangeValue(e, setUserInformation)}
                            autoComplete="off"
                            onBlur={() => checkValid("userPassword")}
                            onFocus={() => handleValid("userPassword")}
                            style={{
                                paddingRight:"35px",
                            }}
                        />
                        <span className="error-message"></span>
                        {
                            showPassword
                            &&
                            <FontAwesomeIcon 
                                icon={faEyeSlash} 
                                className="eye-icon cursorPointer" 
                                onClick={() => setShowPassword(false)}
                            />
                            ||
                            <FontAwesomeIcon 
                                icon={faEye} 
                                className="eye-icon cursorPointer" 
                                onClick={() => setShowPassword(true)}
                            />
                        }
                    </div>
                    <button
                        onClick={
                            e => handleSubmit({ 
                                e, 
                                userInformation, 
                                api: apiURL, 
                                // api: serverAPI, 
                                // url: "/login",
                                url: "/auth/login",
                                setUser, 
                                setToken,
                                setUserInformation
                            })}
                    >Đăng nhập</button>
                </form>
            </div>
        </div>
    )
}
