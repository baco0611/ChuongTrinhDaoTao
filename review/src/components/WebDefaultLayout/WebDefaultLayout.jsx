import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import Header from "../../views/WebDefaultLayout/Header/Header"
import { useContext, useEffect } from "react"
import { UserContext } from "../../context/ContextProvider"
import Footer from "../../views/WebDefaultLayout/Footer/Footer"

function WebDefaultLayout () {
    const { token } = useContext(UserContext)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if(!token) 
            navigate("/login")
        else {
            if(location.pathname == "/login")
                navigate("/")
        }
    }, [token, location.pathname])

    return (
        <div>
            <Header/>
            
            <Outlet/>
    
            <Footer/>
        </div>
    )
}

export default WebDefaultLayout