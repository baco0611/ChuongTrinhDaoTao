import { useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../../context/ContextProvider"
import axios from "axios"
import { getParent } from "../Database/HandleUpdateDatabase"
import { createSubject, searchHocPhan } from "../Database/HandleActionSectionG"
import SearchItem from "./SearchItem"
import swal from 'sweetalert'
import TienQuyetRecommend from "./TienQuyetRecommend"

function CreateElement({ khoiKienThuc, chiTietKhoiKienThuc, idChuyenNganh, setCreate, setState, stt }) {
    
    console.log(chiTietKhoiKienThuc)
    const { id } = useParams()
    const { apiURL, fakeApi } = useContext(UserContext)

    const [ createValue, setCreateValue ] = useState({
        idDeCuongHocPhan: '',
        thayTheKhoaLuan: chiTietKhoiKienThuc == 'THAY_THE_KHOA_LUAN' ? true : false,
        batBuoc: false,
        tienQuyet: [],
        hocTruoc: [],
        songHanh: [],
        hocKy: '',
        khoiKienThuc: khoiKienThuc,
        chiTietKhoiKienThuc: chiTietKhoiKienThuc ? chiTietKhoiKienThuc : '',
        idChuyenNganh: idChuyenNganh ? idChuyenNganh : '',
        maHocPhan: '',
        tenHocPhan: '',
        stt: stt
    })

    console.log(stt)

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
        setCreateValue({
            ...createValue,
            [elementValue.name]: value
        })
    }

    const handleChangeCheckBox = (e) => {
        let value = !createValue[e.target.name]

        if(chiTietKhoiKienThuc != 'DO_AN_KHOA_LUAN') {
            if(e.target.name == 'thayTheKhoaLuan')
                value = false
        }

        setCreateValue({
            ...createValue,
            [e.target.name]: value
        })
    }

    const handleClose = () => {
        setCreateValue({
            idDeCuongHocPhan: '',
            thayTheKhoaLuan: false,
            batBuoc: true,
            tienQuyet: [],
            hocTruoc: [],
            songHanh: [],
            hocKy: '',
            khoiKienThuc: khoiKienThuc,
            chiTietKhoiKienThuc: chiTietKhoiKienThuc,
            idChuyenNganh: idChuyenNganh,
            maHocPhan: '',
            tenHocPhan: ''
        })
        setCreate(false)
    }

    const handleSave = (e) => {
        e.preventDefault()

        console.log(createValue)

        if(createValue.idDeCuongHocPhan == '' &  createValue.hocKy == '')
        {
            swal({
                title: 'Chưa điền thông tin',
                text: 'Vui lòng chọn học phần và học kỳ tương ứng!',
                icon: 'error',
                dangerMode: true
            })
        }
        else
        if(createValue.idDeCuongHocPhan == '') {
            swal({
                title: 'Chưa điền thông tin',
                text: 'Vui lòng chọn học phần hợp lệ!',
                icon: 'error',
                dangerMode: true
            })
        }
        else
        if(createValue.hocKy == '') {
            swal({
                title: 'Chưa điền thông tin',
                text: 'Vui lòng nhập học kỳ tương ứng!',
                icon: 'error',
                dangerMode: true
            })
        }
        else {
            handleClose()
            createSubject(id, apiURL, createValue, setState)
        }
    }

    const handleChoiceSubject = (e) => {
        const element = getParent(e.target, 'searchItem')
        const dataSet = element.dataset
        setCreateValue(prev => {
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
        setCreateValue({
            ...createValue,
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

    const handleDeleteTQ = e => {
        const element = e.target
        const name = element.dataset.name
        const index = element.dataset.index

        setCreateValue(prev => {

            const dataElement = prev[name]
            dataElement.splice(index, 1)

            return {
                ...prev,
                [name]: dataElement
            }
        })
        
    }

    return (
        <div className="section-G-create" onClick={handleBlurSearch}>
            <div className="section-G-createMain">
                <h1>Thêm học phần</h1>
                <form>
                    <div className="flexGroup">
                        <div className="formGroup search" style={{width: '30%'}}>
                            <label htmlFor="maHocPhan">Mã học phần</label>
                            <input
                                id="maHocPhan"
                                type="text"
                                name="maHocPhan" 
                                value={createValue.maHocPhan}   
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
                                value={createValue.tenHocPhan}  
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
                                checked={createValue.batBuoc}
                                onChange={e => handleChangeCheckBox(e)}
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="batBuoc">Thay thế khóa luận</label>
                            <input 
                                id="thayTheKhoaLuan"
                                type="checkBox"
                                name="thayTheKhoaLuan"
                                checked={createValue.thayTheKhoaLuan}
                                readOnly
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="hocKy">Học kỳ</label>
                            <input
                                id="hocKy"
                                type="text"
                                name="hocKy"
                                value={createValue.hocKy}  
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
                                    createValue.tienQuyet.map((item, index) => {
                                        return <li 
                                            key={index}
                                            data-name='tienQuyet'
                                            onDoubleClick={handleDeleteTQ}
                                        >{item}</li>
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
                                            setState={setCreateValue}
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
                                    createValue.hocTruoc.map((item, index) => {
                                        return <li 
                                            key={index}
                                            data-name='hocTruoc'
                                            onDoubleClick={handleDeleteTQ}
                                        >{item}</li>
                                    })
                                }
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
                                            setState={setCreateValue}
                                            apiURL={apiURL}
                                            type={'hocTruoc'}
                                        />
                                    }
                                </li>
                            </ul>
                        </div>
                        <div className="subject">
                            <h4>Song hành</h4>
                            <ul>
                                {
                                    createValue.songHanh.map((item, index) => {
                                        return <li 
                                            key={index}
                                            data-name='songHanh'
                                            onDoubleClick={handleDeleteTQ}
                                        >{item}</li>
                                    })
                                }
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
                                            setState={setCreateValue}
                                            apiURL={apiURL}
                                            type={'songHanh'}
                                        />
                                    }
                                </li>
                            </ul>
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
                </div>
            </div>
        </div>
    )
}

export default CreateElement