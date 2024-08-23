import React from 'react'

export default function PLOBlock({ data }) {
    console.log(data)

    return (
        <div className='PLO-block'>
            <h2>{data.typeIndex}. {data.title}</h2>
            <div style={{background: "black", height: "700px"}}></div>
        </div>
    )
}
