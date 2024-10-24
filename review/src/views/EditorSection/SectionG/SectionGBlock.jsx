import React, { useState } from 'react'
import SectionGCreateBlock from './GCreateBlock'
import SectionGEditBlock from './GEditBlock'

export default function SectionGBlock({ symbol, title, data, setState, idSpecialization = null, knowledgeModule="PROFESSIONAL", detailedKnowledgeModule = null }) {
    // console.log(data, idSpecialization)

    const [ isHide, setIsHide ] = useState(true)
    const [ isNotEdit, setIsNotEdit ] = useState(true)
    const [ editData, setEditData ] = useState({})

    const handleEditElement = (element) => {
        // console.log(1)
        setEditData(element)
        setIsNotEdit(false)
    }

    console.log(isNotEdit)
    
    return (
        <>
        {
            symbol &&
            <tr className='block-subtitle'>
                <td className='center'>{symbol}</td>
                <td colSpan={15}>
                    {title}
                    {
                        isNotEdit != true &&
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
            </tr>
        }
        {
            data &&
            data.data.map((element, index) => {
                return <tr key={index}>
                    <td onClick={() => handleEditElement(element)} className='center'>
                        {element.index}
                    </td>
                    <td onClick={() => handleEditElement(element)}>{element.courseCode}</td>
                    <td onClick={() => handleEditElement(element)}>{element.courseName}</td>
                    <td onClick={() => handleEditElement(element)} className='input'>
                        <input
                            type='checkbox'
                            readOnly
                            checked={element.mandatory}
                        />
                    </td>
                    <td onClick={() => handleEditElement(element)} className='center'>{element.creditNumber || ""}</td>
                    <td onClick={() => handleEditElement(element)} className='center'>{element.theoryHours || ""}</td>
                    <td onClick={() => handleEditElement(element)} className='center'>{element.exerciseHours || ""}</td>
                    <td onClick={() => handleEditElement(element)} className='center'>{element.discussionHours || ""}</td>
                    <td onClick={() => handleEditElement(element)} className='center'>{element.practicalHours  || ""}</td>
                    <td onClick={() => handleEditElement(element)} className='center'>{element.internshipHours  || ""}</td>
                    <td onClick={() => handleEditElement(element)} className='center'>{element.testHours || ""}</td>
                    <td onClick={() => handleEditElement(element)} className='center'>{
                        element.prerequisiteCourse.map((course, index) => {
                            return <React.Fragment key={index}>{course}<br/></React.Fragment>
                        })
                    }</td>
                    <td onClick={() => handleEditElement(element)} className='center'>{
                        element.priorCourse.map((course, index) => {
                            return <React.Fragment key={index}>{course}<br/></React.Fragment>
                        })
                    }</td>
                    <td onClick={() => handleEditElement(element)} className='center'>{
                        element.concurrentCourse.map((course, index) => {
                            return <React.Fragment key={index}>{course}<br/></React.Fragment>
                        })
                    }</td>
                    <td onClick={() => handleEditElement(element)} className='center'>{element.semester}</td>
                    <td className='index-edit'>
                        <div>
                            <button 
                                // onClick={handleUp}
                            ><i className="fa-solid fa-caret-up"></i></button>
                            <button 
                                // onClick={handleDown}
                            ><i className="fa-solid fa-caret-down"></i></button>
                        </div>
                    </td>
                </tr>
            })
        }
            <tr className='add-btn'>
                <td colSpan={16}>
                    <button onClick={() => setIsHide(false)}>Thêm học phần</button>
                    {
                        //!isHide && !symbol &&
                        !isHide &&
                        <SectionGCreateBlock
                            knowledgeModule={knowledgeModule}
                            detailedKnowledgeModule={detailedKnowledgeModule}
                            specializationId={idSpecialization}
                            index={data.data.length + 1}
                            setIsHide={setIsHide}
                            setState={setState}
                        />
                    }
                </td>
            </tr>
        </>
    )
}
