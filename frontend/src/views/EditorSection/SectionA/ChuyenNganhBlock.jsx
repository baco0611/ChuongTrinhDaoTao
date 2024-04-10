import ChuyenNganhCreate from "./ChuyenNganhCreate"
import ChuyenNganhElement from "./ChuyenNganhElement"

function ChuyenNganhBlock({ chuyenNganh, setState, setDelete, setData, currentId, currentSection }) {

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
                            setData={setData}
                            currentId={currentId}
                            currentSection={currentSection}
                        />
                    )
                })
            }
            <ChuyenNganhCreate
                setState={setState}
                chuyenNganh={chuyenNganh}
                currentId={currentId}
            />
        </div>
    )
}

export default ChuyenNganhBlock