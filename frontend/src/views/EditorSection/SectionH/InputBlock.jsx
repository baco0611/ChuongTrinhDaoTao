import React from 'react'
import { handleChangeValueH } from '../Database/HandleActionSectionH'

function InputElement({ hocPhanId, list, value, setState }) {

    const valueList = {}

    value.forEach(item => {
        let { id, PLO, idCTCT, mucDoDapUng } = item
    
        if(!valueList[idCTCT]) {
            valueList[idCTCT] = {
                [PLO]: {
                    id,
                    mucDoDapUng
                }
            } 
        } else valueList[idCTCT][PLO] = {id, mucDoDapUng}
    })

    return (
        <>
            {
                list.map((PLO, index) => {
                    const data_plo = PLO.id
                    const data_hocPhan = hocPhanId
                    const dataCheck = valueList[data_hocPhan]

                    if(dataCheck)
                        if(dataCheck[data_plo])
                            return (
                                <td key={index} className='input'>
                                    <input 
                                        data-plo={data_plo}
                                        data-hp={data_hocPhan}
                                        type='text'
                                        id={`${data_hocPhan}-${data_plo}`}
                                        value={dataCheck[data_plo].mucDoDapUng}
                                        data-id={dataCheck[data_plo].id != '' ? dataCheck[data_plo].id : ''}
                                        onChange={() => handleChangeValueH(setState, valueList)}
                                    />
                                </td>
                            )

                    return (
                        <td key={index} className='input'>
                            <input 
                                data-plo={data_plo}
                                data-hp={data_hocPhan}
                                type='text'
                                id={`${data_hocPhan}-${data_plo}`}
                                onChange={() => handleChangeValueH(setState, valueList)}
                            />
                        </td>
                    )
                })
            }
        </>
    )
}

function InputBlock({ PLOList, value, hocPhanId, setState }) {
    return (
        <>
            <InputElement
                hocPhanId={hocPhanId}
                list={PLOList.KIEN_THUC.data}
                value={value}
                setState={setState}
            />
            <InputElement
                hocPhanId={hocPhanId}
                list={PLOList.KY_NANG.data}
                value={value}
                setState={setState}
            />
            <InputElement
                hocPhanId={hocPhanId}
                list={PLOList.THAI_DO.data}
                value={value}
                setState={setState}
            />
        </>
    )
}

export default InputBlock