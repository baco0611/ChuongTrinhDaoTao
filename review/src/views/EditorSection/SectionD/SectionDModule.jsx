import React from 'react'
import PLOBlock from './PLOBlock'

export default function SectionDModule({ title, data, setState }) {
    const keys = Object.keys(data)
    console.log(keys)
    console.log(data)

    return (
        <div className='sectionD-module'>
            <h1 className='title'>{title}</h1>
            {
                keys.map((key, index) => {
                    return (
                        <PLOBlock
                            key={index}
                            data={data[key]}
                        />
                    )
                })
            }
        </div>
    )
}
