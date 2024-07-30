import React from 'react'
import { Outlet } from 'react-router-dom'
import EditorHeader from '../../views/EditorSection/EditorHeader/EditorHeader'

export default function EditProgramLayout() {
    return (
        <>
            <Outlet/>
        </>
    )
}
