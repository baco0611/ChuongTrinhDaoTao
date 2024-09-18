import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { changeDataSectionD, handleCreatePLO, handleDeletePLO, handleSaveChangeElement } from '../database/sectionD'
import { UserContext } from '../../../context/ContextProvider'
import { Draggable, Droppable } from 'react-beautiful-dnd'

export default function PLOBlock({ data, setState }) {
    const { setIsDataSaved, serverAPI, apiURL, token } = useContext(UserContext)
    const [ isDisable, setIsDisable ] = useState(false)
    const { id } = useParams()
    // console.log(data)

    useEffect(() => {
        const elements = document.querySelectorAll('textarea[name="content"]')

        elements.forEach(item => {
            item.style.height = 'auto'
            item.style.height = `${item.scrollHeight}px`
        })
    })

    return (
        <Droppable
            droppableId={`${data.type}/${data.typeDetail}`}
            type="PLO"
        >
        {
            provider => (
                <div 
                    className='PLO-block'
                    ref={provider.innerRef}
                    {...provider.droppableProps}
                >
                    <h2>{data.typeIndex}. {data.title} </h2>
                    <div
                        className='table'
                    >
                        <div className='head'>
                            <div className='row'>
                                <div className='block'><p>Ký hiệu</p></div>
                                <div className='block'><p>Chủ đề chuẩn đầu ra</p></div>
                                <div className='block'><p>Thang đánh giá năng lực</p></div>
                                <div className='block'>
                                <button
                                        disabled={isDisable}
                                        onClick={() => handleCreatePLO({
                                            api: apiURL,
                                            token,
                                            numOfElement: data.data.length,
                                            type: data.type,
                                            typeDetail: data.typeDetail,
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
                                {/* console.log(element) */}
                                return (
                                    <Draggable
                                        draggableId={`drag-${data.typeDetail}-${index}`}
                                        index={index}
                                        key={index}
                                    >
                                    {
                                        provided => (
                                            <div 
                                                className='row'
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                            >
                                                <div className='block'><label htmlFor={`${data.type}-${index}`}>{element.symbol}</label></div>
                                                <div className='block'>
                                                    <textarea
                                                        id={`${data.type}-${index}`}
                                                        name='content'
                                                        value={element.content || ""}
                                                        onChange={(e) => changeDataSectionD({ 
                                                            e, 
                                                            id: element.id,
                                                            type: element.type, 
                                                            typeDetail: element.typeDetail,
                                                            setState, 
                                                            setIsDataSaved,
                                                        })}
                                                        onBlur={() => handleSaveChangeElement({
                                                            api: serverAPI,
                                                            id: element.id,
                                                            token,
                                                            content: element.content,
                                                            competency: element.competency,
                                                            setIsDataSaved
                                                        })}
                                                    />
                                                </div>
                                                <div className='block'>
                                                    <textarea
                                                        value={element.competency || ""}
                                                        name='competency'
                                                        style={{height: "100%"}}
                                                        onChange={(e) => changeDataSectionD({ 
                                                            e, 
                                                            id: element.id,
                                                            type: element.type, 
                                                            typeDetail: element.typeDetail,
                                                            setState, 
                                                            setIsDataSaved,
                                                        })}
                                                        onBlur={() => handleSaveChangeElement({
                                                            api: serverAPI,
                                                            id: element.id,
                                                            token,
                                                            content: element.content,
                                                            competency: element.competency,
                                                            setIsDataSaved
                                                        })}
                                                    />
                                                </div>
                                                <div className='block'> 
                                                    <button
                                                        onClick={() => handleDeletePLO({
                                                            api: serverAPI,
                                                            token,
                                                            id: element.id,
                                                            setState, 
                                                            symbol: element.symbol,
                                                            type: element.type,
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
                        }
                        </div>
                    </div>
                    {provider.placeholder}
                </div>
            )
        }

        </Droppable>
    )
}
