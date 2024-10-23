import React from 'react'

export default function SearchElement({data, setState, setIsSearch, setSearchValue}) {
    const setValue = (data) => {
        setState(prev => ({
            ...prev,
            courseOutlineId: data.courseOutlineId,
            courseCode: data.courseCode,
            courseName: data.courseName
        }))

        setSearchValue([])

        setIsSearch(false)
    }
    
    return (
        <ul className='search-value'>
        {
            data.map((element, index) => <li 
                key={index}
                onClick={() => setValue(element)}
            >
                <p>{element.courseName}</p>
                <p>{element.courseCode}</p>
            </li>)
        }
        </ul>
    )
}
