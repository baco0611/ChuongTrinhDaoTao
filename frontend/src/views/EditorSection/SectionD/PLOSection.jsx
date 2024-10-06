import { Droppable } from "react-beautiful-dnd"
import { handleClickAddD } from "../Database/HandleActionSectionD"
import PLOElement from "./PLOElement"
import { useContext } from "react"
import { UserContext } from "../../../context/ContextProvider"
import { debounce } from 'lodash';

function PLOSection({ title, type, typeDetail, idCTDT, data, setState, setDelete, setData }) {

    const { apiURL, fakeApi, isDataSaved, setIsDataSaved, handleBeforeUnload } = useContext(UserContext)
    const typeDetailData = data[type][typeDetail]
    const sectionData = typeDetailData.data

    return (
        <Droppable
            droppableId={`${type}/${typeDetail}`}
            type="PLO"
        >
        {
            provider => (
                <div 
                    id={data.typeDetail} 
                    className="section-D-section"
                    ref={provider.innerRef}
                    {...provider.droppableProps}
                >
                    <h2>{title}</h2>
                    <div className="section-D-containt" id={typeDetail}>
                        <header className="element">
                            <h4>Kí hiệu</h4>
                            <h4>Chủ đề chuẩn đầu ra</h4>
                            <h4 className="element-question">
                                Thang đánh giá năng lực 
                                <i className="iconoir-help-circle cursorPointer"/>
                            </h4>
                            <button
                                onClick={(e) => handleClickAddD({ 
                                    e: e.target,
                                    data, 
                                    setState, 
                                    idCTDT, 
                                    type, 
                                    typeDetail, 
                                    typeIndex: typeDetailData.typeIndex, 
                                    apiURL,
                                    setData 
                                })}
                            >
                                <i className="iconoir-add-square"></i>
                            </button>
                        </header>
                        {
                            sectionData.map((item, index) => {
                                return (
                                    <PLOElement 
                                        item={item}
                                        key={index}
                                        type={type}
                                        typeDetail={typeDetail}
                                        typeIndex={typeDetailData.typeIndex}
                                        setState={setState}
                                        data={sectionData}
                                        setDelete={setDelete}
                                        index={index}
                                        setData={setData}
                                    />
                                )
                            })
                        }
                    </div>
                    {provider.placeholder}
                </div>
            )
        }
        </Droppable>
    )
}

export default PLOSection