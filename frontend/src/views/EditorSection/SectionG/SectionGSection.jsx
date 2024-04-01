import { useState } from "react"
import SectionGElement from "./SectionGElement"
import CreateElement from "./CreateElement"
import { getParent } from "../Database/HandleUpdateDatabase"

function SectionGSection({ title, index, data, setState, idChuyenNganh }) {
    const [ isCreate, setIsCreate ] = useState(false)

    const handleOpen = (e) => {
        const parent = getParent(e.target, 'section-G-create')
        if(!parent) {
            setIsCreate(true)
        }
    }

    return (
        <>
            <tr className="title cursorPointer">
                <td style={{textAlign: 'center', paddingLeft: 0}}>{index}</td>
                <td colSpan={14}>{title}</td>            
            </tr>
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
                    colSpan={15} 
                    className="addBtn"
                    onClick={e => handleOpen(e)}
                >
                    <button>Thêm học phần</button>
                    {
                        isCreate &&
                        <CreateElement
                            khoiKienThuc={'CHUYEN_NGHIEP'}
                            chiTietKhoiKienThuc={data.type}
                            idChuyenNganh={idChuyenNganh}
                            setCreate={setIsCreate}
                            setState={setState}
                        />
                    }
                </td>
            </tr>
        </>
    )
}

export default SectionGSection