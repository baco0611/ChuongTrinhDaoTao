import React, { useContext, useEffect } from 'react'
import EditorHeader from '../EditorHeader/EditorHeader'
import EditorFooter from '../EditorFooter/EditorFooter'
import "./SectionD.scss"
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../../context/ContextProvider'

export default function SectionD() {

    const { id } = useParams()
    const currentId = id
    const navigate = useNavigate()

    const { user, token, isDataSaved, setIsDataSaved, handleBeforeUnload } = useContext(UserContext)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        // Thêm event listener khi component được mount
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Dọn dẹp event listener khi component bị unmount
        return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDataSaved])

    return (
        <>
            <EditorHeader
                currentSection={3}
            />
            <div id="sectionD" className="wrapper editor-section">
            
            </div>
            <EditorFooter
                currentSection={3}
            />
        </>
    )
}
