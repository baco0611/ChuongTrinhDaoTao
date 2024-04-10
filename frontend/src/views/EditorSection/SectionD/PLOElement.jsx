import { useParams } from "react-router-dom"
import { handleAutoSaveD, handleChangeValueD, handleClickDeleteD } from "../Database/HandleActionSectionD"
import { Draggable } from "react-beautiful-dnd"
import { useEffect } from "react"
import { useContext } from "react"
import { UserContext } from "../../../context/ContextProvider"

function PLOElement({ item, type, index, typeDetail, setState, setDelete, data, typeIndex, setData }) {
    const { id } = useParams()
    const { apiURL, fakeApi, isDataSaved, setIsDataSaved, handleBeforeUnload } = useContext(UserContext)
    const sourceData = data

    useEffect(() => {
        const elements = document.querySelectorAll('textarea')

        elements.forEach(item => {
            item.style.height = 'auto'
            item.style.height = `${item.scrollHeight}px`
        })
    })

    return (
        <Draggable
            draggableId={`drag-${typeDetail}-${index}`}
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
                    <label htmlFor={`${typeDetail}-${index}`}>{item.kiHieu}</label>
                    <textarea 
                        id={`${typeDetail}-${index}`}
                        placeholder="Chủ đề chuẩn đầu ra"
                        value={item.noiDung}
                        data-typeindex={typeIndex}
                        data-type={type}
                        data-typedetail={typeDetail}
                        data-id={item.id}
                        data-index={index+1}
                        data-idctdt={id}
                        autoComplete="off"
                        onChange={() => handleChangeValueD({ typeDetail, setState, type, setIsDataSaved })}
                        onBlur={() => handleAutoSaveD({ currentId: id, apiURL, setData})}
                    />
                    <input
                        placeholder="Trình độ năng lực"
                        value={item.trinhDoNangLuc}
                        onChange={(e) => {
                            const number = Number.parseInt(e.target.value)
                            if(!(number >= 1 && number <= 5)) e.target.value = 0
                            else e.target.value = number
                            handleChangeValueD({ typeDetail, setState, type, setIsDataSaved })
                        }}
                        onBlur={() => handleAutoSaveD({ currentId: id, apiURL, setData})}
                    />
                    <button 
                        className="minus"
                        onClick={(e) => {handleClickDeleteD({ e, setState, data: sourceData, setDelete, idctdt: Number.parseInt(id), apiURL })}}
                    >
                        <i className="iconoir-minus-square"></i>
                    </button>
                </div>
            )
        }
        </Draggable>
    )
}

export default PLOElement