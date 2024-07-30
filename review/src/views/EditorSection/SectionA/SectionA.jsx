import React from 'react'
import EditHeader from '../../../../../frontend/src/views/EditorSection/EditHeader/EditHeader'
import EditorHeader from '../EditorHeader/EditorHeader'

export default function SectionA() {
    return (
        <>
            <EditorHeader
                currentSection={0}
            />
            <div style={{height: "200vh"}}>SectionA</div>
        </>
    )
}
