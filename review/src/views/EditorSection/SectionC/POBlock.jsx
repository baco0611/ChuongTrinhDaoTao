import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { changeDataSectionC } from '../database/sectionC'
import { UserContext } from '../../../context/ContextProvider'

export default function POBlock({ title, data, setState }) {

    const { setIsDataSaved } = useContext(UserContext)

    useEffect(() => {
        const elements = document.querySelectorAll('textarea')

        elements.forEach(item => {
            item.style.height = 'auto'
            item.style.height = `${item.scrollHeight}px`
        })
    })

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
                                // onClick={() => handleClickAddC({ idCTDT, type: data.type, typeIndex: data.typeIndex, setState })}
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
                                    />
                                </td>
                                <td> 
                                    <button>
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
