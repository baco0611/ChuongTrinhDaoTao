import React, { useState } from "react"
import { getParent } from "../Database/HandleUpdateDatabase"
import EditElement from "./EditElement"

function SectionGElement({ index, data, setState }) {

    const [ isEdit, setIsEdit ] = useState(false)

    const handleOpen = (e) => {
        const parent = getParent(e.target, 'section-G-create')
        if(!parent) {
            setIsEdit(true)
        }
    }

    return (
        <tr
            onDoubleClick={e => handleOpen(e)}
            className="cursorPointer"
            data-id={data.id}
        >
            <td>{index}</td>
            <td>{data.maHocPhan}</td>
            <td 
                style={{
                    textAlign:'left',
                    paddingLeft: '10px'
                }}
            >
                {data.tenHocPhan}
                {
                    isEdit &&
                    <EditElement
                        data={data}
                        khoiKienThuc={data.khoiKienThuc}
                        chiTietKhoiKienThuc={data.chiTietKhoiKienThuc}
                        idChuyenNganh={data.idChuyenNganh}
                        setEdit={setIsEdit}
                        setState={setState}
                    />
                }
            </td>
            <td>
                <input 
                    type="checkbox" 
                    checked={data.batBuoc}
                    readOnly   
                />
            </td>
            <td>{data.soTinChi}</td>
            <td>{data.lyThuyet != 0 && data.lyThuyet}</td>
            <td>{data.baiTap != 0 && data.baiTap}</td>
            <td>{data.thaoLuan != 0 && data.thaoLuan}</td>
            <td>{data.thucHanh != 0 && data.thucHanh}</td>
            <td>{data.thucTap != 0 && data.thucTap}</td>
            <td>{data.hocKy != 0 && data.hocKy}</td>
            <td>
                <h4>{data.tienQuyet.map((item, index) => {
                    return (
                        <React.Fragment key={index}>{item}<br/></React.Fragment>
                    )
                })}
                </h4>
            </td>
            <td>
                <h4>{data.hocTruoc.map((item, index) => {
                    return (
                        <React.Fragment key={index}>{item}<br/></React.Fragment>
                    )
                })}
                </h4>
            </td>
            <td>
                <h4>{data.songHanh.map((item, index) => {
                    return (
                        <React.Fragment key={index}>{item}<br/></React.Fragment>
                    )
                })}
                </h4>
            </td>
            <td>{data.hocKy}</td>
        </tr>
    )
}

export default SectionGElement