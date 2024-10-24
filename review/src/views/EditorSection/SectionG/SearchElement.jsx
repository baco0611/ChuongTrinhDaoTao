import React from 'react'

export default function SearchElement({data, setValue}) {
   
    
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
