import CreateElement from "./CreateElement"
import SectionGElement from "./SectionGElement"
import { useState } from 'react'
import { getParent } from '../Database/HandleUpdateDatabase'

function SectionGDC({ data, setState}) {
    
    const [ isCreate, setIsCreate ] = useState(false)

    const handleOpen = (e) => {
        const parent = getParent(e.target, 'section-G-create')
        if(!parent) {
            setIsCreate(true)
        }
    }
    console.log(data)
    
    return (
        <>
            {
                data.data.map((item, index) => 
                    <SectionGElement
                        key={index}
                        index = {index+1}
                        data={item}
                        setState={setState}
                    />
                )
            }
            <tr>
                <td 
                    colSpan={16} 
                    className="addBtn"
                    onClick={e => handleOpen(e)}
                >
                    <button>Thêm học phần</button>
                    {
                        isCreate &&
                        <CreateElement
                            khoiKienThuc={'DAI_CUONG'}
                            chiTietKhoiKienThuc={''}
                            idChuyenNganh={''}
                            setCreate={setIsCreate}
                            setState={setState}
                            stt={data.data.length + 1}
                        />
                    }
                </td>
            </tr>
        </>
    )
}

export default SectionGDC