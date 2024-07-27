import { createContext, useEffect, useState } from "react"
import Cookies from 'js-cookie'

const UserContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    apiURL: null,
    convertAPI: null,
    fakeApi: null,
    sectionList: null,
})

function StateContext({ children }) {
    const [user, _setUser] = useState({})
    const [token, _setToken] = useState("")

    useEffect(() => {
        const storedUser = Cookies.get("USER");
        const storedToken = Cookies.get("ACCESS_TOKEN");

        console.log(storedUser)
        console.log(storedToken)
        if (storedUser) {
            _setUser(JSON.parse(storedUser));
        }
        if (storedToken) {
            _setToken(storedToken);
        }
    }, []);

    const setUser = user => {
        _setUser(user);
        Cookies.set("USER", JSON.stringify(user));
    }

    const setToken = token => {
        _setToken(token);
        if (token) {
            Cookies.set("ACCESS_TOKEN", token);
        } else {
            Cookies.remove("ACCESS_TOKEN");
            Cookies.remove("USER");
            _setUser({
                lastName: "Lương",
                firstName: "Trần Thanh",
                donVi: ""
            });
        }
    }

    const [isDataSaved, setIsDataSaved] = useState(true); // Giả sử ban đầu dữ liệu đã được lưu

    const apiURL = "http://localhost:8000/api"
    const convertAPI = "http://localhost:8081"
    const fakeApi = "http://localhost:3001"
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
                fakeApi,
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
