import "./SectionA.scss"
import EditorHeader from '../EditorHeader/EditorHeader'
import { useEffect } from "react"
import EditorFooter from "../EditorFooter/EditorFooter"

export default function SectionA() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])



    return (
        <>
            <EditorHeader
                currentSection={0}
            />
            <div>SectionA</div>
            <EditorFooter
                currentSection={0}
            />
        </>
    )
}
