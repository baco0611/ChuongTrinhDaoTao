import React, { useContext, useEffect, useState } from 'react'
import "./UserManage.scss"
import { UserContext } from '../../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';
import { useQuery } from 'react-query';
import RequestBlock from './RequestBlock';
import { postData } from '../../../utils/function';
import UserBlock from './UserBlock';

export default function UserManage() {
    const { apiURL, serverAPI, token } = useContext(UserContext); 
    const navigate = useNavigate()
    
    const [ department, setDepartment ] = useState([])

    const [ lecturerList, setLecturerList ] = useState({
        data: [],
        pageInformation: {
            firstPage: true,
            lastPage: true,
            numOfElement: 0,
            offset: 0,
            pageOrder: 1,
            pageSize: 20,
            totalElements: 0,
            totalPages: 0
        }
    })
    const [ request, setRequest ] = useState({
        department: "",
        departmentName: "",
        keyword: "",
        pageOrder: 1
    })

    const [currentPage, setCurrentPage] = useState(lecturerList.pageInformation.pageOrder || 1);
    console.log(lecturerList)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const fetchLecturerAPI = (api) => {
        return async () => {
            let token = document.cookie.split("; ")
            token = token.filter(element => element.includes("ACCESS_TOKEN"))[0]?.split("=")[1]

            const departmentResult = await postData(api, "/api/lecturer/getAll", token, request)
            console.log(departmentResult)
            setLecturerList(departmentResult.data)   
        }
    }

    const { dataUser , isLoadingUser, isErrorUser } = useQuery(`user-manage-search`, fetchLecturerAPI(apiURL),{
        cacheTime: 0,
        refetchOnWindowFocus: false,
    })

    if(isLoadingUser)
        return <Loader/>

    if(isErrorUser)
        navigate('/error')

    const fetchDepartmentAPI = (api) => {
        return async () => {
            let token = document.cookie.split("; ")
            token = token.filter(element => element.includes("ACCESS_TOKEN"))[0]?.split("=")[1]

            const departmentResult = await getData(api, "/api/department/getAll", token)
            console.log(departmentResult)
            setDepartment(departmentResult.data.data)   
        }
    }

    const { dataDepartment , isLoadingDepartment, isErrorDepartment} = useQuery(`user-manage-department`, fetchDepartmentAPI(apiURL),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoadingDepartment)
        return <Loader/>

    if(isErrorDepartment)
        navigate('/error')

    return (
        <div className='wrapper body-container' id='user-manage'>
            <h1 className='title'>Cập nhật thông tin giảng viên</h1>
            <RequestBlock
                request={request}
                setRequest={setRequest}
                setLecturerList={setLecturerList}
                department={department}
                setDepartment={setDepartment}
            />
            <UserBlock
                data={lecturerList}
                setState={setLecturerList}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setRequest={setRequest}
                request={request}
            />
        </div>
    )
}
