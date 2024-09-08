import "./SectionA.scss"
import "../EditorSection.scss"
import EditorHeader from '../EditorHeader/EditorHeader'
import { useContext, useEffect, useMemo, useState } from "react"
import EditorFooter from "../EditorFooter/EditorFooter"
import { UserContext } from "../../../context/ContextProvider"
import SpecializationBlock from "./SpecializationBlock"
import { useNavigate, useParams } from "react-router-dom"
import { getDataSectionA, handleChangeValue, saveChangeSectionAInfo } from "../database/sectionA"
import { useQuery } from "react-query"
import Loader from "../../../components/Loader/Loader"

export default function SectionA() {

    const { id } = useParams()
    const currentId = id
    const navigate = useNavigate()

    const { user, apiURL, token, serverAPI, isDataSaved, setIsDataSaved, handleBeforeUnload } = useContext(UserContext)

    // Scroll lên đầu trang mỗi khi mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // Chặn hành động refresh hay tắt trang khi dữ liệu chưa được lưu
    useEffect(() => {
        // Thêm event listener khi component được mount
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Dọn dẹp event listener khi component bị unmount
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDataSaved])

    const [ sectionAValue, setSectionAValue ] = useState(
        JSON.parse(sessionStorage.getItem(`sectionA-${id}`)) ||
        {
            vietnameseName: "",
            englishName: "",
            educationLevel: "",
            fieldCode: "",
            fieldName: "",
            managingDepartment: "",
            admissionTarget: "",
            duration: "",
            trainingMode: "",
            requiredCredits: "",
            graduationConditional: "",
            diploma: "",
            employmentPositionAfterGraduation: "",
            advancedSkillsDevelopment: "",
            referenceProgram: "",
        }
    )

    const [ specialization, setSpecialization ] = useState(
        JSON.parse(sessionStorage.getItem(`sectionA-specialization-${id}`)) ||
        []
    )

    useEffect(() => {
        sessionStorage.setItem(`sectionA-${id}`, JSON.stringify(sectionAValue))
        sessionStorage.setItem(`sectionA-specialization-${id}`, JSON.stringify(specialization))
    }, [sectionAValue, specialization])

    // Lấy dữ liệu từ db
    const fetchAPI = (id) => {
        return async () => {
            return await getDataSectionA({
                id,
                api: serverAPI,
                token,
                setIsDataSaved,
                setSpecialization,
                setSectionAValue
            })
        }
    }

    const { data , isLoading, isError} = useQuery(`sectionA-${id}`, fetchAPI(id),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    return (
        <>
            <EditorHeader
                currentSection={0}
            />
            <div id="sectionA" className="wrapper editor-section">
                <div className="title">
                    <h1>A. Thông tin tổng quát</h1>
                    <p>Lưu ý: Dữ liệu sẽ được lưu tự động khi click chuột ra khỏi ô nhập dữ liệu hoặc chuyển đổi giữa các phần. Vui lòng không reload hay thoát khỏi trang khi dữ liệu chưa được lưu.</p>
                </div>

                <div className="content">
                    <div className="sectionA-block">
                        <div>
                            <h4>1. Tên chương trình đào tạo (tiếng Việt)</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="vietnameseName"
                                autoComplete="off"
                                value={sectionAValue.vietnameseName}
                                onChange={e => handleChangeValue({ e, setSectionAValue, setIsDataSaved })}
                                onBlur={async () => saveChangeSectionAInfo({ id, api: serverAPI, payload: sectionAValue, token, setIsDataSaved})}
                            />
                        </div>
                    </div>
                    <div className="sectionA-block">
                        <div>
                            <h4>2. Tên chương trình đào tạo (tiếng Anh)</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="englishName"
                                autoComplete="off"
                                value={sectionAValue.englishName}
                                onChange={e => handleChangeValue({ e, setSectionAValue, setIsDataSaved })}
                                onBlur={async () => saveChangeSectionAInfo({ id, api: serverAPI, payload: sectionAValue, token, setIsDataSaved})}
                            />
                        </div>
                    </div>
                    <div className="sectionA-block">
                        <div>
                            <h4>3. Trình độ đào tạo</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="educationLevel"
                                autoComplete="off"
                                value={sectionAValue.educationLevel}
                                onChange={e => handleChangeValue({ e, setSectionAValue, setIsDataSaved })}
                                onBlur={async () => saveChangeSectionAInfo({ id, api: serverAPI, payload: sectionAValue, token, setIsDataSaved})}
                            />
                        </div>
                    </div>
                    <div className="sectionA-block">
                        <div>
                            <h4>4. Mã ngành đào tạo</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="fieldCode"
                                autoComplete="off"
                                value={sectionAValue.fieldCode}
                                onChange={e => handleChangeValue({ e, setSectionAValue, setIsDataSaved })}
                                onBlur={async () => saveChangeSectionAInfo({ id, api: serverAPI, payload: sectionAValue, token, setIsDataSaved})}
                            />
                        </div>
                    </div>
                    <div className="sectionA-block">
                        <div>
                            <h4>5. Tên ngành đào tạo</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="fieldName"
                                autoComplete="off"
                                value={sectionAValue.fieldName}
                                onChange={e => handleChangeValue({ e, setSectionAValue, setIsDataSaved })}
                                onBlur={async () => saveChangeSectionAInfo({ id, api: serverAPI, payload: sectionAValue, token, setIsDataSaved})}
                            />
                        </div>
                    </div>
                    <div className="sectionA-block">
                        <div>
                            <h4>6. Khoa quản lý chương trình</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="managingDepartment"
                                autoComplete="off"
                                value={sectionAValue.managingDepartment}
                                onChange={e => handleChangeValue({ e, setSectionAValue, setIsDataSaved })}
                                onBlur={async () => saveChangeSectionAInfo({ id, api: serverAPI, payload: sectionAValue, token, setIsDataSaved})}
                            />
                        </div>
                    </div>
                    <div className="sectionA-block">
                        <div>
                            <h4>7. Đối tượng tuyển sinh</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="admissionTarget"
                                autoComplete="off"
                                value={sectionAValue.admissionTarget}
                                onChange={e => handleChangeValue({ e, setSectionAValue, setIsDataSaved })}
                                onBlur={async () => saveChangeSectionAInfo({ id, api: serverAPI, payload: sectionAValue, token, setIsDataSaved})}
                            />
                        </div>
                    </div>
                    <div className="sectionA-block">
                        <div>
                            <h4>8. Thời gian đào tạo</h4>
                        </div>
                        <div className="half-block">
                            <input
                                type="text"
                                name="duration"
                                autoComplete="off"
                                value={sectionAValue.duration}
                                onChange={e => handleChangeValue({ e, name: "number", setSectionAValue, setIsDataSaved })}
                                onBlur={async () => saveChangeSectionAInfo({ id, api: serverAPI, payload: sectionAValue, token, setIsDataSaved})}
                            />
                            <span>Học kì</span>
                        </div>
                    </div>
                    <div className="sectionA-block">
                        <div>
                            <h4>9. Loại hình đào tạo</h4>
                        </div>
                        <div>
                            <select 
                                name="trainingMode"
                                value={sectionAValue.trainingMode}
                                onChange={e => handleChangeValue({ e, setSectionAValue, setIsDataSaved })} 
                                onBlur={async () => saveChangeSectionAInfo({ id, api: serverAPI, payload: sectionAValue, token, setIsDataSaved})}
                            >
                                <option value="">--- chọn ---</option>
                                <option value="chinh_quy">Chính quy</option>
                                <option value="vua_hoc_vua_lam">Vừa học vừa làm</option>
                            </select>
                        </div>
                    </div>
                    <div className="sectionA-block">
                        <div>
                            <h4>10. Số tính chỉ yêu cầu tích lũy</h4>
                        </div>
                        <div className="half-block">
                            <input
                                type="text"
                                name="requiredCredits"
                                autoComplete="off"
                                value={sectionAValue.requiredCredits}
                                onChange={e => handleChangeValue({ e, name: "number", setSectionAValue, setIsDataSaved })}
                                onBlur={async () => saveChangeSectionAInfo({ id, api: serverAPI, payload: sectionAValue, token, setIsDataSaved})}
                            />
                            <span>Tín chỉ</span>
                        </div>
                    </div>
                    <div className="sectionA-block">
                        <div>
                            <h4>11. Thang điểm</h4>
                        </div>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Điểm hệ 10</th>
                                        <th>Điểm chữ</th>
                                        <th>Điểm hệ 4</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>8.5 - 10</td>
                                        <td>A</td>
                                        <td>4.0</td>
                                    </tr>
                                    <tr>
                                        <td>7.0 - 8.4</td>
                                        <td>B</td>
                                        <td>3.0</td>
                                    </tr>
                                    <tr>
                                        <td>5.5 - 6.9</td>
                                        <td>C</td>
                                        <td>2.0</td>
                                    </tr>
                                    <tr>
                                        <td>4.0 - 5.4</td>
                                        <td>D</td>
                                        <td>4.0</td>
                                    </tr>
                                    <tr>
                                        <td>Dưới 4.0</td>
                                        <td>F</td>
                                        <td>0.0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="sectionA-block">
                        <div>
                            <h4>12. Điều kiện tốt nghiệp</h4>
                            <ul>
                                <li>Mỗi ý được viết trên một dòng duy nhất</li>
                            </ul>
                        </div>
                        <div>
                            <textarea
                                name="graduationConditional"
                                value={sectionAValue.graduationConditional}
                                autoComplete="off"
                                onChange={(e) => handleChangeValue({ e, setSectionAValue, setIsDataSaved })}
                                onBlur={async () => saveChangeSectionAInfo({ id, api: serverAPI, payload: sectionAValue, token, setIsDataSaved})}
                            />
                        </div>
                    </div>
                    <div className="sectionA-block">
                        <div>
                            <h4>13. Văn bằng tốt nghiệp</h4>
                        </div>
                        <div>
                            <select 
                                name="diploma"
                                value={sectionAValue.diploma}
                                onChange={e => handleChangeValue({ e, setSectionAValue, setIsDataSaved })} 
                                onBlur={async () => saveChangeSectionAInfo({ id, api: serverAPI, payload: sectionAValue, token, setIsDataSaved})}
                            >
                                <option value="">--- chọn ---</option>
                                <option value="cu_nhan">Cử nhân</option>
                                <option value="ky_su">Kỹ sư</option>
                                <option value="kien_truc_su">Kiến trúc sư</option>
                            </select>
                        </div>
                    </div>
                    <div className="sectionA-block">
                        <div>
                            <h4>14. Vị trí làm việc sau khi tốt nghiệp</h4>
                            <ul>
                                <li>Mỗi ý được viết trên một dòng duy nhất</li>
                                <li>Viết tối đa 4000 kí tự</li>
                            </ul>
                        </div>
                        <div>
                            <textarea
                                name="employmentPositionAfterGraduation"
                                value={sectionAValue.employmentPositionAfterGraduation}
                                autoComplete="off"
                                onChange={(e) => handleChangeValue({ e, name: "textarea", max: 4000, setSectionAValue, setIsDataSaved })}
                                onBlur={async () => saveChangeSectionAInfo({ id, api: serverAPI, payload: sectionAValue, token, setIsDataSaved})}
                            />
                        </div>
                    </div>
                    <div className="sectionA-block">
                        <div>
                            <h4>15. Khả năng nâng cao trình độ</h4>
                            <ul>
                                <li>Mỗi ý được viết trên một dòng duy nhất</li>
                                <li>Viết tối đa 200 kí tự</li>
                            </ul>
                        </div>
                        <div>
                            <textarea
                                name="advancedSkillsDevelopment"
                                value={sectionAValue.advancedSkillsDevelopment}
                                autoComplete="off"
                                onChange={(e) => handleChangeValue({ e, name: "textarea", max: 200, setSectionAValue, setIsDataSaved })}
                                onBlur={async () => saveChangeSectionAInfo({ id, api: serverAPI, payload: sectionAValue, token, setIsDataSaved})}
                            />
                        </div>
                    </div>
                    <div className="sectionA-block">
                        <div>
                            <h4>16. Chương trình chuẩn tham khảo</h4>
                            <ul>
                                <li>Mỗi ý được viết trên một dòng duy nhất</li>
                                <li>Liệt kê ít nhất 3 chương trình chuẩn đã tham chiếu khi xây dựng chuẩn đầu ra</li>
                                <li>Viết tối đa 1500 kí tự</li>
                            </ul>
                        </div>
                        <div>
                            <textarea
                                name="referenceProgram"
                                value={sectionAValue.referenceProgram}
                                autoComplete="off"
                                onChange={(e) => handleChangeValue({ e, name: "textarea", max: 1500, setSectionAValue, setIsDataSaved })}
                                onBlur={async () => saveChangeSectionAInfo({ id, api: serverAPI, payload: sectionAValue, token, setIsDataSaved})}
                            />
                        </div>
                    </div>
                    <div className="sectionA-block">
                        <div>
                            <h4>17. Các chuyên ngành đào tạo</h4>
                            <ul>
                                <li>Viết mỗi chuyên ngành vào một block bên cạnh.</li>
                                <li>Xóa block bằng cách double click vào nút tương ứng</li>
                                <li>Nếu xóa một block, dữ liệu ở khung chương trình thuộc chuyên ngành tương ứng cũng sẽ bị xóa.</li>
                                <li>Dữ liệu được tự động lưu khi thêm, xóa hay click khỏi ô nhập dữ liệu</li>
                            </ul>
                        </div>
                        <div>
                            <SpecializationBlock
                                data={specialization}
                                setSpecialization={setSpecialization}
                                isDataSaved={isDataSaved}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <EditorFooter
                currentSection={0}
            />
        </>
    )
}
