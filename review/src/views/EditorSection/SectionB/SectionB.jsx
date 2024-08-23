import React, { useContext, useEffect, useState } from 'react'
import EditorHeader from '../EditorHeader/EditorHeader'
import EditorFooter from '../EditorFooter/EditorFooter'
import "./SectionB.scss"
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../../context/ContextProvider'
import { useQuery } from 'react-query'
import Loader from '../../../components/Loader/Loader'
import { getDataSectionB, handleChangeValue, handleSaveChangeSectionB } from '../database/sectionB'

export default function SectionB() {

    const { id } = useParams()
    const currentId = id
    const navigate = useNavigate()

    const { user, token, isDataSaved, setIsDataSaved, handleBeforeUnload, fakeAPI, serverAPI } = useContext(UserContext)
    const [ sectionBValue, setSectionBValue ] = useState(JSON.parse(sessionStorage.getItem(`sectionB-${id}`)) ||"")


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        sessionStorage.setItem(`sectionB-${id}`, JSON.stringify(sectionBValue))
    }, [sectionBValue])

    useEffect(() => {
        // Thêm event listener khi component được mount
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Dọn dẹp event listener khi component bị unmount
        return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDataSaved])

    const fetchAPI = (id) => {
        return async () => {
            return await getDataSectionB({
                id,
                api: serverAPI,
                token,
                setIsDataSaved,
                setSectionBValue
            })
        }
    }

    const { data , isLoading, isError} = useQuery(`sectionB-${id}`, fetchAPI(id),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    return (
        <>
            <EditorHeader
                currentSection={1}
            />
            <div id="sectionB" className="wrapper editor-section">
                <div className="title">
                    <h1>B. Mục tiêu tổng quát</h1>
                    <p className='content'>Viết tối đa 1500 kí tự, trình bày tổng quát về chương trình đào tạo, trong đó xác định mục tiêu tổng quát của chương trình đào tạo: năng lực về kiến thức, năng lực thực hành nghề nghiệp của sinh viên sau khi tốt nghiệp…</p>
                    <p>Lưu ý: Dữ liệu sẽ được lưu tự động khi click chuột ra khỏi ô nhập dữ liệu hoặc chuyển đổi giữa các phần. Vui lòng không reload hay thoát khỏi trang khi dữ liệu chưa được lưu.</p>
                </div>

                <div className='content'>
                    <textarea
                        value={sectionBValue}
                        onChange={e => handleChangeValue(e, setSectionBValue, setIsDataSaved)}
                        onBlur={async () => await handleSaveChangeSectionB({ id, api: serverAPI, token, sectionBValue, setIsDataSaved})}
                    />
                </div>
            </div>
            <EditorFooter
                currentSection={1}
            />
        </>
    )
}
