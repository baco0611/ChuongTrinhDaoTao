import React, { useContext, useRef, useState } from 'react'
import SearchElement from './SearchElement'
import { handleChangeDataBox } from '../database/sectionG'
import { UserContext } from '../../../context/ContextProvider'

export default function SearchRelate({ type, data, title, setState, setOff}) {
    const [ course, setCourse ] = useState({
        courseCode: "",
        courseName: ""
    }) 

    const { apiURL, serverAPI, token } = useContext(UserContext)
    const [ isSearch, setIsSearch ] = useState(false)
    const [ searchValue, setSearchValue ] = useState([])
    const typingTimeOutRef = useRef(null)

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
        setCourse({
            courseCode: data.courseCode,
            courseName: data.courseName
        })

        setIsSearch(false)
        setSearchValue([])
    }

    const addCourseRelate = () => {
        if(course.courseCode)
            setState(prev => {
                prev[type].push(course.courseCode)
                return prev
            })

        setOff(false)
    }

    return (
        <div className='search-relate'>
            <div className='data-block'>
                <h3>Thêm học phần {title}</h3>
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
                                value={course.courseCode}
                                name='courseCode'
                                style={{width: "65%"}}
                                autoComplete='off'
                                id='courseCode'
                                onChange={e => handleChangeDataBox({
                                    e, 
                                    setState: setCourse,
                                    setIsSearch,
                                    setSearchValue,
                                    typingTimeOutRef,
                                    data: course,
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
                                value={course.courseName}
                                autoComplete='off'
                                name='courseName'
                                id='courseName'
                                onChange={e => handleChangeDataBox({
                                    e, 
                                    setState: setCourse,
                                    setIsSearch,
                                    setSearchValue,
                                    typingTimeOutRef,
                                    data: course,
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
                                setState={setCourse}
                                setIsSearch={setIsSearch}
                                setSearchValue={setSearchValue}
                                setValue={setValue}
                            />
                        }
                    </div>
                    <div className='input-row' style={{justifyContent: "center"}}>
                        <button className='save-btn' onClick={addCourseRelate}>Thêm học phần</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
