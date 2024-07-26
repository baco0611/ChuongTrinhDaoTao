import { Link, Outlet } from "react-router-dom"
// import Header from "../../views/WebDefaultSection/Header/Header"
// import Footer from "../../views/WebDefaultSection/Footer/Footer"

function WebDefaultLayout () {
    return (
        <div>
            {/* <Header/> */}
            
            <Outlet/>
    
            {/* <Footer/> */}
        </div>
    )
}

export default WebDefaultLayout