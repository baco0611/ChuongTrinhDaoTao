import React, { useContext, useEffect, useState } from 'react'
import SectionGEditBlock from './GEditBlock'
import { handleDown, handleUp } from '../database/sectionG'
import { UserContext } from '../../../context/ContextProvider'
import { useParams } from 'react-router-dom'

export default function SectionGElement({data, element, knowledgeModule, detailedKnowledgeModule, idSpecialization, setState}) {
    const { id } = useParams()
    const [ isNotEdit, setIsNotEdit ] = useState(true)
    const [ editData, setEditData ] = useState({})
    const handleEditElement = (element) => {
        setEditData(element)
        setIsNotEdit(false)
    }

    const { apiURL, serverAPI, user, token, setIsDataSaved, handleBeforeUnload } = useContext(UserContext)
    
    return (
        <tr className='cursorPointer course'>
            <td className='center'>
                {element.index}
                {
                    !isNotEdit &&
                    <SectionGEditBlock
                        knowledgeModule={knowledgeModule}
                        detailedKnowledgeModule={detailedKnowledgeModule}
                        specializationId={idSpecialization}
                        index={data.data.length + 1}
                        setIsHide={setIsNotEdit}
                        setState={setState}
                        data={editData}
                    />
                }
            </td>
            <td onDoubleClick={() => handleEditElement(element)}>{element.courseCode}</td>
            <td onDoubleClick={() => handleEditElement(element)}>{element.courseName}</td>
            <td onDoubleClick={() => handleEditElement(element)} className='input'>
                <input
                    type='checkbox'
                    readOnly
                    checked={element.mandatory}
                />
            </td>
            <td onDoubleClick={() => handleEditElement(element)} className='center'>{element.creditNumber || ""}</td>
            <td onDoubleClick={() => handleEditElement(element)} className='center'>{element.theoryHours || ""}</td>
            <td onDoubleClick={() => handleEditElement(element)} className='center'>{element.exerciseHours || ""}</td>
            <td onDoubleClick={() => handleEditElement(element)} className='center'>{element.discussionHours || ""}</td>
            <td onDoubleClick={() => handleEditElement(element)} className='center'>{element.practicalHours  || ""}</td>
            <td onDoubleClick={() => handleEditElement(element)} className='center'>{element.internshipHours  || ""}</td>
            <td onDoubleClick={() => handleEditElement(element)} className='center'>{element.testHours || ""}</td>
            <td onDoubleClick={() => handleEditElement(element)} className='center'>
            {
                element.prerequisiteCourse.map((course, index) => {
                    return <React.Fragment key={index}>{course}<br/></React.Fragment>
                })
            }</td>
            <td onDoubleClick={() => handleEditElement(element)} className='center'>
            {
                element.priorCourse.map((course, index) => {
                    return <React.Fragment key={index}>{course}<br/></React.Fragment>
                })
            }</td>
            <td onDoubleClick={() => handleEditElement(element)} className='center'>
            {
                element.concurrentCourse.map((course, index) => {
                    return <React.Fragment key={index}>{course}<br/></React.Fragment>
                })
            }</td>
            <td onDoubleClick={() => handleEditElement(element)} className='center'>{element.semester}</td>
            <td className='index-edit'>
                <div>
                    {
                        element.index != 1 &&
                        <button 
                            onDoubleClick={() => handleUp({
                                id,
                                data: data.data,
                                api: apiURL,
                                token,
                                setState,
                                index: element.index,
                                setIsDataSaved
                            })}
                        ><i className="fa-solid fa-caret-up"></i></button>
                    }
                    {
                        element.index != data.data.length &&
                        <button 
                            onDoubleClick={() => handleDown({
                                id,
                                data: data.data,
                                api: apiURL,
                                token,
                                setState,
                                index: element.index,
                                setIsDataSaved
                            })}
                        ><i className="fa-solid fa-caret-down"></i></button>
                    }
                </div>
            </td>
        </tr>
    )
}
