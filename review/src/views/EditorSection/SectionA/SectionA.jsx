import "./SectionA.scss"
import "../EditorSection.scss"
import EditorHeader from '../EditorHeader/EditorHeader'
import { useContext, useEffect, useState } from "react"
import EditorFooter from "../EditorFooter/EditorFooter"
import { UserContext } from "../../../context/ContextProvider"

export default function SectionA() {

    const { user, token, isDataSaved, setIsDataSaved, handleBeforeUnload } = useContext(UserContext)

    const [ sectionAValue, setSectionAValue ] = useState({
        vietnameseName: "",
        englishName: ""
    })

    console.log(sectionAValue)

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


    const handleChangeValue = ({ e, name, max}) => {
        function isInteger(str) {
            return Number.isInteger(+str);
        }

        setIsDataSaved(false)

        const value = e.target.value

        if(name == "textarea" && value.length) {
            if(value.length > max)
                setSectionAValue({
                    ...sectionAValue,
                    [e.target.name]: value.slice(0, max)
                })
        } else 
        if(name == "number") {
            if(isInteger(value))
                setSectionAValue({
                    ...sectionAValue,
                    [e.target.name]: value
                })
        } else {
            setSectionAValue(prev => {
                return {
                    ...prev,
                    [e.target.name]: e.target.value
                }
            })
        }
    }


    return (
        <>
            <EditorHeader
                currentSection={0}
            />
            <div id="sectionA" className="wrapper editor-section">
                <div className="title">
                    <h1>A. Thông tin tổng quát</h1>
                    <p>Lưu ý: Dữ liệu sẽ được lưu tự động khi click chuột ra khỏi ô nhập dữ liệu hoặc chuyển đổi giữa các phần. Vui lòng không reload hay thoát khỏi trang khi dữ liệu chưa được lưu.</p>
                </div>

                <div className="content">
                    <div className="sectionA-block">
                        <div>
                            <h4>1. Tên chương trình đào tạo (tiếng Việt)</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="vietnameseName"
                                autoComplete="off"
                                value={sectionAValue.vietnameseName}
                                onChange={e => handleChangeValue({ e })}
                            />
                        </div>
                    </div>
                    <div className="sectionA-block">
                        <div>
                            <h4>2. Tên chương trình đào tạo (tiếng Anh)</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="englishName"
                                autoComplete="off"
                                value={sectionAValue.englishName}
                                onChange={e => handleChangeValue({ e })}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <EditorFooter
                currentSection={0}
            />
        </>
    )
}
