import { useState } from "react"
import SectionGCN from "./SectionGCN"
import SectionGDC from "./SectionGDC"

function SectionGBlock({ title, index, data, setState }) {
    const [ isHidden, setIsHidden ] = useState(true)

    return (
        <>
            <tr 
                className="title cursorPointer sticky"
                onClick={() => setIsHidden(!isHidden)}
            >
                <td style={{textAlign: 'center', paddingLeft: 0}}>{index}</td>
                <td colSpan={14}>{title}</td>            
            </tr>
            {
                !isHidden &&
                <>
                    {
                        data.type == 'DAI_CUONG' 
                        &&
                            <SectionGDC
                                data={data}
                                setState={setState}
                            />
                        ||
                            <SectionGCN
                                data={data}
                                setState={setState}
                            />
                    }
                </>
            }
        </>
    )
}

export default SectionGBlock