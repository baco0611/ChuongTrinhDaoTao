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
import SectionEMain from './SectionEMain'


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


    const splitItem = (data) => {
        return data.split('-')
    }

    return (
        <>
            <EditorHeader
                currentSection={4}
            />
            <div id="sectionE" className="wrapper editor-section">
                <div className="title">
                    <h1>E. MA TRẬN CHUẨN ĐẦU RA ĐỐI VỚI MỤC TIÊU</h1>
                    <p className='content'>Hãy bấm vào ô tương ứng với Mục tiêu (PO) theo cột và Chuẩn đầu ra (PLO) theo dòng. Chỉ tick <strong style={{color: "#BE0000"}}>X</strong> vào những ô được chọn.</p>
                    <p>Lưu ý: Dữ liệu không được lưu tự động, vui lòng bấm nút lưu ở góc phải màn hình.</p>
                </div>
                <div className='matrix-wrap'>
                    <table className='matrix'>
                        <thead>
                            <tr>
                                <th style={{minWidth:"100px"}} rowSpan={3}>Ký hiệu</th>
                                <th style={{minWidth:"550px"}} rowSpan={3}>Chuẩn đầu ra</th>
                                <th style={{minWidth:"45%"}} colSpan={POSize}>Mục tiêu</th>
                            </tr>
                            <tr>
                                <th colSpan={sectionCValue.KIEN_THUC.data.length}>Kiến thức</th>
                                <th colSpan={sectionCValue.KY_NANG.data.length}>Kỹ năng</th>
                                <th colSpan={sectionCValue.THAI_DO.data.length}>Thái độ</th>
                            </tr>
                            <tr>
                            {
                                sectionCValue.KIEN_THUC.data.map((element, index) => {
                                    return <th 
                                        style={{minWidth:"105px"}} 
                                        key={index}
                                        title={element.content || null}
                                    >{splitItem(element.symbol)[0]} <br/> {splitItem(element.symbol)[1]} </th>
                                })
                            }
                            {
                                sectionCValue.KY_NANG.data.map((element, index) => {
                                    return <th 
                                        style={{minWidth:"105px"}} 
                                        key={index}
                                        title={element.content || null}
                                    >{splitItem(element.symbol)[0]} <br/> {splitItem(element.symbol)[1]} </th>
                                })
                            }
                            {
                                sectionCValue.THAI_DO.data.map((element, index) => {
                                    return <th 
                                        style={{minWidth:"105px"}} 
                                        key={index}
                                        title={element.content || null}
                                    >{splitItem(element.symbol)[0]} <br/> {splitItem(element.symbol)[1]} </th>
                                })
                            }
                            </tr>
                        </thead>
                        <SectionEMain
                            PLOList={sectionDValue}
                            POSize={POSize}
                            POList = {sectionCValue}
                        />
                    </table>
                </div>
            </div>
            <EditorFooter
                currentSection={4}
            />
        </>
    )
}
