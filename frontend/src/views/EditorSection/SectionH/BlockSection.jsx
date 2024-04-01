import React from 'react'
import InputBlock from './InputBlock'

function BlockSection({ index, title, data, value, PLOList, size, setState }) {
    return (
        <>
            <tr 
                className="title cursorPointer"
            >
                <td>{index}</td>
                <td colSpan={(size || 3) + 3}>{title}</td>
            </tr>
            {
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
            }
        </>
    )
}

export default BlockSection