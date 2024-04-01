import React from 'react'
import InputBlock from './InputBlock'

function BlockDC({ data, value, PLOList, setState }) {

    return (
        <>
            {
                data.map((item, index) => {
                    return (
                        <tr 
                            className='block'
                            key={index}
                        >  
                            <td style={{paddingLeft: 0, textAlign: 'center'}}>{index + 1}</td>
                            <td style={{paddingLeft: 0, textAlign: 'center'}}>{item.maHocPhan}</td>
                            <td>{item.tenHocPhan}</td>
                            <td style={{paddingLeft: 0, textAlign: 'center'}}>{item.soTinChi}</td>
                            <InputBlock
                                PLOList={PLOList}
                                value={value}
                                hocPhanId={item.id}
                                setState={setState}
                            />
                        </tr>
                    )
                })
            }
        </>
    )
}

export default BlockDC