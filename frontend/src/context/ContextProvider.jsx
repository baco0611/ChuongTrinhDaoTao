import { createContext, useEffect, useState } from "react";

const UserContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken:() => {},
    apiURL: null,
    fakeApi: null,
    sectionList: null,
    isDataSaved: null,
    setIsDataSaved: () => {},
    handleBeforeUnload: () => {}
})

function StateContext({ children }) {

    // User and token
    // const [user, setUser] = useState()
    const [user, setUser] = useState({
        name: 'Huynh Van Nguyen Bao'
    })
    const [token, _setToken] = useState(localStorage.getItem('ACCES_TOKEN'))
    // const [token, _setToken] = useState(123)

    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem('ACCES_TOKEN', token)
        } else { 
            localStorage.removeItem('ACCES_TOKEN')
        }
    } 

    const [isDataSaved, setIsDataSaved] = useState(true); // Giả sử ban đầu dữ liệu đã được lưu

    // Default path of API
    const apiURL = "http://localhost:8000/api"
    const fakeApi = "http://localhost:3001"

    // Handle current editing
    const sectionList = ['A', 'B', 'C', 'D', 'E', 'G', 'H']

    // Hàm này sẽ được gọi khi người dùng cố gắng rời khỏi trang
    const handleBeforeUnload = (event) => {
        console.log(isDataSaved)
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
export { UserContext }