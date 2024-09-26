import React, { useContext, useEffect, useState } from 'react'
import EditorHeader from '../EditorHeader/EditorHeader'
import EditorFooter from '../EditorFooter/EditorFooter'
import "./SectionE.scss"
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../../context/ContextProvider'
import Loader from '../../../components/Loader/Loader'
import { useQuery } from 'react-query'
import { getDataSectionC } from '../database/sectionC'
import { getDataSectionD } from '../database/sectionD'
import Cookies from "js-cookie"


export default function SectionE() {

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

    const [ POSize, setPOSize ] = useState([
        ...sectionCValue.KIEN_THUC.data, ...sectionCValue.KY_NANG.data, ...sectionCValue.THAI_DO.data
    ].length)

    console.log(sectionCValue, sectionDValue, POSize)

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
        setPOSize([
            ...sectionCValue.KIEN_THUC.data, ...sectionCValue.KY_NANG.data, ...sectionCValue.THAI_DO.data
        ].length)
    }, [sectionCValue])

    // fetchAPI for section C
    const fetchSectionCAPI = () => {
        const token = Cookies.get("ACCESS_TOKEN");
        return async () => {
            return await getDataSectionC({
                id,
                api: apiURL,
                token,
                setIsDataSaved,
                setSectionCValue,
            });
        };
    };

    // fetchAPI for section D
    const fetchSectionDAPI = () => {
        const token = Cookies.get("ACCESS_TOKEN");
        return async () => {
            return await getDataSectionD({
                id,
                api: apiURL,
                token,
                setIsDataSaved,
                setSectionDValue,
            });
        };
    };

    // Use useQuery for fetching section C data
    const { data: sectionCData, isLoading: isSectionCLoading, isError: isSectionCError } = useQuery(
        `sectionC-${id}`,
        fetchSectionCAPI(id),
        {
            cacheTime: Infinity,
            refetchOnWindowFocus: false,
        }
    );

    // Use useQuery for fetching section D data
    const { data: sectionDData, isLoading: isSectionDLoading, isError: isSectionDError } = useQuery(
        `sectionD-${id}`,
        fetchSectionDAPI(id),
        {
            cacheTime: Infinity,
            refetchOnWindowFocus: false,
        }
    );

    // Handle loading states
    if (isSectionCLoading || isSectionDLoading) 
        return <Loader />;

    // Handle error states
    if (isSectionCError || isSectionDError) 
        navigate('/error');

    return (
        <>
            <EditorHeader
                currentSection={4}
            />
            <div id="sectionE" className="wrapper editor-section">
            
            </div>
            <EditorFooter
                currentSection={4}
            />
        </>
    )
}
