import { postData } from "../../../utils/function"

const searchLecturer = async (api, url, token, payload, setState) => {
    if(!payload.pageOrder) {
        payload.pageOrder = 1
    }

    const result = await postData(api, url, token, payload)
    if(result.status == 200)
        setState(result.data)
}

const handleToggleAuthor = (e, setState) => {
    const code = e.target.name

    setState(prev => {
        if(prev.role.includes(code))
            return {
                ...prev,
                role: prev.role.filter(element => element != code)
            }
        else 
            return {
                ...prev,
                role: [...prev.role, code]
            }
    })
}

export {
    searchLecturer,
    handleToggleAuthor
}