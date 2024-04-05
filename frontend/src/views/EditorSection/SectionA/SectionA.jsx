import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from 'react-query'
import axios from 'axios'
import { UserContext } from "../../../context/ContextProvider"
import './SectionA.scss'
import Loader from '../../../components/Loader/Loader'
import EditHeader from "../EditHeader/EditHeader"
import EditFooter from "../EditFooter/EditFooter"
import ChuyenNganhBlock from "./ChuyenNganhBlock"
import { handleUpdateDatabase, resetPage } from "../Database/HandleUpdateDatabase"

function SectionA() {

    const { id } = useParams()
    const { apiURL, fakeApi, handleBeforeUnload, isDataSaved, setIsDataSaved } = useContext(UserContext)
    const navigate = useNavigate()
    const currentSection = 0
    const currentId = id

    useEffect(() => {
        // Thêm event listener khi component được mount
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Dọn dẹp event listener khi component bị unmount
        return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDataSaved]); // Phụ thuộc vào trạng thái của isDataSaved và isApiDone

    // Use effect này để chuyển session ở trên edit header
    useEffect(() => {
        resetPage('A', id)
    }, [])

    const [ sectionAValue, setSectionAValue ] = useState({
        id,
        tenTiengViet: '',
        tenTiengAnh: '',
        trinhDoDaoTao: '',
        maNganhDaoTao: '',
        tenNganhDaoTao: '',
        khoaQuanLyChuongTrinh: '',
        doiTuongTuyenSinh: '',
        thoiGianDaoTao: '',
        loaiHinhDaoTao: '',
        soTinChiYeuCauTichLuy: '',
        dieuKienTotNghiep: '',
        vanBangTotNghiep: '',
        khaNangNangCaoTrinhDo: '',
        chuongTrinhThamKhao: '',
        viTriViecLamSauTotNghiep: ''
    })

    const [ chuyenNganh, setChuyenNganh ] = useState([])

    const [ deleteElement, setDeleteElement ] = useState([])

    // Lưu vào session storage để tiện cho việc chuyển đổi giữa các phần
    useEffect(() => {
        sessionStorage.setItem(`sectionA-${id}`, JSON.stringify(sectionAValue))
        sessionStorage.setItem(`sectionA-ChuyenNganh-${id}`, JSON.stringify(chuyenNganh))
        sessionStorage.setItem(`sectionA-delete-${id}`, JSON.stringify(deleteElement))
    })

    console.log(sectionAValue)
    console.log(isDataSaved)
    const fecthAPI = (id) => {
        const sectionAValueApi = `${apiURL}/sectionA/${id}`
        const chuyenNganhValueApi = `${apiURL}/ChuyenNganhDaoTao/${id}`

        return async () => {
            await axios.get(sectionAValueApi) 
                .then(response => {
                    const restData = response.data
                    if(restData.data[0])
                        setSectionAValue(restData.data[0])
                })
                .catch(error => {
                    console.log(error)
                    navigate('/error')
                })
                return async () => {
                    await axios.get(chuyenNganhValueApi) 
                        .then(response => {
                            const restData = response.data
                            if(restData.data)
                                setChuyenNganh(restData.data)
                            setIsDataSaved(true)
                        })
                        .catch(error => {
                            console.log(error)
                            navigate('/error')
                            setIsDataSaved(true)
                        })
                }
        }
    }

    const { isLoading, isError} = useQuery(`sectionA-${id}`, fecthAPI(id),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    function isInteger(str) {
        return Number.isInteger(+str);
    }

    const handleChangeValue = e => {
        setSectionAValue({
            ...sectionAValue,
            [e.target.name]: e.target.value
        })

        console.log(1)

        setIsDataSaved(false)
    }

    const handleChangeNumberValue = e => {
        if(isInteger(e.target.value))
            setSectionAValue({
                ...sectionAValue,
                [e.target.name]: e.target.value
            })

        setIsDataSaved(false)
    }

    const handleChangeTextArea = (e, max) => {
        const value = e.target.value

        if(value.length > max)
            setSectionAValue({
                ...sectionAValue,
                [e.target.name]: value.slice(0, max)
            })
        else
            setSectionAValue({
                ...sectionAValue,
                [e.target.name]: value
            })
        
        setIsDataSaved(false)
    }

    const setData = {
        setSectionAValue,
        setChuyenNganh,
        setDeleteElement,
        setIsDataSaved
    }

    return (
        <>
            <EditHeader 
                currentSection={currentSection}
                setData={setData}
            />
            <div id="section-A" className="section">
                <div className="section-header wrapper">
                    <h1>A. THÔNG TIN TỔNG QUÁT</h1>
                </div>
                <div className="section-A-main wrapper">
                    <p className="section-D-details">
                        <span style={{ fontWeight: 600, fontSize: '14px', color: '#BE0000' }}>
                            Lưu ý: Dữ liệu sẽ được lưu khi bấm nút ưu hoặc click chuột ra khỏi ô nhập dữ liệu
                        </span>
                    </p>
                    <div className="section-A-block">
                        <div>
                            <h4>1. Tên chương trình đào tạo (tiếng Việt)</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="tenTiengViet"
                                value={sectionAValue.tenTiengViet}
                                onChange={handleChangeValue}
                                autoComplete="off"
                                onBlur = {() => handleUpdateDatabase({ currentSection, currentId, apiURL, setData })}
                            />
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>2. Tên chương trình đào tạo (tiếng Anh)</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="tenTiengAnh"
                                value={sectionAValue.tenTiengAnh}
                                onChange={handleChangeValue}
                                autoComplete="off"
                                onBlur = {() => handleUpdateDatabase({ currentSection, currentId, apiURL, setData })}
                            />
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>3. Trình độ đào tạo</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="trinhDoDaoTao"
                                value={sectionAValue.trinhDoDaoTao}
                                onChange={handleChangeValue}
                                autoComplete="off"
                                onBlur = {() => handleUpdateDatabase({ currentSection, currentId, apiURL, setData })}
                            />
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>4. Mã ngành đào tạo </h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="maNganhDaoTao"
                                value={sectionAValue.maNganhDaoTao}
                                onChange={handleChangeValue}
                                autoComplete="off"
                                onBlur = {() => handleUpdateDatabase({ currentSection, currentId, apiURL, setData })}
                            />
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>5. Tên ngành đào tạo</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="tenNganhDaoTao"
                                value={sectionAValue.tenNganhDaoTao}
                                onChange={handleChangeValue}
                                autoComplete="off"
                                onBlur = {() => handleUpdateDatabase({ currentSection, currentId, apiURL, setData })}
                            />
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>6. Khoa quản lý chương trình</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="khoaQuanLyChuongTrinh"
                                value={sectionAValue.khoaQuanLyChuongTrinh}
                                onChange={handleChangeValue}
                                autoComplete="off"
                                onBlur = {() => handleUpdateDatabase({ currentSection, currentId, apiURL, setData })}
                            />
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>7. Đối tượng tuyển sinh</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="doiTuongTuyenSinh"
                                value={sectionAValue.doiTuongTuyenSinh}
                                onChange={handleChangeValue}
                                autoComplete="off"
                                onBlur = {() => handleUpdateDatabase({ currentSection, currentId, apiURL, setData })}
                            />
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>8. Thời gian đào tạo</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="thoiGianDaoTao"
                                value={sectionAValue.thoiGianDaoTao}
                                onChange={handleChangeNumberValue}
                                autoComplete="off"
                                style={{
                                    width: '120px',
                                    marginRight: '15px',
                                    textAlign: 'center'
                                }}
                            />
                            <span>Học kì</span>
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>9. Loại hình đào tạo</h4>
                        </div>
                        <div>
                            <select 
                                name="loaiHinhDaoTao"
                                onChange={handleChangeValue}
                                value={sectionAValue.loaiHinhDaoTao}
                            >
                                <option value={''}>Select</option>
                                <option value={'Chính quy'}>Chính quy</option>
                                <option value={'Vừa học vừa làm'}>Vừa học vừa làm</option>
                            </select>
                            <i className="ti-angle-right i-loaihinhdaotao"></i>
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>10. Số tín chỉ yêu cầu tích lũy</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="soTinChiYeuCauTichLuy"
                                value={sectionAValue.soTinChiYeuCauTichLuy}
                                onChange={handleChangeNumberValue}
                                onBlur = {() => handleUpdateDatabase({ currentSection, currentId, apiURL, setData })}
                                autoComplete="off"
                                style={{
                                    width: '120px',
                                    marginRight: '15px',
                                    textAlign: 'center'
                                }}
                            />
                            <span>Tín chỉ</span>
                        </div>
                    </div>
                    <div className="section-A-block">
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
                                        <td>D</td>
                                        <td>0.0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>12. Điều kiện tốt nghiệp</h4>
                            <ul>
                                <li>Mỗi ý được viết trên một dòng duy nhất</li>
                            </ul>
                        </div>
                        <div>
                            <textarea
                                type="text"
                                name="dieuKienTotNghiep"
                                value={sectionAValue.dieuKienTotNghiep.replaceAll('\\n', '\n')}
                                onChange={ e => handleChangeTextArea(e, 1500)}
                                rows={20}
                                autoComplete="off"
                                onBlur = {() => handleUpdateDatabase({ currentSection, currentId, apiURL, setData })}
                            />
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>13. Văn bằng tốt nghiệp</h4>
                        </div>
                        <div>
                            <select 
                                name="vanBangTotNghiep"
                                onChange={handleChangeValue}
                                value={sectionAValue.vanBangTotNghiep}
                            >
                                <option value={''}>Select</option>
                                <option value={'Cử nhân'}>Cử nhân</option>
                                <option value={'Kỹ sư'}>Kỹ sư</option>
                                <option value={'Kiến trúc sư'}>Kiến trúc sư</option>
                            </select>
                            <i className="ti-angle-right i-loaihinhdaotao"></i>
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>14. Vị trí làm việc sau khi tốt nghiệp</h4>
                            <ul>
                                <li>Mỗi ý được viết trên một dòng duy nhất</li>
                                <li>Viết tối đa 4000 kí tự</li>
                            </ul>
                        </div>
                        <div>
                            <textarea
                                type="text"
                                name="viTriViecLamSauTotNghiep"
                                value={sectionAValue.viTriViecLamSauTotNghiep}
                                onChange={ e => handleChangeTextArea(e, 1500)}
                                rows={20}
                                autoComplete="off"
                                onBlur = {() => handleUpdateDatabase({ currentSection, currentId, apiURL, setData })}
                            />
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>15. Khả năng nâng cao trình độ</h4>
                            <ul>
                                <li>Mỗi ý được viết trên một dòng duy nhất</li>
                                <li>Viết tối đa 200 kí tự</li>
                            </ul>
                        </div>
                        <div>
                            <textarea
                                type="text"
                                name="khaNangNangCaoTrinhDo"
                                value={sectionAValue.khaNangNangCaoTrinhDo.replace('\\n', '\n')}
                                onChange={e => handleChangeTextArea(e, 200)}
                                rows={20}
                                autoComplete="off"
                                onBlur = {() => handleUpdateDatabase({ currentSection, currentId, apiURL, setData })}
                            />
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>16. Chương trình chuẩn tham khảo</h4>
                            <ul>
                                <li>Mỗi ý được viết trên một dòng duy nhất</li>
                                <li>Liệt kê ít nhất 3 chương trình chuẩn đã tham chiếu khi xây dựng chuẩn đầu ra</li>
                                <li>Không quá 1500 kí tự</li>
                            </ul>
                        </div>
                        <div>
                            <textarea
                                type="text"
                                name="chuongTrinhThamKhao"
                                value={sectionAValue.chuongTrinhThamKhao}
                                onChange={ e => handleChangeTextArea(e, 1500)}
                                rows={20}
                                autoComplete="off"
                                onBlur = {() => handleUpdateDatabase({ currentSection, currentId, apiURL, setData })}
                            />
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>17. Các chuyên ngành đào tạo</h4>
                            <ul>
                                <li>Viết mỗi chuyên ngành vào một block bên cạnh.</li>
                                <li>Nếu xóa một block, dữ liệu ở khung chương trình thuộc chuyên ngành tương ứng cũng sẽ bị xóa.</li>
                                <li>Dữ liệu chỉ lưu khi bấm nút lưu hoặc hoàn tất.</li>
                            </ul>
                        </div>
                        <ChuyenNganhBlock
                            chuyenNganh={chuyenNganh}
                            setState={setChuyenNganh}
                            setDelete={setDeleteElement}
                        />
                    </div>
                </div>
            </div>
            <EditFooter 
                currentSection={0} 
                setData={{
                    setSectionAValue,
                    setChuyenNganh,
                    setDeleteElement
                }}
            />
        </>
    )
}

export default SectionA