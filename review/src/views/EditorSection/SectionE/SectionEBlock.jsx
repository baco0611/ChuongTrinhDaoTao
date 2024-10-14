import React, { useEffect, useState } from 'react'


function CheckBoxBlock({ PLOId, POList, setSectionEValue, data }) {
    const [ list, setList ] = useState([])

    // console.log(JSON.stringify(POList), JSON.stringify(data))

    useEffect(() => {
        const updatedList = [];

        Object.values(POList).forEach(category => {
            category.data.forEach(po => {
                const POId = po.id
                
                updatedList.push({
                    POId,
                    PLOId,
                    isChecked: data?.[PLOId]?.[POId]?.isChecked || false
                })
            });
        });

        setList(updatedList)
    }, [setSectionEValue])

    // console.log(list)

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
                    // data-id={dataCheck[data_po].id != '' && dataCheck[data_po].id}
                    // onChange={() => handleChangValueE(setState, valueList)}
                    // checked={dataCheck[data_po].isCheck}
                    // id={`${data_plo}-${data_po}`}
                />
            </td>
        })
    }
    </>
}

export default function SectionEBlock({ data, POSize, sectionEValue, setSectionEValue, POList }) {

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
