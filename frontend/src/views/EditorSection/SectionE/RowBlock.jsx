import React, { useState } from "react"
import CheckBoxBlock from "./CheckBoxBlock"

function RowBlock({ index, title, POList, POSize, PLOList, value, setState }) {
    const [ isHidden, setIsHidden ] = useState(true)
    const keys = Object.keys(PLOList)

    return (
        <>
            <tr 
                className="title cursorPointer sticky"
                onClick={() => setIsHidden(!isHidden)}
            >
                <td>{index}</td>
                <td colSpan={POSize && POSize + 1 || 4}>{title}</td>
            </tr>
            {
                !isHidden &&
                keys.map((item, index) => {
                    const PLO = PLOList[item]
                    return (
                        <React.Fragment key={index}>
                            <tr 
                                className="title"
                            >
                                <td>{PLO.typeIndex}.</td>
                                <td 
                                    colSpan={POSize && POSize + 1 || 4}
                                    style={{
                                        left: "100px",
                                    }}
                                >{PLO.title}</td>
                            </tr>
                            {
                                PLO.data.map((data, index) => {
                                    return (
                                        <tr className="block" key={index}>
                                            <td style={{textAlign: 'center', paddingLeft: 0}}>{data.kiHieu}</td>
                                            <td>{data.noiDung}</td>
                                            <CheckBoxBlock
                                                POList={POList}
                                                PLOId={data.id}
                                                value={value}
                                                setState={setState}
                                            />
                                        </tr>
                                    )
                                }) 
                            }
                        </React.Fragment>
                    )
                })
            }
        </>
    )
}

export default RowBlock