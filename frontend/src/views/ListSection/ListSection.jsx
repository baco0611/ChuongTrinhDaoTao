import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/ContextProvider'
import Loader from '../../components/Loader/Loader'
import './ListSection.scss'
import ListElement from './ListElement'

function ListSection () {

    const { apiURL, fakeApi } = useContext(UserContext); 
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const fecthAPI = () => {
        const mainListApi = `${apiURL}/mainList`
        // const mainListApi = `${fakeApi}/mainList`
        return async () => {
            const result = await axios.get(mainListApi) 
                .then(response => {
                    const restData = response.data
                    return restData.data
                })
                .catch(error => {
                    console.log(error)
                    navigate('/error')
                })
            return result
        }
    }

    const { data , isLoading, isError} = useQuery(`introduce`, fecthAPI(),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    return (
        <div id='list-section'>
            <header>
                <h1>DANH SÁCH CHƯƠNG TRÌNH ĐÀO TẠO</h1>
            </header> 
            <table className='list-table wrapper'>
                <thead>
                    <tr>
                        <th style={{width: '45px'}}>STT</th>
                        <th style={{width: '250px'}}>Mã chương trình đào tạo</th>
                        <th style={{width: '250px'}}>Tên ngành đào tạo</th>
                        <th style={{width: '300px'}}>Tên chương trình đào tạo</th>
                        <th style={{width: '200px'}}>Trạng thái</th>
                        <th style={{width: '180px'}}>Tác giả</th>
                        <th style={{width: '180px'}}>Lần cuối</th>
                        <th style={{width: '180px'}}>Ngày tạo</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((data, index) => {
                            return (
                                <ListElement key={index} data={data}/>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListSection