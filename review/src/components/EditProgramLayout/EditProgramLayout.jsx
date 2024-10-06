import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"
import { basic_decode } from '../../utils/function'
import { verifyAuthentication } from './getAuthenticationEditor'
import { UserContext } from '../../context/ContextProvider'
import Loader from '../Loader/Loader'
import { useQuery } from 'react-query'

export default function EditProgramLayout() {
    const { apiURL, serverAPI } = useContext(UserContext)
    const id = useLocation().pathname.split("/").pop()
    const queryParams = new URLSearchParams(window.location.search)
    const responsiveTeacher = basic_decode(queryParams.get("t"))
    const navigate = useNavigate()
    const [ isLoading, setIsLoading ] = useState(true)
 
    useEffect(() => {

        const token = Cookies.get("ACCESS_TOKEN")

        verifyAuthentication({
            api: apiURL,
            id,
            lecturerCode: responsiveTeacher,
            token,
            navigate,
            setIsLoading
        })

        
        // Khi unmount khỏi EditProgram thì sẽ xóa hết dữ liệu trong session Storage tránh lãng phí bộ nhớ
        return () => {
            let keys = Object.keys(sessionStorage);
            
            keys = keys.filter(key => key.includes(`${id}`))
            
            keys.forEach(key => sessionStorage.removeItem(key))
        }
    }, [])

    return (
        <>
            {
                isLoading && <Loader/>
            }
            <Outlet/>
        </>
    )
}
