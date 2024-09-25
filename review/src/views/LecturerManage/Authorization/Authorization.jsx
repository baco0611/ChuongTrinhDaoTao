import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { postData } from '../../../utils/function'
import { UserContext } from '../../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';
import "./Authorization.scss"
import RequestBlock from './RequestBlock';
import AuthorBlock from './AuthorBlock';

export default function Authorization() {
    const { apiURL } = useContext(UserContext); 
    const navigate = useNavigate()
    
    const [ lecturerList, setLecturerList ] = useState([])
    const [ request, setRequest ] = useState({
        department: "",
        departmentName: "",
        keyWord: "",
        pageOrder: 1
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const fetchLecturerAPI = (api) => {
        return async () => {
            let token = document.cookie.split("; ")
            token = token.filter(element => element.includes("ACCESS_TOKEN"))[0]?.split("=")[1]

            console.log(9)
            const departmentResult = await postData(api, "/api/lecturer/getAll", token, request)
            setLecturerList(departmentResult.data.data)   
        }
    }

    const { data , isLoading, isError } = useQuery(`lecturer-search`, fetchLecturerAPI(apiURL),{
        cacheTime: 0,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    return (
        <div className='wrapper body-container' id='authorization'>
            <h1 className='title'>Phân quyền giảng viên</h1>
            <RequestBlock
                request={request}
                setRequest={setRequest}
                setLecturerList={setLecturerList}
            />
            <AuthorBlock
                data={lecturerList}
                setState={setLecturerList}
            />
        </div>
    )
}
