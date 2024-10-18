import React, { useEffect, useState } from 'react'
import { handleChangValueE } from '../database/sectionE';


function CheckBoxBlock({ ploId, POList, setSectionEValue, data }) {
    const [ list, setList ] = useState([])
    // console.log(data)

    useEffect(() => {
        const updatedList = [];

        Object.values(POList).forEach(category => {
            category.data.forEach(po => {
                const poId = po.id
                
                updatedList.push({
                    poId,
                    ploId,
                    id: data?.[ploId]?.[poId]?.id || null,
                    isChecked: data?.[ploId]?.[poId]?.isChecked || false
                })
            });
        });

        setList(updatedList)
    }, [data])

    return <>
    {
        list.map((element, index) => {
            return <td key={index} className='input'>
                <input 
                    type="checkbox"
                    className='xmark'
                    data-po={element.poId}
                    data-plo={element.ploId}
                    checked={element.isChecked}
                    data-id={element.id}
                    onChange={() => handleChangValueE({
                        element,
                        setState: setSectionEValue
                    })}
                    id={`${element.ploId}-${element.poId}`}
                />
                <label htmlFor={`${element.ploId}-${element.poId}`} onClick={() => alert(1)}>
                    <span></span>
                </label>
            </td>
        })
    }
    </>
}

export default function SectionEBlock({ data, POSize, sectionEValue, setSectionEValue, POList }) {
    // console.log(sectionEValue)

    return Array.from(Object.keys(data)).map((element, index) => {
        return <React.Fragment key={index}>
            <tr className='block-subtitle'>
                <td>{data[element].typeIndex}</td>
                <td colSpan={POSize + 1}>{data[element].title}</td>
            </tr>
            {
                data[element].data.map((element, index) => {
                    return <tr key={index}>
                        <td>{element.symbol}</td>
                        <td>{element.content}</td>
                        <CheckBoxBlock
                            ploId={element.id}
                            POList={POList}
                            setSectionEValue={setSectionEValue}
                            data={sectionEValue}
                        />
                    </tr>
                })
            }
        </React.Fragment>
    })
}
