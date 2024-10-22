import React from 'react'

export default function SectionHBlock({symbol, title, colSpanSize, data, idSpecialization = null}) {
    return (
        <>
        {
            symbol &&
            <tr className='block-subtitle'>
                <td className='center'>{symbol}</td>
                <td colSpan={colSpanSize}>{title}</td>
            </tr>
        }
        </>
    )
}
