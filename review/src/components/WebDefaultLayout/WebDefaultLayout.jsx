import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import Header from "../../views/WebDefaultLayout/Header/Header"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/ContextProvider"
import Footer from "../../views/WebDefaultLayout/Footer/Footer"

function WebDefaultLayout () {
    const { token } = useContext(UserContext)
    const navigate = useNavigate()
    const [isTokenChecked, setIsTokenChecked] = useState(false)

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

    return (
        <div>
            <Header/>
            
            <Outlet/>
    
            <Footer/>
        </div>
    )
}

export default WebDefaultLayout