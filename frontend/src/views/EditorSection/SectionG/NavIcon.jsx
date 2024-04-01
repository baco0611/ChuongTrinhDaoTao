import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../../context/ContextProvider'
import { handleSplitGHocKy } from '../Database/HandleActionSectionG'

function NavIcon({ sectionGValue }) {
    const { id } = useParams()
    const { apiURL } = useContext(UserContext)
    const [ isHidden, setIsHidden ] = useState(true)

    const [ data, setData ] = useState({})
    const [ soHocKy, setSoHocKy ] = useState(8)
    const keys = Object.keys(data)

    useEffect(() => {
        const sectionAValueApi = `${apiURL}/sectionA/${id}`
        axios.get(sectionAValueApi) 
            .then(response => {
                const restData = response.data
                if(restData.data[0]) {
                    setSoHocKy(restData.data[0].thoiGianDaoTao)
                    handleSplitGHocKy(id, setData, restData.data[0].thoiGianDaoTao, apiURL)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, [sectionGValue])

    return (
        <div className="section-G-nav">
            <div 
                className="icon"
                onClick={() => setIsHidden(!isHidden)}
            >
                <i className="ti-tag"></i>
            </div>
            {
                !isHidden &&
                <div className='section-G-summary'>
                    <table>
                        <thead>
                            <tr>
                                <th>Học kỳ</th>
                                <th>Tổng số tín chỉ</th>
                                <th>Bắt buộc</th>
                                <th>Tự chọn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                keys.map((item, index) => {
                                    return (
                                        <tr keys={index}>
                                            <td>{item}</td>
                                            <td>{data[item].batBuoc + data[item].tuChon}</td>
                                            <td>{data[item].batBuoc}</td>
                                            <td>{data[item].tuChon}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default NavIcon