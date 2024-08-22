import React, { useContext, useEffect, useState } from 'react'
import EditorHeader from '../EditorHeader/EditorHeader'
import EditorFooter from '../EditorFooter/EditorFooter'
import "./SectionD.scss"
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../../context/ContextProvider'
import { useQuery } from 'react-query'
import Loader from '../../../components/Loader/Loader'
import { getDataSectionD } from '../database/sectionD'

export default function SectionD() {

    const { id } = useParams()
    const currentId = id
    const navigate = useNavigate()

    const { user, token, serverAPI, apiURL, isDataSaved, setIsDataSaved, handleBeforeUnload } = useContext(UserContext)
    const [ sectionDValue, setSectionDValue ] = useState(
        JSON.parse(sessionStorage.getItem(`sectionD-${id}`)) ||  
        {
            KIEN_THUC: {
                KIEN_THUC_DAI_HOC_HUE: {
                    type: 'KIEN_THUC',
                    typeDetail: 'KIEN_THUC_DAI_HOC_HUE',
                    data: [],
                    typeIndex: '1.1'
                },
                KIEN_THUC_DAI_HOC_KHOA_HOC: {
                    type: 'KIEN_THUC',
                    typeDetail: 'KIEN_THUC_DAI_HOC_KHOA_HOC',
                    data: [],
                    typeIndex: '1.2'
                },
                KIEN_THUC_LINH_VUC: {
                    type: 'KIEN_THUC',
                    typeDetail: 'KIEN_THUC_LINH_VUC',
                    data: [],
                    typeIndex: '1.3'
                },
                KIEN_THUC_NHOM_NGANH: {
                    type: 'KIEN_THUC',
                    typeDetail: 'KIEN_THUC_NHOM_NGANH',
                    data: [],
                    typeIndex: '1.4'
                },
                KIEN_THUC_NGANH: {
                    type: 'KIEN_THUC',
                    typeDetail: 'KIEN_THUC_NGANH',
                    data: [],
                    typeIndex: '1.5'
                }
            },
            KY_NANG: {
                KY_NANG_CHUYEN_MON: {
                    type: 'KY_NANG',
                    typeDetail: 'KY_NANG_CHUYEN_MON',
                    data: [],
                    typeIndex: '2.1'
                },
                KY_NANG_MEM: {
                    type: 'KY_NANG',
                    typeDetail: 'KY_NANG_CHUYEN_MEM',
                    data: [],
                    typeIndex: '2.2'
                }
            },
            THAI_DO: {
                THAI_DO_CA_NHAN: {
                    type: 'THAI_DO',
                    typeDetail: 'THAI_DO_CA_NHAN',
                    data: [],
                    typeIndex: '3.1'
                },
                THAI_DO_NGHE_NGHIEP: {
                    type: 'THAI_DO',
                    typeDetail: 'THAI_DO_NGHE_NGHIEP',
                    data: [],
                    typeIndex: '3.2'
                },
                THAI_DO_XA_HOI: {
                    type: 'THAI_DO',
                    typeDetail: 'THAI_DO_XA_HOI',
                    data: [],
                    typeIndex: '3.3'
                }
            }
        }
    )

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        sessionStorage.setItem(`sectionD-${id}`, JSON.stringify(sectionDValue))
    }, [sectionDValue])

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
            getDataSectionD({
                id,
                api: serverAPI,
                token,
                sectionDValue,
                setIsDataSaved
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
                currentSection={3}
            />
            <div id="sectionD" className="wrapper editor-section">
                <div className="title">
                    <h1>D. Chuẩn đầu ra và trình độ năng lực</h1>
                    <p className='content'>Viết theo từng chuẩn đầu ra, bao gồm các chủ đề chuẩn đầu ra và trình độ năng lực (TĐNL – tham khảo thêm tài liệu và thang trình độ năng lực kèm theo) mà chuẩn đầu ra yêu cầu khi sinh viên tốt nghiệp, PLO = Program Learning Outcomes.</p>
                    <p>Lưu ý: Dữ liệu sẽ được lưu tự động khi click chuột ra khỏi ô nhập dữ liệu hoặc chuyển đổi giữa các phần. Vui lòng không reload hay thoát khỏi trang khi dữ liệu chưa được lưu. Khi đã xóa một chuẩn đầu ra thì dữ liệu về mục tiêu đó ở ma trận mục tiêu - chuẩn đầu ra sẽ bị xóa. Vì vậy, hãy cẩn trọng trước khi thực hiện thao tác xóa!</p>
                </div>

                <div className='content'>

                </div>
            </div>
            <EditorFooter
                currentSection={3}
            />
        </>
    )
}
