import { getData } from "../../utils/function"

export const getUserInformation = async ({ api, token, setIsDataSaved, setUserInformation }) => {
    const result = await getData(api, "/user", token)

    if(result.status == 200) {
        setUserInformation(result.data.data)
    } else {
        throw "wrong"
    }
}

export const handleChangeInformation = ({ e, setIsDataSaved, setState }) => {
    const name = e.target.name
    const value = e.target.value

    setState(prev => {
        return {
            ...prev,
            [name]: value
        }
    })
}