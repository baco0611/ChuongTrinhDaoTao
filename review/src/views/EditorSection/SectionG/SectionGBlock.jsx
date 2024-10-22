import React from 'react'

export default function SectionGBlock({ symbol, title, data, setState, idSpecialization = null }) {
    console.log(data, idSpecialization)
    
    return (
        <>
        {
            symbol &&
            <tr className='block-subtitle'>
                <td className='center'>{symbol}</td>
                <td colSpan={15}>{title}</td>
            </tr>
        }
        {
            data &&
            data.data.map((element, index) => {
                return <tr key={index}>
                    <td className='center'>{element.index}</td>
                    <td>{element.courseCode}</td>
                    <td>{element.courseName}</td>
                    <td className='input'>
                        <input
                            type='checkbox'
                            readOnly
                            checked={element.mandatory}
                        />
                    </td>
                    <td className='center'>{element.creditNumber || ""}</td>
                    <td className='center'>{element.theoryHours || ""}</td>
                    <td className='center'>{element.exerciseHours || ""}</td>
                    <td className='center'>{element.discussionHours || ""}</td>
                    <td className='center'>{element.practicalHours  || ""}</td>
                    <td className='center'>{element.internshipHours  || ""}</td>
                    <td className='center'>{element.testHours || ""}</td>
                    <td className='center'>{
                        element.prerequisiteCourse.map((course, index) => {
                            return <React.Fragment key={index}>{course}<br/></React.Fragment>
                        })
                    }</td>
                    <td className='center'>{
                        element.priorCourse.map((course, index) => {
                            return <React.Fragment key={index}>{course}<br/></React.Fragment>
                        })
                    }</td>
                    <td className='center'>{
                        element.concurrentCourse.map((course, index) => {
                            return <React.Fragment key={index}>{course}<br/></React.Fragment>
                        })
                    }</td>
                    <td className='center'>{element.semester}</td>
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
                    <button>Thêm học phần</button>
                </td>
            </tr>
        </>
    )
}
