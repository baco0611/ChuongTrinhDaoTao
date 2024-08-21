import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { changeDataSectionC, handleCreatePO, handleDeletePO, handleSaveChangeElement, handleSaveChangeSectionC } from '../database/sectionC'
import { UserContext } from '../../../context/ContextProvider'
import { useParams } from 'react-router-dom'

export default function POBlock({ title, data, setState }) {

    const { setIsDataSaved, serverAPI, apiURL, token } = useContext(UserContext)
    const { id } = useParams()
    const [ isDisable, setIsDisable ] = useState(false)

    useEffect(() => {
        const elements = document.querySelectorAll('textarea')

        elements.forEach(item => {
            item.style.height = 'auto'
            item.style.height = `${item.scrollHeight}px`
        })
    })

    console.log(isDisable)

    return (
        <div className='PO-block'>
            <h1 className='title'>{title}</h1>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: "15%" }}>Ký hiệu</th>
                        <th style={{ width: "75%" }}>Mục tiêu cụ thể</th>
                        <th style={{ width: "10%" }}>
                            <button
                                disabled={isDisable}
                                onClick={() => handleCreatePO({
                                    api: serverAPI,
                                    token,
                                    numOfElement: data.data.length,
                                    type: data.type,
                                    typeIndex: data.typeIndex,
                                    programId: id,
                                    setState,
                                    setIsDisable
                                })}
                            >
                                <FontAwesomeIcon icon={faSquarePlus} />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.data.map((element, index) => {
                        return (
                            <tr key={index}>
                                <td><label htmlFor={`${data.type}-${index}`}>{element.symbol}</label></td>
                                <td>
                                    <textarea
                                        id={`${data.type}-${index}`}
                                        value={element.content}
                                        onChange={(e) => changeDataSectionC({ 
                                            e, 
                                            id: element.id,
                                            type: element.type, 
                                            setState, 
                                            setIsDataSaved,
                                        })}
                                        onBlur={() => handleSaveChangeElement({
                                            api: serverAPI,
                                            id: element.id,
                                            token,
                                            content: element.content,
                                            setIsDataSaved
                                        })}
                                    />
                                </td>
                                <td> 
                                    <button
                                        onClick={() => handleDeletePO({
                                            api: serverAPI,
                                            token,
                                            id: element.id,
                                            setState, 
                                            symbol: element.symbol
                                        })}
                                    >
                                        <FontAwesomeIcon icon={faSquareMinus} />
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}
