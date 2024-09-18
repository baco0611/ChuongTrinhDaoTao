import React, { useContext, useEffect, useState } from 'react'
import "./Responsibility.scss"
import { useQuery } from 'react-query'
import Loader from '../../../components/Loader/Loader'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/ContextProvider';
import { getData } from "../../../utils/function"
import ResponseBlock from './ResponseBlock';

export default function Responsibility() {

    const { apiURL, fakeAPI, token, serverAPI, isDataSaved, handleBeforeUnload } = useContext(UserContext); 
    const navigate = useNavigate()
    const [ responsibilityList, setResponsibilityList ] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        // Thêm event listener khi component được mount
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Dọn dẹp event listener khi component bị unmount
        return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDataSaved])

    const fetchLecturerAPI = (api) => {        
        return async () => {
            let token = document.cookie.split("; ")
            token = token.filter(element => element.includes("ACCESS_TOKEN"))[0]?.split("=")[1]

            const result = await getData(api, "/responsibility", token)
            setResponsibilityList(result.data.data)
        }
    }

    const { data , isLoading, isError } = useQuery(`lecturer-search`, fetchLecturerAPI(serverAPI),{
        cacheTime: 0,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')


    console.log(responsibilityList)
    return (
        <div className='wrapper body-container' id='responsibility'>
            <h1>Phân công phụ trách</h1>
            <table>
                <thead>
                    <tr>
                        <th className='center' style={{ width: "6%" }}>STT</th>
                        <th className='center' style={{ width: "47%" }}>Tên đơn vị</th>
                        <th className='center' style={{ width: "47%" }}>Giảng viên phụ trách</th>
                    </tr>
                </thead>
                <tbody>
                {
                    responsibilityList.map((element, index) => {
                        return <ResponseBlock
                            key={index}
                            data={element}
                            setState={setResponsibilityList}
                            index={index + 1}
                        />
                    })   
                }
                </tbody>
            </table>
        </div>
    )
}
