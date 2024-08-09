import React from 'react'
import { Outlet } from 'react-router-dom'
import EditorHeader from '../../views/EditorSection/EditorHeader/EditorHeader'

export default function EditProgramLayout() {
    // Check user có được edit không ở header nha ^^

    return (
        <>
            <Outlet/>
        </>
    )
}
