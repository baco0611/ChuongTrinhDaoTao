import React, { useContext, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { deleteCourse, handleChangeDataBox, saveCourse, updateCourse } from '../database/sectionG'
import { getParentElementByClass } from '../../../utils/function'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import SearchElement from './SearchElement'
import { UserContext } from '../../../context/ContextProvider'
import SearchRelate from './SearchRelate'

export default function SectionGEditBlock({ knowledgeModule, 
    detailedKnowledgeModule, specializationId, index, setIsHide, setState, data }) {
    const { id } = useParams()
    const { apiURL, serverAPI, token, setIsDataSaved } = useContext(UserContext)
    
    const [ courseDetail, setCourseDetail ] = useState(data)

    const [ isSearch, setIsSearch ] = useState(false)
    const [ searchValue, setSearchValue ] = useState([])
    const [ isPrerequisiteHidden, setIsPrerequisiteHidden ] = useState(false)
    const [ isPriorHidden, setIsPriorHidden ] = useState(false)
    const [ isConcurrentHidden, setIsConcurrentHidden ] = useState(false)
    const typingTimeOutRef = useRef(null)


    console.log(data)
    const handleClose = e => {
        const parent = getParentElementByClass(e.target, "data-block")

        if(!parent)
            setIsHide(true)
    }

    const setOffSearch = (e) => {
        if(e.target.tagName === 'INPUT')
            return

        const parent = getParentElementByClass(e.target, "search-value")

        if(!parent) {
            setIsSearch(false)
            setSearchValue([])
        }
    }

    const setValue = (data) => {
        // console.log(data)
        setCourseDetail(prev => ({
            ...prev,
            courseOutlineId: data.courseOutlineId,
            courseCode: data.courseCode,
            courseName: data.courseName
        }))

        setSearchValue([])

        setIsSearch(false)
    }

    const deleteCourseRelate = (type, value) => {
        const result = courseDetail[type].filter(element => element != value)

        setCourseDetail(prev => ({
            ...prev,
            [type]: result
        }))
    }

    return (
        <div 
            className='sectionG-data-box'
            onClick={handleClose}
        >
            <div className='data-block'
                onClick={setOffSearch}
            >
                <FontAwesomeIcon icon={faXmark} onClick={() => setIsHide(true)}/>
                <h3>Sửa học phần</h3>
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
                                    typingTimeOutRef,
                                    data: courseDetail,
                                    api: apiURL,
                                    token,
                                })}
                                onFocus={() => setIsSearch(true)}
                                onBlur={setOffSearch}
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
                                onChange={e => handleChangeDataBox({
                                    e, 
                                    setState: setCourseDetail,
                                    setIsSearch,
                                    setSearchValue,
                                    typingTimeOutRef,
                                    data: courseDetail,
                                    api: apiURL,
                                    token,
                                })}
                                onFocus={() => setIsSearch(true)}
                                onBlur={setOffSearch}
                            />
                        </div>
                        {
                            isSearch &&
                            <SearchElement
                                data={searchValue}
                                setState={setCourseDetail}
                                setIsSearch={setIsSearch}
                                setSearchValue={setSearchValue}
                                setValue={setValue}
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
                                    return <li 
                                        key={index}
                                        onDoubleClick={() => deleteCourseRelate("prerequisiteCourse", element)}
                                    >{element}</li>
                                })
                            }
                                <li>
                                    <button onClick={() => setIsPrerequisiteHidden(true)}>Thêm học phần</button>
                                    {
                                        isPrerequisiteHidden && 
                                        <SearchRelate
                                            type="prerequisiteCourse"
                                            title="tiên quyết"
                                            setState={setCourseDetail}
                                            setOff={setIsPrerequisiteHidden}
                                        />
                                    }
                                </li>
                            </ul>
                        </div>
                        <div className='course-list'>
                            <h4>Học trước</h4>
                            <ul>
                            {
                                courseDetail.priorCourse.map((element, index) => {
                                    return <li 
                                        key={index}
                                        onDoubleClick={() => deleteCourseRelate("priorCourse", element)}
                                    >{element}</li>
                                })
                            }
                                <li>
                                    <button onClick={() => setIsPriorHidden(true)}>Thêm học phần</button>
                                    {
                                        isPriorHidden && 
                                        <SearchRelate
                                            type="priorCourse"
                                            title="học trước"
                                            setState={setCourseDetail}
                                            setOff={setIsPriorHidden}
                                        />
                                    }
                                </li>
                            </ul>
                        </div>
                        <div className='course-list'>
                            <h4>Song hành</h4>
                            <ul>
                            {
                                courseDetail.concurrentCourse.map((element, index) => {
                                    return <li 
                                        key={index}
                                        onDoubleClick={() => deleteCourseRelate("concurrentCourse", element)}
                                    >{element}</li>
                                })
                            }
                                <li>
                                    <button onClick={() => setIsConcurrentHidden(true)}>Thêm học phần</button>
                                    {
                                        isConcurrentHidden && 
                                        <SearchRelate
                                            type="concurrentCourse"
                                            title="song hành"
                                            setState={setCourseDetail}
                                            setOff={setIsConcurrentHidden}
                                        />
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='input-row' style={{justifyContent: "center"}}>
                        <p>Nháy đôi (double click) vào mã học phần mà bạn muốn xóa</p>
                    </div>
                    <div className='input-row' style={{justifyContent: "center", gap: "15px"}}>
                        <button
                            className='off-btn'
                            onClick={() => deleteCourse({
                                id,
                                api: apiURL,
                                token,
                                data: courseDetail,
                                setIsHide,
                                setIsDataSaved,
                                setState
                            })}
                        >Xóa học phần</button>
                        <button 
                            className='save-btn'
                            onClick={() => updateCourse({
                                id,
                                api: apiURL,
                                token,
                                data: courseDetail,
                                setIsHide,
                                setIsDataSaved,
                                setState
                            })}
                        >Lưu chỉnh sửa</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
