import React, { useContext, useState } from 'react'
import SectionEBlock from './SectionEBlock'
import Loader from '../../../components/Loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataSectionE } from '../database/sectionE';
import { useQuery } from 'react-query';
import { UserContext } from '../../../context/ContextProvider';
import Cookies from "js-cookie"

export default function SectionEMain({ PLOList, POSize, POList }) {
    const { id } = useParams()
    const [ sectionEValue, setSectionEValue ] = useState({})
    const navigate = useNavigate()
    const { apiURL, serverAPI, token } = useContext(UserContext)

    const fetchSectionEAPI = () => {
        const token = Cookies.get("ACCESS_TOKEN");
        return async () => {
            return await getDataSectionE({
                id,
                api: serverAPI,
                token,
                setSectionEValue,
            });
        };
    };

    // Use useQuery for fetching section C data
    const { data, isLoading, isError } = useQuery(
        `sectionE-${id}`,
        fetchSectionEAPI(id),
        {
            cacheTime: Infinity,
            refetchOnWindowFocus: false,
        }
    );

    if (isLoading) 
        return <tbody><tr><td><Loader /></td></tr></tbody>;

    // Handle error states
    if (isError) 
        navigate('/error');

    // console.log(sectionEValue)

    return (
        <tbody>
            <tr className='block-title'>
                <td>1.</td>
                <td colSpan={POSize + 1}>Kiến thức</td>
            </tr>
            <SectionEBlock
                data={PLOList.KIEN_THUC}
                POSize={POSize}
                sectionEValue={sectionEValue}
                setSectionEValue={sectionEValue}
                POList={POList}
            />
            <tr className='block-title'>
                <td>2.</td>
                <td colSpan={POSize + 1}>Kỹ năng</td>
            </tr>
            <SectionEBlock
                data={PLOList.KY_NANG}
                POSize={POSize}
                sectionEValue={sectionEValue}
                setSectionEValue={sectionEValue}
                POList={POList}
            />
            <tr className='block-title'>
                <td>3.</td>
                <td colSpan={POSize + 1}>Thái độ</td>
            </tr>
            <SectionEBlock
                data={PLOList.THAI_DO}
                POSize={POSize}
                sectionEValue={sectionEValue}
                setSectionEValue={setSectionEValue}
                POList={POList}
            />
        </tbody>
    )
}
