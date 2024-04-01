import { Outlet } from "react-router-dom";
import EditHeader from "../../views/EditorSection/EditHeader/EditHeader";
import EditFooter from "../../views/EditorSection/EditFooter/EditFooter";
import './EditorLayout.scss'

function EditorLayout() {
    return (
        <div>
            <Outlet/>
        </div>
    )
}

export default EditorLayout