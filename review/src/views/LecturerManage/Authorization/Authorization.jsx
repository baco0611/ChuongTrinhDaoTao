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
    const { apiURL, fakeAPI, token, serverAPI } = useContext(UserContext); 
    const navigate = useNavigate()
    
    const [ lecturerList, setLecturerList ] = useState([])
    const [ request, setRequest ] = useState({
        department: "",
        departmentName: "",
        keyWord: "",
        // pageOrder: 1
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const fetchLecturerAPI = (api) => {
        return async () => {
            const departmentResult = await postData(api, "/lecturer-search", token, request)
            setLecturerList(departmentResult.data)   
        }
    }

    const { data , isLoading, isError} = useQuery(`lecturer-search`, fetchLecturerAPI(serverAPI),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    return (
        <div className='wrapper body-container' id='authorization'>
            <RequestBlock
                request={request}
                setRequest={setRequest}
                setLecturerList={setLecturerList}
            />
            <AuthorBlock
                data={lecturerList}
            />
        </div>
    )
}
