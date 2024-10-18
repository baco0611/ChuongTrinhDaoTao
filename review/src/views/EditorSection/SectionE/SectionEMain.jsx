import React, { useContext, useState } from 'react'
import SectionEBlock from './SectionEBlock'
import Loader from '../../../components/Loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataSectionE } from '../database/sectionE';
import { useQuery } from 'react-query';
import { UserContext } from '../../../context/ContextProvider';
import Cookies from "js-cookie"

export default function SectionEMain({ PLOList, POSize, POList, sectionEValue, setSectionEValue }) {
    const { id } = useParams()
    
    const navigate = useNavigate()
    const { apiURL, serverAPI, token } = useContext(UserContext)

    return (
        <tbody>
            <tr className='block-title'>
                <td className='number'>1.</td>
                {/* <td className='name' colSpan={POSize + 1}>Kiến thức</td> */}
                <td className='name'>Kiến thức</td>
                <td colSpan={POSize}></td>
            </tr>
            <SectionEBlock
                data={PLOList.KIEN_THUC}
                POSize={POSize}
                sectionEValue={sectionEValue}
                setSectionEValue={setSectionEValue}
                POList={POList}
            />
            <tr className='block-title'>
                <td className='number'>2.</td>
                {/* <td className='name' colSpan={POSize + 1}>Kỹ năng</td> */}
                <td className='name'>Kỹ năng</td>
                <td colSpan={POSize}></td>
            </tr>
            <SectionEBlock
                data={PLOList.KY_NANG}
                POSize={POSize}
                sectionEValue={sectionEValue}
                setSectionEValue={setSectionEValue}
                POList={POList}
            />
            <tr className='block-title'>
                <td className='number'>3.</td>
                {/* <td className='name' colSpan={POSize + 1}>Thái độ</td> */}
                <td className='name'>Thái độ</td>
                <td colSpan={POSize}></td>
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
