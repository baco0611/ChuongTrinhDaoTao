import React, { useEffect, useState } from 'react'
import { handleChangValueE } from '../database/sectionE';


function CheckBoxBlock({ PLOId, POList, setSectionEValue, data }) {
    const [ list, setList ] = useState([])
    // console.log(data)

    useEffect(() => {
        const updatedList = [];

        Object.values(POList).forEach(category => {
            category.data.forEach(po => {
                const POId = po.id
                
                updatedList.push({
                    POId,
                    PLOId,
                    id: data?.[PLOId]?.[POId]?.id || null,
                    isChecked: data?.[PLOId]?.[POId]?.isChecked || false
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
                    data-po={element.POId}
                    data-plo={element.PLOId}
                    checked={element.isChecked}
                    data-id={element.id}
                    onChange={() => handleChangValueE({
                        element,
                        setState: setSectionEValue
                    })}
                    id={`${element.PLOId}-${element.POId}`}
                />
                <label htmlFor={`${element.PLOId}-${element.POId}`} onClick={() => alert(1)}>
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
                <td className='number'>{data[element].typeIndex}</td>
                {/* <td className='name' colSpan={POSize + 1}>{data[element].title}</td> */}
                <td className='name'>{data[element].title}</td>
                <td colSpan={POSize}></td>
            </tr>
            {
                data[element].data.map((element, index) => {
                    return <tr key={index}>
                        <td className='number'>{element.symbol}</td>
                        <td className='name'>{element.content}</td>
                        <CheckBoxBlock
                            PLOId={element.id}
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
