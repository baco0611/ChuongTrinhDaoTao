import React from 'react'
import EditorHeader from '../EditorHeader/EditorHeader'

export default function SectionB() {
    return (
        <>
            <EditorHeader
                currentSection={1}
            />
            <div style={{height: "200vh"}}>SectionB</div>
        </>
    )
}
