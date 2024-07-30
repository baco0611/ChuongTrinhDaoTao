import React from 'react'
import EditorHeader from '../EditorHeader/EditorHeader'
import EditorFooter from '../EditorFooter/EditorFooter'

export default function SectionB() {
    return (
        <>
            <EditorHeader
                currentSection={1}
            />
            <div style={{height: "200vh"}}>SectionB</div>
            <EditorFooter
                currentSection={1}
            />
        </>
    )
}
