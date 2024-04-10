import { useEffect } from "react";
import { handleAutoSaveCNA, handleChangeValueCNA, handleDeleteChuyenNganh } from "../Database/HandleActionSectionA"
import { useContext } from "react";
import { UserContext } from "../../../context/ContextProvider";

function ChuyenNganhElement({ data, setState, setDelete, index, setData, currentId, currentSection }) {

    const { apiURL, fakeApi, handleBeforeUnload, isDataSaved, setIsDataSaved } = useContext(UserContext)

    useEffect(() => {
        // Thêm event listener khi component được mount
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Dọn dẹp event listener khi component bị unmount
        return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDataSaved]); // Phụ thuộc vào trạng thái của isDataSaved và isApiDone

    return (
        <div className="section-A-element">
            <input 
                value={data.tenChuyenNganh}
                type="text"
                onChange={(e) => handleChangeValueCNA(e, setState, index, setIsDataSaved)}
                onBlur = {() => handleAutoSaveCNA({ currentId, apiURL, setData })}
            />
            <button 
                onDoubleClick={() => handleDeleteChuyenNganh(setState, index, data.idChuyenNganh, apiURL, currentId)}
            >
                <i className="iconoir-minus-square"></i>
            </button>
        </div>
    )
}

export default ChuyenNganhElement