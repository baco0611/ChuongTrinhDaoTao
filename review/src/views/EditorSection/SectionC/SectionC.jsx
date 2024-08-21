import React, { useContext, useEffect, useState } from 'react'
import EditorHeader from '../EditorHeader/EditorHeader'
import EditorFooter from '../EditorFooter/EditorFooter'
import "./SectionC.scss"
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../../context/ContextProvider'
import { useQuery } from 'react-query'
import Loader from '../../../components/Loader/Loader'
import { getDataSectionC } from '../database/sectionC'
import POBlock from './POBlock'

export default function SectionC() {

    const { id } = useParams()
    const currentId = id
    const navigate = useNavigate()

    const { user, token, serverAPI, apiURL, isDataSaved, setIsDataSaved, handleBeforeUnload } = useContext(UserContext)
    const [ sectionCValue, setSectionCValue ] = useState(
        JSON.parse(sessionStorage.getItem(`sectionC-${id}`)) ||    
        {
            KIEN_THUC: {
                type: 'KIEN_THUC',
                typeIndex: 1,
                data: []
            },
            KY_NANG: {
                type: 'KY_NANG',
                typeIndex: 2,
                data: []
            },
            THAI_DO: {
                type: 'THAI_DO',
                typeIndex: 3,
                data: []
            }
    })

    console.log(sectionCValue)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        sessionStorage.setItem(`sectionC-${id}`, JSON.stringify(sectionCValue))
    }, [sectionCValue])

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
            return await getDataSectionC({
                id,
                api: serverAPI,
                token,
                setIsDataSaved,
                setSectionCValue
            })
        }
    }

    const { data , isLoading, isError} = useQuery(`sectionC-${id}`, fetchAPI(id),{
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
                currentSection={2}
            />
            <div id="sectionC" className="wrapper editor-section">
                <div className="title">
                    <h1>C. Mục tiêu cụ thể</h1>
                    <p className='content'>Tối đa 05 mục tiêu cụ thể cho mỗi phần về kiến thức, kỹ năng và thái độ của sinh viên sau khi tốt nghiệp, PO = Program Objectives.
                        <br/>Sinh viên sau khi tốt nghiệp có các kiến thức, kỹ năng và thái độ được thể hiện như bên dưới.
                    </p>
                    <p>Lưu ý: Dữ liệu sẽ được lưu tự động khi click chuột ra khỏi ô nhập dữ liệu hoặc chuyển đổi giữa các phần. Vui lòng không reload hay thoát khỏi trang khi dữ liệu chưa được lưu. Khi đã xóa một mục tiêu cụ thể thì dữ liệu về mục tiêu đó ở ma trận mục tiêu - chuẩn đầu ra sẽ bị xóa. Vì vậy, hãy cẩn trọng trước khi thực hiện thao tác xóa!</p>
                </div>

                <div className='content'>
                    <POBlock
                        title={"1. KIẾN THỨC"}
                        data={sectionCValue.KIEN_THUC}
                        setState={setSectionCValue}
                    />
                    <POBlock
                        title={"2. KỸ NĂNG"}
                        data={sectionCValue.KY_NANG}
                        setState={setSectionCValue}
                    />
                    <POBlock
                        title={"3. THÁI ĐỘ"}
                        data={sectionCValue.THAI_DO}
                        setState={setSectionCValue}
                    />
                </div>
            </div>
            <EditorFooter
                currentSection={2}
            />
        </>
    )
}
