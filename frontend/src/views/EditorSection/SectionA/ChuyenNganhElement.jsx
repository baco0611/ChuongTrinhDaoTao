import { handleChangeValueA, handleDeleteChuyenNganh } from "../Database/HandleActionSectionA"

function ChuyenNganhElement({ data, setState, setDelete, index }) {
    return (
        <div className="section-A-element">
            <input 
                value={data.tenChuyenNganh}
                type="text"
                onChange={(e) => handleChangeValueA(e, setState, index)}
            />
            <button 
                onClick={() => handleDeleteChuyenNganh(setState, setDelete, index, data.idChuyenNganh)}
            >
                <i className="iconoir-minus-square"></i>
            </button>
        </div>
    )
}

export default ChuyenNganhElement