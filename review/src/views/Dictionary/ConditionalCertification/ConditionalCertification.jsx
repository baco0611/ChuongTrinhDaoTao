import React, { useContext, useEffect, useState } from 'react'
import "../Dictionary.scss"
import { UserContext } from '../../../context/ContextProvider'
import { createDictionary, deleteDictionary, getDataDictionary, handleChangeValue, updateDictionary } from '../dictionary'
import { useQuery } from 'react-query'
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/Loader/Loader'

export default function ConditionalCertification() {
    const navigate = useNavigate()
    const { user, token, isDataSaved, setIsDataSaved, apiURL, serverAPI, handleBeforeUnload } = useContext(UserContext)
    const [ dataDictionary, setDataDictionary ] = useState([])
    const [ isDisable, setIsDisable ] = useState(false)

    // Scroll lên đầu trang mỗi khi mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // Chặn hành động refresh hay tắt trang khi dữ liệu chưa được lưu
    useEffect(() => {
        // Thêm event listener khi component được mount
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Dọn dẹp event listener khi component bị unmount
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDataSaved])

    // Lấy dữ liệu từ db
    const fetchAPI = () => {
        const token = Cookies.get("ACCESS_TOKEN")

        return async () => {
            return await getDataDictionary({
                api: serverAPI,
                url: "/certification",
                token,
                setState: setDataDictionary,
                setIsDataSaved
            })
        }
    }

    const { data , isLoading, isError} = useQuery(`certification`, fetchAPI(),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    return (
        <div id='dictionary-section' className='wrapper body-container dictionary-section'>
            <div className='title'>
                <h1>Chứng chỉ điều kiện</h1>
            </div>
            <table className='content'>
                <thead>
                    <tr>
                        <th className='center' style={{width: "10%"}}>STT</th>
                        <th className='center' style={{width: "80%"}}>Chứng chỉ điều kiện</th>
                        <th className='center' style={{width: "10%"}}></th>
                    </tr>
                </thead>
                <tbody>
                {
                    dataDictionary.length == 0
                    &&
                    <tr>
                        <td style={{textAlign: "center"}} colSpan={3}>Chưa có chứng chỉ điều kiện nào</td>
                    </tr>
                    ||
                    dataDictionary.map((element, index) => {
                        return (
                            <tr key={index}>
                                <td className='center'>{index + 1}</td>
                                <td>
                                    <input
                                        value={element.content}
                                        onChange={(e) => handleChangeValue({ 
                                            e, 
                                            id: element.id, 
                                            setIsDataSaved, 
                                            setState: setDataDictionary
                                        })}
                                        onBlur={() => updateDictionary({
                                            data: element,
                                            api: serverAPI,
                                            url: "/certification/update",
                                            token,
                                            setIsDataSaved,
                                        })}
                                    />
                                </td>
                                <td>
                                    <button 
                                        className='delete-btn'
                                        onClick={() => deleteDictionary({
                                            api: serverAPI,
                                            url: "/delete-certification",
                                            token,
                                            setState: setDataDictionary,
                                            id: element.id,
                                            index
                                        })}
                                    >
                                        <i className="iconoir-minus-square"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
                    <tr>
                        <td colSpan={3}>
                            <button 
                                className='add-btn'
                                disabled={isDisable}
                                onClick={() => createDictionary({
                                    api: serverAPI,
                                    url: "/create-certification",
                                    token,
                                    setState: setDataDictionary,
                                    setIsDisable
                                })}
                            >Thêm chứng chỉ điều kiện</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
