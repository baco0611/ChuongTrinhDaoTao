import React, { useContext, useEffect, useState } from 'react'
import EditorHeader from '../EditorHeader/EditorHeader'
import EditorFooter from '../EditorFooter/EditorFooter'
import "./SectionG.scss"
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../../context/ContextProvider'
import Loader from '../../../components/Loader/Loader'
import { useQuery } from 'react-query'
import { getDataSectionG } from '../database/sectionG'
import Cookies from "js-cookie"
import SectionGBlock from './SectionGBlock'

export default function SectionG() {

    const { id } = useParams()
    const currentId = id
    const navigate = useNavigate()

    const { apiURL, serverAPI, user, token, isDataSaved, setIsDataSaved, handleBeforeUnload } = useContext(UserContext)

    const [ sectionGValue, setSectionGValue ] = useState(
    {
        GENERAL: {
            data: [],
            type: "GENERAL"
        },
        PROFESSIONAL: {
            BASIC: {
                data: [],
                type: "BASIC"
            },
            MAJOR: {
                data: [],
                type: "MAJOR"
            },
            INTERN: {
                data: [],
                type: "INTERN"
            },
            SUPPLEMENTARY: {
                data: [],
                type: "SUPPLEMENTARY"
            },
            THESIS_PROJECT: {
                data: [],
                type: "THESIS_PROJECT",
            },
            REPLACE_THESIS: {
                data: {},
                type: "REPLACE_THESIS",
            },
            SPECIALIZE: {
                data: {},
                type: "SPECIALIZE"
            },
        }
    })

    const [ specialization, setSpecialization ] = useState(
        JSON.parse(sessionStorage.getItem(`specialization-${id}`)) || []
    )

    console.log(specialization)
    useEffect(() => {
        sessionStorage.setItem(`sectionG-${id}`, JSON.stringify(sectionGValue))
        sessionStorage.setItem(`specialization-${id}`, JSON.stringify(specialization))

    }, [sectionGValue, specialization])

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

    const fetchAPI = (id) => {
        const token = Cookies.get("ACCESS_TOKEN")

        return async () => {
            getDataSectionG({
                id,
                api: apiURL,
                token,
                setSectionGValue,
                setSpecialization
            })
        }
    }

    const { data , isLoading, isError} = useQuery(`sectionG-${id}`, fetchAPI(id),{
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
                currentSection={5}
            />
            <div id="sectionG" className="wrapper editor-section">
                <div className="title">
                    <h1>G. KHUNG CHƯƠNG TRÌNH ĐÀO TẠO</h1>
                    <p className='content'>Hãy nháy kép vào học phần muốn chỉnh sửa</p>
                    <p>Lưu ý: Dữ liệu sẽ được cập nhật sau mỗi bước thực hiện.</p>
                </div>
                <div className='sectionG-main'>
                    <table>
                        <thead>
                            <tr>
                                <th style={{minWidth: "50px"}} rowSpan={2}>STT</th>
                                <th style={{minWidth: "100px"}} rowSpan={2}>Mã HP</th>
                                <th style={{minWidth: "275px"}} rowSpan={2}>Tên học phần</th>
                                <th style={{minWidth: "50px"}} rowSpan={2}>Bắt buộc</th>
                                <th style={{minWidth: "50px"}} rowSpan={2}>STC</th>
                                <th colSpan={6}>Phân bố giờ</th>
                                <th colSpan={3}>Quan hệ với các học phần</th>
                                <th style={{minWidth: "50px"}} rowSpan={2}>Học kỳ</th>
                                <th style={{minWidth: "50px"}} rowSpan={2}>Thao tác</th>
                            </tr>
                            <tr>
                                <th style={{minWidth: "35px"}} title='Lý thuyết'>LT</th>
                                <th style={{minWidth: "35px"}} title='Bài tập'>BT</th>
                                <th style={{minWidth: "35px"}} title='Thảo luận'>TL</th>
                                <th style={{minWidth: "35px"}} title='Thực hành'>TH</th>
                                <th style={{minWidth: "35px"}} title='Thực tập'>TT</th>
                                <th style={{minWidth: "35px"}} title='Kiểm tra'>KT</th>
                                <th style={{minWidth: "100px"}}>Tiên quyết</th>
                                <th style={{minWidth: "100px"}}>Học trước</th>
                                <th style={{minWidth: "100px"}}>Song hành</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='block-title'>
                                <td className='center'>I.</td>
                                <td colSpan={15}>KIẾN THỨC GIÁO DỤC ĐẠI CƯƠNG</td>
                            </tr>
                            <SectionGBlock
                                data={sectionGValue.GENERAL}
                                setState={setSectionGValue}
                            />
                            <tr className='block-title'>
                                <td className='center'>II.</td>
                                <td colSpan={15}>KIẾN THỨC GIÁO DỤC CHUYÊN NGHIỆP</td>
                            </tr>
                            <SectionGBlock
                                symbol="A"
                                title="Kiến thức cơ sở ngành"
                                data={sectionGValue.PROFESSIONAL.BASIC}
                                setState={setSectionGValue}
                            />
                            <SectionGBlock
                                symbol="B"
                                title="Kiến thức ngành"
                                data={sectionGValue.PROFESSIONAL.MAJOR}
                                setState={setSectionGValue}
                            />
                            {
                                specialization.map((element, index) => {
                                    return <SectionGBlock
                                        key={index}
                                        symbol={`B.${index + 1}`}
                                        title={element.specializationName}
                                        data={sectionGValue.PROFESSIONAL.SPECIALIZE.data[element.specializationId]}
                                        setState={setSectionGValue}
                                        idSpecialization={element.specializationId}
                                    />
                                })
                            }
                            <SectionGBlock
                                symbol="C"
                                title="Kiến thức bổ trợ"
                                data={sectionGValue.PROFESSIONAL.SUPPLEMENTARY}
                                setState={setSectionGValue}
                            />
                            <SectionGBlock
                                symbol="D"
                                title="Kiến thức thực tập thực tế"
                                data={sectionGValue.PROFESSIONAL.INTERN}
                                setState={setSectionGValue}
                            />
                            <SectionGBlock
                                symbol="E"
                                title="ĐATN, KLTN hoặc học phần thay thế KLTN"
                                data={sectionGValue.PROFESSIONAL.THESIS_PROJECT}
                                setState={setSectionGValue}
                            />
                            {
                                specialization.map((element, index) => {
                                    return <SectionGBlock
                                        key={index}
                                        symbol={`E.${index + 1}`}
                                        title={element.specializationName}
                                        data={sectionGValue.PROFESSIONAL.REPLACE_THESIS.data[element.specializationId]}
                                        setState={setSectionGValue}
                                        idSpecialization={element.specializationId}
                                    />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <EditorFooter
                currentSection={5}
            />
        </>
    )
}
