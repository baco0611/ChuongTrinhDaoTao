import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { handleChangeDataBox } from '../database/sectionG'
import { getParentElementByClass } from '../../../utils/function'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import SearchElement from './SearchElement'

export default function SectionGCreateBlock({ knowledgeModule, detailedKnowledgeModule, specializationId, index, setIsHide }) {
    const { id } = useParams()
    
    const [ courseDetail, setCourseDetail ] = useState({
        programId: id,
        courseOutlineId: "",
        index,
        mandatory: false,
        prerequisiteCourse: [],
        priorCourse: [],
        concurrentCourse: [],
        knowledgeModule,
        detailedKnowledgeModule,
        specializationId,
        replacesThesis: detailedKnowledgeModule == "THESIS_PROJECT" && specializationId!=null,
        semester: 0,
        courseCode: "",
        courseName: ""
    })

    const [ isSearch, setIsSearch ] = useState(false)
    const [ searchValue, setSearchValue ] = useState([])
    const typingTimeOutRef = useRef(null)
    // console.log(courseDetail)

    const handleClose = e => {
        const parent = getParentElementByClass(e.target, "data-block")

        if(!parent)
            setIsHide(true)
    }

    return (
        <div 
            className='sectionG-data-box'
            onClick={handleClose}
        >
            <div className='data-block'>
                <FontAwesomeIcon icon={faXmark} onClick={() => setIsHide(true)}/>
                <h3>Thêm học phần</h3>
                <div className='form'> 
                    <div className='input-row'>
                        <div 
                            className='input-block'
                            style={{width: "35%"}}
                        >
                            <label
                                htmlFor='courseCode'
                            >Mã học phần</label>
                            <input
                                type='text'
                                value={courseDetail.courseCode}
                                name='courseCode'
                                style={{width: "65%"}}
                                autoComplete='off'
                                id='courseCode'
                                onChange={e => handleChangeDataBox({
                                    e, 
                                    setState: setCourseDetail,
                                    setIsSearch,
                                    setSearchValue,
                                    typingTimeOutRef
                                })}
                            />
                        </div>
                        <div 
                            className='input-block'
                            style={{width: "60%"}}
                        >
                            <label
                                htmlFor='courseName'
                            >Tên học phần</label>
                            <input
                                type='text'
                                value={courseDetail.courseName}
                                autoComplete='off'
                                name='courseName'
                                id='courseName'
                                onChange={e => handleChangeDataBox({e, setState: setCourseDetail})}
                            />
                        </div>
                        {
                            isSearch &&
                            <SearchElement
                                data={searchValue}
                                setState={setCourseDetail}
                                setIsSearch={setIsSearch}
                                setSearchValue={setSearchValue}
                            />
                        }
                    </div>
                    <div className='input-row'>
                        <div className='input-block'>
                            <label>Bắt buộc</label>
                            <input
                                type='checkbox'
                                name='mandatory'
                                checked={courseDetail.mandatory}
                                onChange={e => handleChangeDataBox({e, setState: setCourseDetail})}
                            />
                        </div>
                        <div className='input-block'>
                            <label>Thay thế khóa luận</label>
                            <input
                                type='checkbox'
                                name='replacesThesis'
                                readOnly
                                checked={courseDetail.replacesThesis}
                                // onChange={e => handleChangeDataBox({e, setState: setCourseDetail})}
                            />
                        </div>

                        <div 
                            className='input-block'
                            style={{width: "30%"}}
                        >
                            <label
                                htmlFor='semester'
                            >Học kì</label>
                            <input
                                type='text'
                                value={courseDetail.semester}
                                autoComplete='off'
                                name='semester'
                                id='semester'
                                onChange={e => handleChangeDataBox({e, setState: setCourseDetail, id})}
                            />
                        </div>
                    </div>
                    <div className='input-row input-flex-start'>
                        <div className='course-list'>
                            <h4>Tiên quyết</h4>
                            <ul>
                            {
                                courseDetail.prerequisiteCourse.map((element, index) => {
                                    return <li key={index}>{element}</li>
                                })
                            }
                                <li>
                                    <button>Thêm học phần</button>
                                </li>
                            </ul>
                        </div>
                        <div className='course-list'>
                            <h4>Học trước</h4>
                            <ul>
                            {
                                courseDetail.priorCourse.map((element, index) => {
                                    return <li key={index}>{element}</li>
                                })
                            }
                                <li>
                                    <button>Thêm học phần</button>
                                </li>
                            </ul>
                        </div>
                        <div className='course-list'>
                            <h4>Song hành</h4>
                            <ul>
                            {
                                courseDetail.concurrentCourse.map((element, index) => {
                                    return <li key={index}>{element}</li>
                                })
                            }
                                <li>
                                    <button>Thêm học phần</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='input-row' style={{justifyContent: "center"}}>
                        <button className='save-btn'>Lưu học phần</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
