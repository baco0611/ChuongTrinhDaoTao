import { useRef, useState } from "react"
import { searchHocPhanById } from "../Database/HandleActionSectionG"
import SearchItem from "./SearchItem"
import { getParent } from "../Database/HandleUpdateDatabase"
import swal from "sweetalert"
import { useParams } from "react-router"

function TienQuyetRecommend({ setClose, apiURL, setState, type }) {

    console.log(type)
    const { id } = useParams()
    const [ value, setValue] = useState({
        maHocPhan: '',
        tenHocPhan: ''
    })

    const [ isSearch, setIsSearch ] = useState(false)
    const [ searchValue, setSearchValue ] = useState([])
    const typingTimeOutRef = useRef(null)

    const handleInput = async (e, api) => {
        const value = e.target.value

        setIsSearch(true)
        setValue({
            ...value,
            [e.target.name]: value
        })

        if(typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current)
        }

        typingTimeOutRef.current = await setTimeout(async()=>{
            const searchValueApi = await searchHocPhanById(value, apiURL, api, id)

            setSearchValue(searchValueApi)
        }, 300)
    }

    const handleChoiceSubject = (e) => {
        const element = getParent(e.target, 'searchItem')
        const dataSet = element.dataset
        setValue(prev => {
            return {
                ...prev,
                tenHocPhan: dataSet.name,
                maHocPhan: dataSet.ma
            }
        })
        setIsSearch(false)
    }

    const handleAdd = e => {
        e.preventDefault()

        if(value.maHocPhan == '' || value.tenHocPhan == '')
            swal({
                title: 'Chưa điền thông tin',
                text: 'Vui lòng chọn học phần hợp lệ!',
                icon: 'error',
                dangerMode: true
            })
        else {
            setState(prev => {
                const data = [
                    ...prev[type],
                    value.maHocPhan
                ]

                console.log(data)

                return {
                    ...prev,
                    [type]: data
                }
            })

            setClose()
        }
    }

    return (
        <div className="section-G-tienQuyet">
            <div className="box">
                <div className="flexGroup">
                    <div className="formGroup search" style={{width: '30%'}}>
                        <label htmlFor="maHocPhan">Mã học phần</label>
                        <input
                            id="maHocPhan"
                            type="text"
                            name="maHocPhan" 
                            value={value.maHocPhan}   
                            style={{width: '50%'}}
                            autoComplete="off"
                            onChange={e => handleInput(e, '/search_maHocPhan_byId')}
                            onFocus={(e) => {
                                handleInput(e, '/search_maHocPhan_byId')
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
                            value={value.tenHocPhan}  
                            style={{width: '75%'}}
                            autoComplete="off"
                            onChange={e => handleInput(e, '/search_tenHocPhan_byId')}
                            onFocus={(e) => {
                                handleInput(e, '/search_tenHocPhan_byId')
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
                <nav className="navigate">
                    <button
                        onClick={setClose}
                    >Hủy bỏ</button>
                    <button
                        onClick={handleAdd}
                    >Thêm</button>
                </nav>
            </div>
        </div>
    )
}

export default TienQuyetRecommend