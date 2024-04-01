import './EditHeader.scss'
import clsx from 'clsx'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import Loader from '../../../components/Loader/Loader'
import { UserContext } from '../../../context/ContextProvider'
import { handleSwitchSection } from '../Database/HandleUpdateDatabase'

function EditHeader({ currentSection, setData }) {

    const { id } = useParams()
    const { sectionList, apiURL } = useContext(UserContext)
    const navigate = useNavigate()
    const [ navHeight, setNavHeight ] = useState(0)

    useEffect(() => {
        const handleChangeNav = () => {
            if(window.scrollY <= 52) {
                setNavHeight(-window.scrollY)
            } else {
                setNavHeight(-52)
            }
        }

        window.addEventListener('scroll', handleChangeNav)

        return () => {
            window.removeEventListener('scroll', handleChangeNav)
        }
    }, [])

    const fecthAPI = (id) => {
        const editHeaderApi = `${apiURL}/sectionHeader/${id}`
        return async () => {
            const result = await axios.get(editHeaderApi) 
                .then(response => {
                    const restData = response.data
                    return restData.data[0]
                })
                .catch(error => {
                    console.log(error)
                    navigate('/error')
                })
            return result
        }
    }

    const { data , isLoading, isError} = useQuery(`sectionHeader-${id}`, fecthAPI(id),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    return (
        <header id='edit-header'>
            <div 
                className='edit-header'
                style={{
                    transform: `translateY(${navHeight}px)`
                }}

            >
                <div className='edit-header-main'>
                    {
                        sectionList.map((element, index) => {
                            return (
                                <Link 
                                    to={`/edit/section${element}/${id}`} 
                                    key={index}
                                >
                                    <div 
                                        className={clsx(
                                            'edit-header-element',
                                            {
                                                'active': index === currentSection
                                            }
                                        )}
                                        onClick={(e) => index!=currentSection
                                            ? handleSwitchSection({ 
                                                thisE: e, 
                                                currentSection: sectionList[currentSection], 
                                                currentId: id, 
                                                api: apiURL,
                                                setData,
                                                handleChangeLocation: () => {navigate(`/edit/section${element}/${id}`)}
                                            }) 
                                            : () => {}
                                        }
                                    >{element}</div>
                                </Link>
                            )
                        })
                    }
                    <div className='line'></div>
                </div>
            </div>

            <div className="edit-header-content wrapper">
                <h1>CHƯƠNG TRÌNH ĐÀO TẠO ĐẠI HỌC NGÀNH <span>{data.tenNganhDaoTao}</span></h1>
                <h1>MÃ CHƯƠNG TRÌNH ĐÀO TẠO: <span>{data.maChuongTrinhDaoTao}</span></h1>
                <h1>PHIÊN BẢN: <span>{data.phienBan}</span> <span className='edit-header-version cursorPointer'>thay đổi phiên bản</span></h1>
            </div>
        </header>
    )
}

export default EditHeader