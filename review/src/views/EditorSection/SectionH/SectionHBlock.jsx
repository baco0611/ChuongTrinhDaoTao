import React from 'react'
import SectionHElement from './SectionHElement'

export default function SectionHBlock({symbol, title, colSpanSize, setState, data, courseData, PLOList}) {
    return (
        <>
        {
            symbol &&
            <tr className='block-subtitle'>
                <td className='center'>{symbol}</td>
                <td colSpan={colSpanSize}>{title}</td>
            </tr>
        }
        {
            courseData &&
            courseData.data.map((element, index) => {
                return <SectionHElement
                    key={index}
                    element={element}
                    data={data}
                    PLOList={PLOList}
                    PLOSize={colSpanSize - 3}
                    setState={setState}
                />
            })
        }
        </>
    )
}
