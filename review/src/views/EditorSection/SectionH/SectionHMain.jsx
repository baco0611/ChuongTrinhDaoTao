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
                data={sectionHValue}
                courseData={sectionGValue.GENERAL}
                setState={setSectionHValue}
                colSpanSize={colSpanSize}
                PLOList={sectionDValue}
            />
            <tr className='block-title'>
                <td className='center'>II.</td>
                <td colSpan={colSpanSize}>KIẾN THỨC GIÁO DỤC CHUYÊN NGHIỆP</td>
            </tr>
            <SectionHBlock
                data={sectionHValue}
                symbol="A"
                title="Kiến thức cơ sở ngành"
                courseData={sectionGValue.PROFESSIONAL.BASIC}
                setState={setSectionHValue}
                colSpanSize={colSpanSize}
                PLOList={sectionDValue}
            />
            <SectionHBlock
                data={sectionHValue}
                symbol="B"
                title="Kiến thức ngành"
                courseData={sectionGValue.PROFESSIONAL.MAJOR}
                setState={setSectionHValue}
                colSpanSize={colSpanSize}
                PLOList={sectionDValue}
            />
            {
                specialization.map((element, index) => {
                    return <SectionHBlock
                        data={sectionHValue}
                        key={index}
                        symbol={`B.${index + 1}`}
                        title={element.specializationName}
                        courseData={sectionGValue.PROFESSIONAL.SPECIALIZE.data[element.specializationId]}
                        setState={setSectionHValue}
                        idSpecialization={element.specializationId}
                        colSpanSize={colSpanSize}
                        PLOList={sectionDValue}
                    />
                })
            }
            <SectionHBlock
                data={sectionHValue}
                symbol="C"
                title="Kiến thức bổ trợ"
                courseData={sectionGValue.PROFESSIONAL.SUPPLEMENTARY}
                setState={setSectionHValue}
                colSpanSize={colSpanSize}
                PLOList={sectionDValue}
            />
            <SectionHBlock
                data={sectionHValue}
                symbol="D"
                title="Kiến thức thực tập thực tế"
                courseData={sectionGValue.PROFESSIONAL.INTERN}
                setState={setSectionHValue}
                colSpanSize={colSpanSize}
                PLOList={sectionDValue}
            />
            <SectionHBlock
                data={sectionHValue}
                symbol="E"
                title="ĐATN, KLTN hoặc học phần thay thế KLTN"
                courseData={sectionGValue.PROFESSIONAL.THESIS_PROJECT}
                setState={setSectionHValue}
                colSpanSize={colSpanSize}
                PLOList={sectionDValue}
            />
            {
                specialization.map((element, index) => {
                    return <SectionHBlock
                        data={sectionHValue}
                        key={index}
                        symbol={`E.${index + 1}`}
                        title={element.specializationName}
                        courseData={sectionGValue.PROFESSIONAL.REPLACE_THESIS.data[element.specializationId]}
                        setState={setSectionHValue}
                        idSpecialization={element.specializationId}
                        colSpanSize={colSpanSize}
                        PLOList={sectionDValue}
                    />
                })
            }
        </tbody>
    )
}
