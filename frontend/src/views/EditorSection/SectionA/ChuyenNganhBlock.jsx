import ChuyenNganhCreate from "./ChuyenNganhCreate"
import ChuyenNganhElement from "./ChuyenNganhElement"

function ChuyenNganhBlock({ chuyenNganh, setState, setDelete }) {

    return (
        <div className="section-A-chuyenNganh">
            {
                chuyenNganh.map((element, index) => {
                    return (
                        <ChuyenNganhElement
                            key={index}
                            data={element}
                            setState={setState}
                            setDelete={setDelete}
                            chuyenNganh={chuyenNganh}
                            index={index}
                        />
                    )
                })
            }
            <ChuyenNganhCreate
                setState={setState}
            />
        </div>
    )
}

export default ChuyenNganhBlock