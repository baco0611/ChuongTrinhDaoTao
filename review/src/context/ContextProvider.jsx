import { createContext, useEffect, useState } from "react"
import Cookies from 'js-cookie'

const UserContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    apiURL: null,
    jsonAPI: null,
    serverAPI: null,
    convertAPI: null,
    fakeAPI: null,
    sectionList: null,
    isDataSaved: null,
    setIsDataSaved: null,
    handleBeforeUnload: null
})

function StateContext({ children }) {
    const [user, _setUser] = useState({})
    const [token, _setToken] = useState("")

    useEffect(() => {
        const storedUser = Cookies.get("USER") || sessionStorage.getItem("USER");
        const storedToken = Cookies.get("ACCESS_TOKEN") || sessionStorage.getItem("ACCESS_TOKEN");
        
        if (storedUser) {
            _setUser(JSON.parse(storedUser));
        }
        if (storedToken) {
            _setToken(storedToken);
        }
    }, []);

    const setUser = user => {
        _setUser(user);
        if(user) {
            Cookies.set("USER", JSON.stringify(user));
            sessionStorage.setItem("USER", JSON.stringify(user));
        } else {
            Cookies.remove("USER");
            sessionStorage.removeItem("USER");
        }
    }
    
    const setToken = token => {
        _setToken(token);
        if (token) {
            Cookies.set("ACCESS_TOKEN", token);
            sessionStorage.setItem("ACCESS_TOKEN", token);
        } else {
            Cookies.remove("ACCESS_TOKEN");
            sessionStorage.removeItem("ACCESS_TOKEN");
        }
    }

    const [isDataSaved, setIsDataSaved] = useState(true); // Giả sử ban đầu dữ liệu đã được lưu

    const apiURL = "http://localhost:8000/api"
    const convertAPI = "http://localhost:8081"
    const fakeAPI = "http://localhost:3001"
    const serverAPI = "http://localhost:3002"
    const sectionList = ['A', 'B', 'C', 'D', 'E', 'G', 'H']

    const handleBeforeUnload = (event) => {
        // console.log(isDataSaved)
        if (!isDataSaved) {
            const message = 'Bạn có chắc chắn muốn rời khỏi? Dữ liệu chưa hoặc đang được lưu có thể bị mất.';
            event.returnValue = message; // Chuẩn cho một số trình duyệt
            return message; // Chuẩn cho một số trình duyệt khác
        }
    };

    return (
        <UserContext.Provider value={{
                user,
                token,
                setUser,
                setToken,
                apiURL,
                convertAPI,
                fakeAPI,
                serverAPI,
                sectionList,
                isDataSaved,
                setIsDataSaved,
                handleBeforeUnload
            }
        }>
            {children}
        </UserContext.Provider>
    )
}

export default StateContext
export { UserContext }
