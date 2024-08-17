import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import EditorHeader from '../../views/EditorSection/EditorHeader/EditorHeader'

export default function EditProgramLayout() {
    const id = useLocation().pathname.split("/").pop()

    useEffect(() => {
        // Khi unmount khỏi EditProgram thì sẽ xóa hết dữ liệu trong session Storage tránh lãng phí bộ nhớ
        return () => {
            let keys = Object.keys(sessionStorage);
            
            keys = keys.filter(key => key.includes(`${id}`))
            
            keys.forEach(key => sessionStorage.removeItem(key))
        }
    }, [])

    return (
        <>
            <Outlet/>
        </>
    )
}
