import React from 'react'
import SectionHBlock from './SectionHBlock'

export default function SectionHMain({sectionDValue, sectionGValue, sectionHValue, specialization, setSectionDValue, setSectionGValue, setSectionHValue, PLOSize}) {
    const colSpanSize = PLOSize.KIEN_THUC + PLOSize.KY_NANG + PLOSize.THAI_DO + 3
    
    return (
        <tbody>
            <tr className='block-title'>
                <td className='center'>I.</td>
                <td colSpan={colSpanSize}>KIẾN THỨC GIÁO DỤC ĐẠI CƯƠNG</td>
            </tr>
            <SectionHBlock
                data={sectionGValue.GENERAL}
                setState={setSectionGValue}
                colSpanSize={colSpanSize}
            />
            <tr className='block-title'>
                <td className='center'>II.</td>
                <td colSpan={colSpanSize}>KIẾN THỨC GIÁO DỤC CHUYÊN NGHIỆP</td>
            </tr>
            <SectionHBlock
                symbol="A"
                title="Kiến thức cơ sở ngành"
                data={sectionGValue.PROFESSIONAL.BASIC}
                setState={setSectionGValue}
                colSpanSize={colSpanSize}
            />
            <SectionHBlock
                symbol="B"
                title="Kiến thức ngành"
                data={sectionGValue.PROFESSIONAL.MAJOR}
                setState={setSectionGValue}
                colSpanSize={colSpanSize}
            />
            {
                specialization.map((element, index) => {
                    return <SectionHBlock
                        key={index}
                        symbol={`B.${index + 1}`}
                        title={element.specializationName}
                        data={sectionGValue.PROFESSIONAL.SPECIALIZE.data[element.specializationId]}
                        setState={setSectionGValue}
                        idSpecialization={element.specializationId}
                        colSpanSize={colSpanSize}
                    />
                })
            }
            <SectionHBlock
                symbol="C"
                title="Kiến thức bổ trợ"
                data={sectionGValue.PROFESSIONAL.SUPPLEMENTARY}
                setState={setSectionGValue}
                colSpanSize={colSpanSize}
            />
            <SectionHBlock
                symbol="D"
                title="Kiến thức thực tập thực tế"
                data={sectionGValue.PROFESSIONAL.INTERN}
                setState={setSectionGValue}
                colSpanSize={colSpanSize}
            />
            <SectionHBlock
                symbol="E"
                title="ĐATN, KLTN hoặc học phần thay thế KLTN"
                data={sectionGValue.PROFESSIONAL.THESIS_PROJECT}
                setState={setSectionGValue}
                colSpanSize={colSpanSize}
            />
            {
                specialization.map((element, index) => {
                    return <SectionHBlock
                        key={index}
                        symbol={`E.${index + 1}`}
                        title={element.specializationName}
                        data={sectionGValue.PROFESSIONAL.REPLACE_THESIS.data[element.specializationId]}
                        setState={setSectionGValue}
                        idSpecialization={element.specializationId}
                        colSpanSize={colSpanSize}
                    />
                })
            }
        </tbody>
    )
}
