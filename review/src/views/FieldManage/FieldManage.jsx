import React, { useContext, useEffect, useState } from 'react'
import "./FieldManage.scss"
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../context/ContextProvider'
import { useQuery } from 'react-query'
import Loader from '../../components/Loader/Loader'
import Cookies from "js-cookie"
import { changeValueButton, changeValueInput, createField, deleteField, getFieldManageData, updateField } from './field-function'

export default function FieldManage() {
    const navigate = useNavigate()

    const { user, apiURL, token, serverAPI, isDataSaved, setIsDataSaved, handleBeforeUnload } = useContext(UserContext)

    const [ fieldValue, setFieldValue ] = useState([])
    const [ department, setDepartment ] = useState([])

    const [ oldElement, setOldElement ] = useState(null)

    useEffect(() => {
        // Thêm event listener khi component được mount
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Dọn dẹp event listener khi component bị unmount
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDataSaved])

    const fetchAPI = (id) => {
        const token = Cookies.get("ACCESS_TOKEN")

        return async () => {
            return await getFieldManageData({
                api: apiURL,
                token,
                setFieldValue, 
                setIsDataSaved,
                setDepartment
            })
        }
    }

    const { data , isLoading, isError} = useQuery(`field`, fetchAPI(),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    return (
        <div id='field-manage' className='wrapper body-container'>
            <h1 className='title'>Quản lý ngành đào tạo</h1>
            <table className='field-main'>
                <thead>
                    <tr>
                        <th className='center' style={{width: "10%"}}>STT</th>
                        <th className='center' style={{width: "20%"}}>Mã ngành</th>
                        <th className='center' style={{width: "35%"}}>Tên ngành đào tạo</th>
                        <th className='center' style={{width: "30%"}}>Khoa quản lý</th>
                        <th className='center' style={{width: "5%"}}></th>
                    </tr>
                </thead>
                <tbody>
                {
                    fieldValue.map((element, index) => {
                        return <tr 
                            key={index}
                            onClick={() => setOldElement(element)}
                        >
                            <td className='center'>{index + 1}</td>
                            <td>
                                <input
                                    value={element.fieldCode}
                                    name='fieldCode'
                                    autoComplete='off'
                                    onChange={e => changeValueInput({e, setState: setFieldValue, id: element.id})}
                                    onBlur={() => updateField({
                                        api: apiURL,
                                        token,
                                        setIsDataSaved,
                                        data: element,
                                        oldElement,
                                        setFieldValue
                                    })}
                                />
                            </td>
                            <td>
                                <input
                                    value={element.fieldName}
                                    name='fieldName'
                                    autoComplete='off'
                                    onChange={e => changeValueInput({e, setState: setFieldValue, id: element.id})}
                                    onBlur={() => updateField({
                                        api: apiURL,
                                        token,
                                        setIsDataSaved,
                                        data: element,
                                        setFieldValue
                                    })}
                                />
                            </td>
                            <td>
                                <div className="dropdown">
                                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {element.departmentName || "-----"}
                                    </button>
                                    <ul className="dropdown-menu">
                                        {
                                            department.map((item, index) => {
                                                return <li 
                                                    className="dropdown-item cursorPointer" 
                                                    key={index}
                                                    onClick={() => changeValueButton({
                                                        api: apiURL,
                                                        token,
                                                        id: element.id,
                                                        data: element,
                                                        setFieldValue, 
                                                        setIsDataSaved,
                                                        department: item
                                                    })}
                                                >{item.departmentName}</li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </td>
                            <td>
                                <button 
                                    className='delete-btn form-btn'
                                    // onClick={() => deleteField({
                                    //     api: apiURL, 
                                    //     token,
                                    //     data: element,
                                    //     setFieldValue,
                                    //     setIsDataSaved
                                    // })}
                                >
                                    <i className="iconoir-minus-square"></i>
                                </button>
                            </td>
                        </tr>
                    })
                }
                    <tr>
                        <td colSpan={5}>
                            <button 
                                className='add-btn form-btn'
                                onClick={() => createField({
                                    api: apiURL,
                                    token,
                                    setFieldValue,
                                    setIsDataSaved
                                })}
                            >Thêm điều kiện tốt nghiệp</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
