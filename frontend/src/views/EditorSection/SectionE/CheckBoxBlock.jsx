import { handleChangValueE } from "../Database/HandleActionSectionE"

function CheckBox({ list, PLOId, value, setState }) {

    const valueList = {}

    value.forEach(item => {
        let { PLO, PO, id, isCheck } = item
       
        if(!valueList[PLO]) {
            valueList[PLO] = {
                [PO]: {
                    id,
                    isCheck
                }
            }     
        } else valueList[PLO][PO] = {id, isCheck}
    })

    return (
        <>
            {
                list.map((PO, index) => {
                    const data_po = PO.id
                    const data_plo = PLOId
                    const dataCheck = valueList[data_plo]

                    if(dataCheck) {
                        if(dataCheck[data_po])
                            return (
                                <td key={index} className="input">
                                    <input 
                                        type="checkbox"
                                        data-po={data_po}
                                        data-plo={data_plo}
                                        data-id={dataCheck[data_po].id != '' && dataCheck[data_po].id}
                                        onChange={() => handleChangValueE(setState, valueList)}
                                        checked={dataCheck[data_po].isCheck}
                                        id={`${data_plo}-${data_po}`}
                                    />
                                    <label htmlFor={`${data_plo}-${data_po}`}>
                                        <span></span>
                                    </label>
                                </td>
                            )
                    }

                    return (
                        <td key={index} className="input">
                            <input 
                                type="checkbox"
                                data-po={data_po}
                                data-plo={data_plo}
                                onChange={() => handleChangValueE(setState, valueList)}
                                id={`${data_plo}-${data_po}`}
                            />
                            <label htmlFor={`${data_plo}-${data_po}`}>
                                <span></span>
                            </label>
                        </td>
                    )
                })
            }
        </>
    )
}

function CheckBoxBlock({ POList, PLOId, value, setState }) {
    return (
        <>
            <CheckBox 
                PLOId={PLOId}
                list={POList.KIEN_THUC.data}
                value={value}
                setState={setState}
            />
            <CheckBox 
                PLOId={PLOId}
                list={POList.KY_NANG.data}
                value={value}
                setState={setState}
            />
            <CheckBox 
                PLOId={PLOId}
                list={POList.THAI_DO.data}
                value={value}
                setState={setState}
            />
        </>
    )
}

export default CheckBoxBlock