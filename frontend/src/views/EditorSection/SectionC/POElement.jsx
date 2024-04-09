import { useParams } from "react-router-dom"
import { handleChangeValueC, handleClickDeleteC } from "../Database/HandleActionSectionC"
import { Draggable } from "react-beautiful-dnd"
import { useEffect } from "react"

function POElement({ item, type, index, typeIndex, setState, data, apiURL, setData }) {

    const { id } = useParams()
    const sourceData = data.data

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
                        onChange={() => handleChangeValueC({ type, setState })}
                        data-idctdt={id}
                        autoComplete="off"
                    />
                    <button 
                        className="minus"
                        onClick={(e) => {handleClickDeleteC({ 
                            e, 
                            idctdt: Number.parseInt(id), 
                            data: sourceData, 
                            apiURL,
                            setData
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