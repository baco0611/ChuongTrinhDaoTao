import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import Header from "../../views/WebDefaultLayout/Header/Header"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/ContextProvider"
import Footer from "../../views/WebDefaultLayout/Footer/Footer"
import Cookies from "js-cookie"
import { getData } from "../../utils/function"

function WebDefaultLayout () {
    const { token, apiURL, setToken, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const [isTokenChecked, setIsTokenChecked] = useState(false)

    const user_cookie = Cookies.get("USER") || "{}"
    const decodedString = decodeURIComponent(user_cookie);
    const user = JSON.parse(decodedString);
    console.log(user, typeof(user))

    useEffect(() => {
        // Check token only once during the initial render
        if (!isTokenChecked) {
            setIsTokenChecked(true)
        } else {
            // If there is no token and user is not on the login page, redirect to login
            if (!token && location.pathname !== "/login") {
                navigate("/login")
            // If there is a token and user is on the login page, redirect to home
            } else if (token && location.pathname === "/login") {
                navigate("/")
            }
        }
    }, [token, location.pathname, isTokenChecked, navigate])

    useEffect(() => {
        // Hàm để kiểm tra hạn của token
        const checkTokenExpiry = async () => {
            const token = Cookies.get("ACCESS_TOKEN")
            
            if (!token) {
                return;
            }
            const payloadBase64 = token.split('.')[1]; // Lấy phần giữa (payload)
            const decodedPayload = JSON.parse(atob(payloadBase64)); // Giải mã Base64
            const tokenExpiry = decodedPayload.exp * 1000; // 'exp' được tính theo giây, nên nhân với 1000 để thành mili giây
            const currentTime = Date.now();

            // console.log(payloadBase64)
            // console.log(decodedPayload)
            console.log(tokenExpiry)
            console.log(currentTime)
            // Giả sử token chứa thông tin về hạn dưới dạng Unix timestamp
            
            if (currentTime > tokenExpiry - (7 * 60 * 1000)) {
                console.log('Token đã hết hạn');
                
                const result = await getData(apiURL, "/api/lecturer/refresh", token)
                setToken(result.data.token)
            }

        }
    
        // Thiết lập interval để kiểm tra mỗi 5 phút
        const interval = setInterval(() => {
          checkTokenExpiry();
        }, 5 * 60 * 1000);
    
        // Dọn dẹp khi component unmount
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Kiểm tra và cập nhật role
        const checkRole = async () => {
            const token = Cookies.get("ACCESS_TOKEN")
            
            if (!token) {
                return;
            }

            const result = await getData(apiURL, "/api/lecturer/roles", token)
            console.log(result, user)

            const data = {
                ...user,
                role: result.data.data
            }

            setUser(data)
        }
    
        // Thiết lập interval để kiểm tra mỗi 1 phút
        const interval = setInterval(() => {
          checkRole()
        }, 1 * 60 * 1000);
    
        // Dọn dẹp khi component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <Header/>
            
            <Outlet/>
    
            <Footer/>
        </div>
    )
}

export default WebDefaultLayout