import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { changeDataSectionC, handleCreatePO, handleDeletePO, handleSaveChangeElement } from '../database/sectionC'
import { UserContext } from '../../../context/ContextProvider'
import { useParams } from 'react-router-dom'
import { Draggable, Droppable } from 'react-beautiful-dnd'

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

    return (
        <div className='PO-block'>
            <h1 className='title'>{title}</h1>
            <Droppable
                droppableId={data.type}
                type='PO'
            >
            {
                (provided) => (
                    <div
                        ref={provided.innerRef} 
                        {...provided.droppableProps}
                        className='table'
                    >
                        <div className='head'>
                            <div className='row'>
                                <div className='block'><p>Ký hiệu</p></div>
                                <div className='block'><p>Mục tiêu cụ thể</p></div>
                                <div className="block">
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
                                            setIsDisable,
                                            setIsDataSaved,
                                        })}
                                    >
                                        <FontAwesomeIcon icon={faSquarePlus} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='body'>
                        {
                            data.data.map((element, index) => {
                                return (
                                    <Draggable 
                                        draggableId={`drag-${data.type}-${index}`}
                                        index={index}
                                        key={index}
                                    >
                                    {
                                        provided => (
                                            <div 
                                                className='row'
                                                key={index}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                            >
                                                <div className='block'><label htmlFor={`${data.type}-${index}`}>{element.symbol}</label></div>
                                                <div className='block'>
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
                                                </div>
                                                <div className='block'> 
                                                    <button
                                                        onClick={() => handleDeletePO({
                                                            api: serverAPI,
                                                            token,
                                                            id: element.id,
                                                            setState, 
                                                            symbol: element.symbol,
                                                            typeIndex: data.typeIndex,
                                                            setIsDataSaved,
                                                        })}
                                                    >
                                                        <FontAwesomeIcon icon={faSquareMinus} />
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }
                                    </Draggable>
                                )
                            })
                        } {provided.placeholder}
                        </div>
                    </div>
                )
            }
            </Droppable>
        </div>
    )
}
