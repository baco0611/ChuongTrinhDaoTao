import React, { useEffect, useState } from 'react'
import { handleChangeValue } from '../database/sectionH';

export default function SectionHElement({ element, data, PLOList, PLOSize, setState}) {
    const [ list, setList ] = useState([])
    // console.log(data)

    useEffect(() => {
        const updatedList = [];

        // Duyệt qua tất cả các loại PLO trong PLOList
        Object.values(PLOList).forEach(category => {
            Object.values(category).forEach(subCategory => {
                subCategory.data.forEach(po => {
                    // Kiểm tra xem có cặp courseId và ploId khớp hay không
                    const matchingData = data.find(item => item.courseId === element.id && item.ploId === po.id);

                    updatedList.push({
                        courseId: element.id,
                        ploId: po.id,
                        competency: matchingData ? matchingData.competency : null, // Đặt null nếu không có matchingData
                        id: matchingData ? matchingData.id ? matchingData.id : null : null,
                    });
                });
            });
        });

        setList(updatedList);
    }, [data]);
    
    return (
        <tr>
            <td className='center'>{element.index}</td>
            <td>{element.courseCode}</td>
            <td>{element.courseName}</td>
            <td className='center'>{element.creditNumber}</td>
            {
                list.map((item, index) => <td
                    key={index}
                >   
                    <input
                        type='text'
                        // readOnly
                        value={item.competency || ""}
                        data-id={item.id}
                        data-course={item.courseId}
                        data-plo={item.ploId}
                        onChange={e => handleChangeValue({
                            element: item,
                            setState,
                            e
                        })}
                    />
                </td>)
            }
        </tr>
    )
}
