import React, { useState } from 'react'
import SectionGCreateBlock from './GCreateBlock'
import SectionGEditBlock from './GEditBlock'
import SectionGElement from './SectionGElement'

export default function SectionGBlock({ symbol, title, data, setState, idSpecialization = null, knowledgeModule="PROFESSIONAL", detailedKnowledgeModule = null }) {
    // console.log(data, idSpecialization)

    const [ isHide, setIsHide ] = useState(true)

    return (
        <>
        {
            symbol &&
            <tr className='block-subtitle'>
                <td className='center'>{symbol}</td>
                <td colSpan={15}>{title}</td>
            </tr>
        }
        {
            data &&
            data.data.map((element, index) => {
                return <SectionGElement
                    key={index}
                    data={data}
                    element={element}
                    knowledgeModule={knowledgeModule}
                    detailedKnowledgeModule={detailedKnowledgeModule}
                    idSpecialization={idSpecialization}
                    setState={setState}
                />
            })
        }
            <tr className='add-btn'>
                <td colSpan={16}>
                    <button onClick={() => setIsHide(false)}>Thêm học phần</button>
                    {
                        //!isHide && !symbol &&
                        !isHide &&
                        <SectionGCreateBlock
                            knowledgeModule={knowledgeModule}
                            detailedKnowledgeModule={detailedKnowledgeModule}
                            specializationId={idSpecialization}
                            index={data.data.length + 1}
                            setIsHide={setIsHide}
                            setState={setState}
                        />
                    }
                </td>
            </tr>
        </>
    )
}
