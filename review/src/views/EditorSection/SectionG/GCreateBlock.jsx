import React, { useState } from 'react'

export default function SectionGCreateBlock() {
    const [ courseDetail, setCourseDetail ] = useState({
        "programId": 1,
        "courseOutlineId": 512,
        "index": 13,
        "mandatory": true,
        "prerequisiteCourse": [],
        "priorCourse": [],
        "concurrentCourse": [],
        "knowledgeModule": "GENERAL",
        "detailedKnowledgeModule": "",
        "specializationId": null,
        "replacesThesis": false,
        "semester": 1
    })

    return (
        <div className='sectionG-create'>
            <div className='create-block'>
                <h3>Thêm học phần</h3>

                <div className='row'>
                    <div className='input-block'>
                        <label>Mã học phần</label>
                        <input
                            
                        />
                    </div>
                    <div className='input-block'>
                        <label>Tên học phần</label>
                        <input

                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
