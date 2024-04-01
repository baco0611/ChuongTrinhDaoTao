import { handleAddChuyenNganh } from "../Database/HandleActionSectionA"

function ChuyenNganhCreate({ setState }) {
    return (
        <button 
            className="add-btn"
            onClick={() => handleAddChuyenNganh(setState)}
        >
            Thêm chuyên ngành
        </button>
    )
}

export default ChuyenNganhCreate