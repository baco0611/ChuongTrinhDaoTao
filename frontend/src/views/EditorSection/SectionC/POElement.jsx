import { useParams } from "react-router-dom"
import { handleAutoSaveC, handleChangeValueC, handleClickDeleteC } from "../Database/HandleActionSectionC"
import { Draggable } from "react-beautiful-dnd"
import { useContext, useEffect } from "react"
import { UserContext } from "../../../context/ContextProvider"

function POElement({ item, type, index, typeIndex, setState, data, apiURL, setData }) {

    const { id } = useParams()
    const { isDataSaved, setIsDataSaved, handleBeforeUnload } = useContext(UserContext)
    const sourceData = data.data

    //Use effec6t này để thêm phần remind thông tin chưa đc lưu
    useEffect(() => {
        // Thêm event listener khi component được mount
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Dọn dẹp event listener khi component bị unmount
        return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDataSaved]); // Phụ thuộc vào trạng thái của isDataSaved và isApiDone

    useEffect(() => {
        const elements = document.querySelectorAll('textarea')

        elements.forEach(item => {
            item.style.height = 'auto'
            item.style.height = `${item.scrollHeight}px`
        })
    })

    return (
        <Draggable 
            draggableId={`drag-${type}-${index}`}
            index={index}
        >
        {
            provided => (
                <div 
                    className="element"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <label htmlFor={`${type}-${index}`}>{item.kiHieu}</label>
                    <textarea 
                        id={`${type}-${index}`}
                        placeholder="Mục tiêu cụ thể"
                        value={item.noiDung || " "}    
                        data-typeindex={typeIndex}
                        data-type={type}
                        data-index={index+1}
                        data-id={item.id}
                        onChange={() => handleChangeValueC({ type, setState, setIsDataSaved })}
                        data-idctdt={id}
                        autoComplete="off"
                        onBlur={() => handleAutoSaveC({
                            id: Number.parseInt(id),
                            apiURL,
                            setData,
                            setIsDataSaved
                        })}
                    />
                    <button 
                        className="minus"
                        onDoubleClick={(e) => {handleClickDeleteC({ 
                            e, 
                            idctdt: Number.parseInt(id), 
                            data: sourceData, 
                            apiURL,
                            setData,
                            type
                        })}}
                    >
                        <i className="iconoir-minus-square"></i>
                    </button>
                </div>
            )
        }
        </Draggable>
    )
}

export default POElement