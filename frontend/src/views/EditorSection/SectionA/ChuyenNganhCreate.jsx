import { useContext } from "react"
import { handleAddChuyenNganh } from "../Database/HandleActionSectionA"
import { UserContext } from "../../../context/ContextProvider"

function ChuyenNganhCreate({ setState, chuyenNganh, currentId }) {
    const { apiURL, fakeApi } = useContext(UserContext)

    return (
        <button 
            className="add-btn"
            onClick={() => handleAddChuyenNganh(setState, chuyenNganh, currentId, apiURL)}
        >
            Thêm chuyên ngành
        </button>
    )
}

export default ChuyenNganhCreate