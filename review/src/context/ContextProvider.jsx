import { createContext, useState } from "react"

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
    const [user, setUser] = useState("")
    const [token, _setToken] = useState("")

    const setToken = token => {
        _setToken(token)
        if(token) {
            localStorage.setItem("ACCESS_TOKEN", token)
        } else {
            localStorage.removeItem("ACCESS_TOKEN")
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
