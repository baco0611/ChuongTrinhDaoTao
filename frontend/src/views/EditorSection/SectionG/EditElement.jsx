import { useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../../context/ContextProvider"
import axios from "axios"
import swal from 'sweetalert'
import SearchItem from "./SearchItem"
import { getParent } from "../Database/HandleUpdateDatabase"
import { deleteSubject, searchHocPhan, updateSubject } from "../Database/HandleActionSectionG"
import TienQuyetRecommend from "./TienQuyetRecommend"

function EditElement({ data, setEdit, setState }) {

    const { id } = useParams()
    const { apiURL, fakeApi } = useContext(UserContext)

    const {
        idDeCuongHocPhan,
        thayTheKhoaLuan,
        batBuoc,
        tienQuyet,
        hocTruoc,
        songHanh,
        hocKy,
        khoiKienThuc,
        chiTietKhoiKienThuc,
        idChuyenNganh,
        maHocPhan,
        tenHocPhan
    } = data

    const [ editValue, setEditValue ] = useState({
        id: data.id,
        idDeCuongHocPhan: idDeCuongHocPhan,
        thayTheKhoaLuan: thayTheKhoaLuan,
        batBuoc: batBuoc,
        tienQuyet: tienQuyet,
        hocTruoc: hocTruoc,
        songHanh: songHanh,
        hocKy: hocKy,
        khoiKienThuc: khoiKienThuc,
        chiTietKhoiKienThuc: chiTietKhoiKienThuc,
        idChuyenNganh: idChuyenNganh,
        maHocPhan: maHocPhan,
        tenHocPhan: tenHocPhan
    })

    const [ soHocKy, setSoHocKy ] = useState(8)
    const [ isSearch, setIsSearch ] = useState(false)
    const [ searchValue, setSearchValue] = useState([])
    const [ isSearchTienQuyet, setIsSearchTienQuyet ] = useState(false)
    const [ isSearchHocTruoc, setIsSearchHocTruoc ] = useState(false)
    const [ isSearchSongHanh, setIsSearchSongHanh ] = useState(false)
    const typingTimeOutRef = useRef(null)

    useEffect(() => {
        const sectionAValueApi = `${apiURL}/sectionA/${id}`
        axios.get(sectionAValueApi) 
            .then(response => {
                const restData = response.data
                if(restData.data[0])
                    setSoHocKy(restData.data[0].thoiGianDaoTao)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const handleChangeHocKy = (e) => {
        const elementValue = e.target

        let value = Number.parseInt(elementValue.value)
        if(value >= 1 && value<=soHocKy)
            value = value
        else 
            value = ''
        setEditValue({
            ...editValue,
            [elementValue.name]: value
        })
    }

    const handleChangeCheckBox = (e) => {
        let value = !editValue[e.target.name]

        if(chiTietKhoiKienThuc != 'DO_AN_KHOA_LUAN') {
            if(e.target.name == 'thayTheKhoaLuan')
                value = false
        }

        setEditValue({
            ...editValue,
            [e.target.name]: value
        })
    }

    const handleClose = () => {
        setEdit(false)
    }

    const handleChoiceSubject = (e) => {
        const element = getParent(e.target, 'searchItem')
        const dataSet = element.dataset
        setEditValue(prev => {
            return {
                ...prev,
                idDeCuongHocPhan: dataSet.id,
                tenHocPhan: dataSet.name,
                maHocPhan: dataSet.ma
            }
        })
        setIsSearch(false)
    }

    const handleInput = async (e, api) => {
        const value = e.target.value

        setIsSearch(true)
        setEditValue({
            ...editValue,
            [e.target.name]: value
        })

        if(typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current)
        }

        typingTimeOutRef.current = await setTimeout(async()=>{
            const searchValueApi = await searchHocPhan(value, apiURL, api)

            setSearchValue(searchValueApi)
        }, 300)
    }

    const handleBlurSearch = e => {
        const element = getParent(e.target, 'search')

        if(!element) setIsSearch(false)
    }

    const handleSave = (e) => {
        e.preventDefault()

        if(editValue.idDeCuongHocPhan == '' &  editValue.hocKy == '')
        {
            swal({
                title: 'Chưa điền thông tin',
                text: 'Vui lòng chọn học phần và học kỳ tương ứng!',
                icon: 'error',
                dangerMode: true
            })
        }
        else
        if(editValue.idDeCuongHocPhan == '') {
            swal({
                title: 'Chưa điền thông tin',
                text: 'Vui lòng chọn học phần hợp lệ!',
                icon: 'error',
                dangerMode: true
            })
        }
        else
        if(editValue.hocKy == '') {
            swal({
                title: 'Chưa điền thông tin',
                text: 'Vui lòng nhập học kỳ tương ứng!',
                icon: 'error',
                dangerMode: true
            })
        }
        else {
            handleClose()
            updateSubject(id, apiURL, editValue, setState)
        }
    }

    const handleDelete = e => {
        e.preventDefault()

        swal({
            title: `Bạn muốn xóa học phần`,
            text: `${editValue.tenHocPhan} (${editValue.maHocPhan})`,
            icon: 'warning',
            buttons:{
                delete: {
                    text: "Xóa",
                    closeModal: false,
                    className: "section-G-deleteBtn",
                },
                notDelete: {
                    text: "Không",
                    closeModal: true
                }
            }
        })
        .then(name => {
            if(name == 'delete') {
                const response = deleteSubject(id, apiURL, editValue.id, setState)
                console.log(response)
                swal.stopLoading();
                swal.close();
            }
        })
    }

    return (
        <div className="section-G-create" onClick={handleBlurSearch}>
            <div className="section-G-createMain">
                <h1>Chỉnh sửa học phần</h1>
                <form>
                    <div className="flexGroup">
                        <div className="formGroup search" style={{width: '30%'}}>
                            <label htmlFor="maHocPhan">Mã học phần</label>
                            <input
                                id="maHocPhan"
                                type="text"
                                name="maHocPhan" 
                                value={editValue.maHocPhan}   
                                style={{width: '50%'}}
                                autoComplete="off"
                                onChange={e => handleInput(e, '/search_maHocPhan')}
                                onFocus={(e) => {
                                    handleInput(e, '/search_maHocPhan')
                                    setIsSearch(true)
                                }}
                            />
                        </div>
                        <div className="formGroup search" style={{width: '60%'}}>
                            <label htmlFor="tenHocPhan">Tên học phần</label>
                            <input 
                                id="tenHocPhan"    
                                type="text"
                                name="tenHocPhan"  
                                value={editValue.tenHocPhan}  
                                style={{width: '75%'}}
                                autoComplete="off"
                                onInput={e => handleInput(e, '/search_tenHocPhan')}
                                onFocus={(e) => {
                                    handleInput(e, '/search_tenHocPhan')
                                    setIsSearch(true)
                                }}
                            />
                        </div>
                        {
                            isSearch &&
                            <ul id="searchBox" className="search">
                            {
                                searchValue.map((item, index) => {
                                    return (
                                        <SearchItem
                                            key={index}
                                            item={item}
                                            handleChoiceSubject={handleChoiceSubject}
                                        />
                                    )
                                })
                            }
                            </ul>
                        }
                    </div>
                    <div className="flexGroup">
                        <div className="formGroup">
                            <label htmlFor="batBuoc">Bắt buộc</label>
                            <input 
                                id="batBuoc"
                                type="checkBox"
                                name="batBuoc"
                                checked={editValue.batBuoc}
                                onChange={e => handleChangeCheckBox(e)}
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="hocKy">Học kỳ</label>
                            <input
                                id="hocKy"
                                type="text"
                                name="hocKy"
                                value={editValue.hocKy}  
                                autoComplete="off"
                                onChange={e => handleChangeHocKy(e)}
                            />
                        </div>
                    </div>
                    <div className="formGroup flexStart">
                        <div className="subject">
                            <h4>Tiên quyết</h4>
                            <ul>
                                {
                                    editValue.tienQuyet.map((item, index) => {
                                        return <li key={index}>{item}</li>
                                    })
                                }
                                <li>
                                    <div
                                        className="btn"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setIsSearchTienQuyet(true)
                                        }}
                                    >Thêm học phần</div>
                                    {
                                        isSearchTienQuyet &&
                                        <TienQuyetRecommend
                                            setClose={() => setIsSearchTienQuyet(false)}
                                            setState={setEditValue}
                                            apiURL={apiURL}
                                            type={'tienQuyet'}
                                        />
                                    }
                                </li>
                            </ul>
                        </div>
                        <div className="subject">
                            <h4>Học trước</h4>
                            <ul>
                                {
                                    editValue.hocTruoc.map((item, index) => {
                                        return <li key={index}>{item}</li>
                                    })
                                }
                            </ul>
                            <li>
                                    <div
                                        className="btn"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setIsSearchHocTruoc(true)
                                        }}
                                    >Thêm học phần</div>
                                    {
                                        isSearchHocTruoc &&
                                        <TienQuyetRecommend
                                            setClose={() => setIsSearchHocTruoc(false)}
                                            setState={setEditValue}
                                            apiURL={apiURL}
                                            type={'hocTruoc'}
                                        />
                                    }
                                </li>
                        </div>
                        <div className="subject">
                            <h4>Song hành</h4>
                            <ul>
                                {
                                    editValue.songHanh.map((item, index) => {
                                        return <li key={index}>{item}</li>
                                    })
                                }
                            </ul>
                            <li>
                                    <div
                                        className="btn"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setIsSearchSongHanh(true)
                                        }}
                                    >Thêm học phần</div>
                                    {
                                        isSearchSongHanh &&
                                        <TienQuyetRecommend
                                            setClose={() => setIsSearchSongHanh(false)}
                                            setState={setEditValue}
                                            apiURL={apiURL}
                                            type={'songHanh'}
                                        />
                                    }
                                </li>
                        </div>
                    </div>
                </form>
                <div className="navigate">
                    <button
                        onClick={handleClose}
                    >Hủy bỏ</button>
                    <button
                        onClick={handleSave}
                    >Lưu học phần</button>
                    <button
                        onClick={handleDelete}
                        className="delete"
                    >Xóa học phần</button>
                </div>
            </div>
        </div>
    )
}

export default EditElement