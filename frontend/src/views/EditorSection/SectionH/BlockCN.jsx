import React from 'react'
import BlockSection from './BlockSection'

function BlockCN({ data, value, PLOList, size, setState }) {
    const chuyenNganhKeys = Object.keys(data.CHUYEN_NGANH.data)
    const chuyenNganhValue = data.CHUYEN_NGANH.data
    const TTKL = data.THAY_THE_KHOA_LUAN.data

    return (
        <>
            <BlockSection
                index={"A."}
                title={"Kiến thức cơ sở ngành"}
                data={data.CO_SO_NGANH.data}
                value={value}
                PLOList={PLOList}
                size={size}
                setState={setState}
            />
            <BlockSection
                index={"B."}
                title={"Kiến thức cơ sở ngành"}
                data={data.NGANH.data}
                value={value}
                PLOList={PLOList}
                size={size}
                setState={setState}
            />
            {
                chuyenNganhKeys.map((key, index) => {
                    return (
                        <BlockSection
                            index={`B.${index+1}`}
                            title={`Kiến thức chuyên ngành ${chuyenNganhValue[key].tenChuyenNganh}`}
                            data={chuyenNganhValue[key].data}
                            value={value}
                            PLOList={PLOList}
                            size={size}
                            key={index + 1}
                            setState={setState}
                        />
                    )
                })
            }
            <BlockSection
                index={"C."}
                title={"Kiến thức bổ trợ"}
                data={data.BO_TRO.data}
                value={value}
                PLOList={PLOList}
                size={size}
                setState={setState}
            />
            <BlockSection
                index={"D."}
                title={"Kiến thức thực tập, thực tế"}
                data={data.THUC_TAP.data}
                value={value}
                PLOList={PLOList}
                size={size}
                setState={setState}
            />
            <BlockSection
                index={"E."}
                title={"ĐATN, KLTN hoặc học phần thay thế KLTN"}
                data={data.DO_AN_KHOA_LUAN.data}
                value={value}
                PLOList={PLOList}
                size={size}
                setState={setState}
            />
            {
                chuyenNganhKeys.map((key, index) => {
                    return (
                        <BlockSection
                            index={`E.${index+1}`}
                            title={`Các học phần thay thế KLTN Chuyên ngành ${TTKL[key].tenChuyenNganh}`}
                            data={TTKL[key].data}
                            value={value}
                            PLOList={PLOList}
                            size={size}
                            key={index + 1}
                            setState={setState}
                        />
                    )
                })
            }
        </>
    )
}

export default BlockCN