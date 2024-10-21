import React, { useContext, useEffect, useState } from 'react'
import EditorHeader from '../EditorHeader/EditorHeader'
import EditorFooter from '../EditorFooter/EditorFooter'
import "./SectionH.scss"
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../../context/ContextProvider'
import { useQuery } from 'react-query'
import { getDataSectionG } from '../database/sectionG'
import Loader from '../../../components/Loader/Loader'
import Cookies from "js-cookie"
import { getDataSectionD } from '../database/sectionD'
import { getDataSectionH } from '../database/sectionH'

export default function SectionH() {

    const { id } = useParams()
    const navigate = useNavigate()

    const { apiURL, serverAPI, user, token, isDataSaved, setIsDataSaved, handleBeforeUnload } = useContext(UserContext)

    const [ sectionGValue, setSectionGValue ] = useState({
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

    const [ sectionDValue, setSectionDValue ] = useState(
        JSON.parse(sessionStorage.getItem(`sectionD-${id}`)) ||  
        {
            KIEN_THUC: {
                KIEN_THUC_DAI_HOC_HUE: {
                    type: 'KIEN_THUC',
                    typeDetail: 'KIEN_THUC_DAI_HOC_HUE',
                    title: "Kiến thức chung trong toàn Đại học Huế",
                    data: [],
                    typeIndex: '1.1'
                },
                KIEN_THUC_DAI_HOC_KHOA_HOC: {
                    type: 'KIEN_THUC',
                    typeDetail: 'KIEN_THUC_DAI_HOC_KHOA_HOC',
                    title: "Kiến thức chung trong Trường Đại học Khoa học",
                    data: [],
                    typeIndex: '1.2'
                },
                KIEN_THUC_LINH_VUC: {
                    type: 'KIEN_THUC',
                    typeDetail: 'KIEN_THUC_LINH_VUC',
                    title: "Kiến thức chung theo lĩnh vực",
                    data: [],
                    typeIndex: '1.3'
                },
                KIEN_THUC_NHOM_NGANH: {
                    type: 'KIEN_THUC',
                    typeDetail: 'KIEN_THUC_NHOM_NGANH',
                    title: "Kiến thức chung của nhóm ngành",
                    data: [],
                    typeIndex: '1.4'
                },
                KIEN_THUC_NGANH: {
                    type: 'KIEN_THUC',
                    typeDetail: 'KIEN_THUC_NGANH',
                    title: "Kiến thức của ngành",
                    data: [],
                    typeIndex: '1.5'
                }
            },
            KY_NANG: {
                KY_NANG_CHUYEN_MON: {
                    type: 'KY_NANG',
                    typeDetail: 'KY_NANG_CHUYEN_MON',
                    title: "Kỹ năng chuyên môn",
                    data: [],
                    typeIndex: '2.1'
                },
                KY_NANG_MEM: {
                    type: 'KY_NANG',
                    typeDetail: 'KY_NANG_CHUYEN_MEM',
                    title: "Kỹ năng mềm",
                    data: [],
                    typeIndex: '2.2'
                }
            },
            THAI_DO: {
                THAI_DO_CA_NHAN: {
                    type: 'THAI_DO',
                    typeDetail: 'THAI_DO_CA_NHAN',
                    title: "Phẩm chất, đạo đức và thái độ của cá nhân",
                    data: [],
                    typeIndex: '3.1'
                },
                THAI_DO_NGHE_NGHIEP: {
                    type: 'THAI_DO',
                    typeDetail: 'THAI_DO_NGHE_NGHIEP',
                    title: "Phẩm chất, đạo đức và thái độ đối với nghề nghiệp",
                    data: [],
                    typeIndex: '3.2'
                },
                THAI_DO_XA_HOI: {
                    type: 'THAI_DO',
                    typeDetail: 'THAI_DO_XA_HOI',
                    title: "Phẩm chất, đạo đức và thái độ đối với xã hội",
                    data: [],
                    typeIndex: '3.3'
                }
            }
        }
    )

    const [ sectionHValue, setSectionHValue ] = useState(JSON.parse(sessionStorage.getItem(`sectionD-${id}`)) || [])

    const [ PLOSize, setPLOSize ] = useState(0)

    const [ isFetch, setIsFetch ] = useState(false)

    const [ specialization, setSpecialization ] = useState([])

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

    useEffect(() => {   
        sessionStorage.setItem(`sectionG-${id}`, JSON.stringify(sectionGValue))
        sessionStorage.setItem(`sectionD-${id}`, JSON.stringify(sectionDValue))
        sessionStorage.setItem(`specialization-${id}`, JSON.stringify(specialization))

        setPLOSize([
            ...sectionDValue.KIEN_THUC.KIEN_THUC_DAI_HOC_HUE.data,
            ...sectionDValue.KIEN_THUC.KIEN_THUC_DAI_HOC_KHOA_HOC.data,
            ...sectionDValue.KIEN_THUC.KIEN_THUC_LINH_VUC.data,
            ...sectionDValue.KIEN_THUC.KIEN_THUC_NGANH.data,
            ...sectionDValue.KIEN_THUC.KIEN_THUC_NHOM_NGANH.data,
            ...sectionDValue.KY_NANG.KY_NANG_MEM.data,
            ...sectionDValue.KY_NANG.KY_NANG_CHUYEN_MON.data,
            ...sectionDValue.THAI_DO.THAI_DO_CA_NHAN.data,
            ...sectionDValue.THAI_DO.THAI_DO_NGHE_NGHIEP.data,
            ...sectionDValue.THAI_DO.THAI_DO_XA_HOI.data,
        ].length)
    }, [sectionDValue, sectionGValue, specialization])


    const fetchSectionGAPI = (id) => {
        const token = Cookies.get("ACCESS_TOKEN")

        return async () => {
            getDataSectionG({
                id,
                api: serverAPI,
                token,
                setSectionGValue,
                setSpecialization,
            })
        }
    }

    const fetchSectionDAPI = () => {
        const token = Cookies.get("ACCESS_TOKEN");
        return async () => {
            return await getDataSectionD({
                id,
                api: apiURL,
                token,
                setIsDataSaved,
                setSectionDValue
            });
        };
    };

    const fetchSectionHAPI = () => {
        const token = Cookies.get("ACCESS_TOKEN");
        return async () => {
            return await getDataSectionH({
                id,
                api: serverAPI,
                token,
                setSectionHValue
            });
        };
    };

    const { data: dataSectionG , isLoading: isSectionGLoading, isError: isSectionGError} = useQuery(
        `sectionG-H-${id}`, 
        fetchSectionGAPI(id),{
            cacheTime: Infinity,
            refetchOnWindowFocus: false,
        }
    )

    // Use useQuery for fetching section D data
    const { data: sectionDData, isLoading: isSectionDLoading, isError: isSectionDError } = useQuery(
        `sectionD-${id}`,
        fetchSectionDAPI(id),
        {
            cacheTime: Infinity,
            refetchOnWindowFocus: false,
        }
    );

    // Use useQuery for fetching section D data
    const { data: sectionHData, isLoading: isSectionHLoading, isError: isSectionHError } = useQuery(
        `sectionH-${id}`,
        fetchSectionHAPI(id),
        {
            cacheTime: Infinity,
            refetchOnWindowFocus: false,
        }
    );

    if(isSectionGLoading || isSectionDLoading || isSectionHLoading)
        return <Loader/>

    if(isSectionGError || isSectionDError || isSectionHError)
        navigate('/error')

    return (
        <>
            <EditorHeader
                currentSection={6}
            />
            <div id="sectionH" className="wrapper editor-section">
                <div className="title">
                    <h1>H. MA TRẬN HỌC PHẦN ĐỐI VỚI CHUẨN ĐẦU RA</h1>
                    <p className='content'>Hãy điền mức độ đáp ứng vào ô ứng với chuẩn đầu ra (PLO) mà học phầ đó đáp ứng.</p>
                    <p>Lưu ý: Dữ liệu không được lưu tự động, vui lòng bấm nút lưu ở góc phải màn hình.</p>
                </div>
            </div>
            <EditorFooter
                currentSection={6}
            />
        </>
    )
}
