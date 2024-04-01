import { useContext, useEffect, useState } from "react"
import SectionGSection from "./SectionGSection"

function SectionGCN({ data, setState }) {

    const chuyenNganhKeys = Object.keys(data.CHUYEN_NGANH.data)
    const chuyenNganhValue = data.CHUYEN_NGANH.data
    const TTKL = data.THAY_THE_KHOA_LUAN.data

    return (
        <>
            <SectionGSection
                title={'Kiến thức cơ sở ngành'}
                index={'A'}
                data={data.CO_SO_NGANH}
                setState={setState}
            />
            <SectionGSection
                title={'Kiến thức ngành'}
                index={'B'}
                data={data.NGANH}
                setState={setState}
            />
            {
                chuyenNganhKeys.map((key, index) => {
                    return (
                        <SectionGSection
                            key={index}
                            title={`Kiến thức chuyên ngành ${chuyenNganhValue[key].tenChuyenNganh}`}
                            index={`B.${index+1}`}
                            data={chuyenNganhValue[key]}
                            setState={setState}
                            idChuyenNganh={key}
                        />
                    )
                })
            }
            <SectionGSection
                title={'Kiến thức bổ trợ'}
                index={'C'}
                data={data.BO_TRO}
                setState={setState}
            />
            <SectionGSection
                title={'Kiến thức thực tập, thực tế'}
                index={'D'}
                data={data.THUC_TAP}
                setState={setState}
            />
            <SectionGSection
                title={'ĐATN, KLTN hoặc học phần thay thế KLTN'}
                index={'E'}
                data={data.DO_AN_KHOA_LUAN}
                setState={setState}
            />
            {
                chuyenNganhKeys.map((key, index) => {
                    return (
                        <SectionGSection
                            key={index}
                            title={`Các học phần thay thế KLTN Chuyên ngành ${TTKL[key].tenChuyenNganh}`}
                            index={`E.${index+1}`}
                            data={TTKL[key]}
                            setState={setState}
                            idChuyenNganh={key}
                        />
                    )
                })
            }
        </>
    )
}

export default SectionGCN