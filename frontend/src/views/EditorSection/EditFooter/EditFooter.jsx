import { Link, useNavigate, useParams } from 'react-router-dom'
import './EditFooter.scss'
import { useContext } from 'react'
import { UserContext } from '../../../context/ContextProvider'
import { handleSavingData, handleSwitchSection, handleUpdateDatabase } from '../Database/HandleUpdateDatabase'

function EditFooter({ currentSection, setData }) {

    const { sectionList, apiURL } = useContext(UserContext)
    const { id } = useParams()
    const navigate = useNavigate()

    return (
        <footer id='edit-footer'>
            <div className='edit-footer wrapper'>
                <div>
                    <Link to={'/list'}>
                        <button
                            onClick={() => setCurrentSection(0)}
                        >
                            <i className='ti-back-left'></i>
                            <span>Danh sách chính</span>
                        </button>
                    </Link>
                </div>
                <div>
                    {
                        currentSection != 0 &&
                        <Link to={`/edit/section${sectionList[currentSection-1]}/${id}`}>
                            <button
                                onClick={(e) => handleSwitchSection({ 
                                    thisE: e,
                                    currentSection: sectionList[currentSection], 
                                    currentId: id, 
                                    api: apiURL,
                                    setData,
                                    handleChangeLocation: () => {navigate(`/edit/section${sectionList[currentSection-1]}/${id}`)}
                                })}
                            >
                                <i className='ti-arrow-circle-left'></i>
                                <span>Lùi lại</span>
                            </button>
                        </Link>
                    }
                    {
                        currentSection < sectionList.length - 1 &&
                        <Link to={`/edit/section${sectionList[currentSection+1]}/${id}`}>
                            <button
                                onClick={(e) => handleSwitchSection({ 
                                    thisE: e,
                                    currentSection: sectionList[currentSection], 
                                    currentId: id, 
                                    api: apiURL,
                                    setData,
                                    handleChangeLocation: () => {navigate(`/edit/section${sectionList[currentSection+1]}/${id}`)}
                                })}
                            >
                                <span>Tiếp theo</span>
                                <i className='ti-arrow-circle-right'></i>
                            </button>
                        </Link>
                    }
                    <Link to={'/list'}>
                        <button>
                            <i className='ti-eye'></i>
                            <span>Xem lại</span>
                        </button>
                    </Link>
                    <Link to={'/list'}>
                        <button>
                            <i className='ti-check'></i>
                            <span>Hoàn tất</span>
                        </button>
                    </Link>
                </div>
            </div>
            {/* {
                currentSection != 5 
                &&
                <div 
                    className='edit-footer-save'
                    onClick={() => handleSavingData({
                        currentSection: sectionList[currentSection],
                        currentId: id,
                        api: apiURL,
                        setData: setData
                    })}
                >
                    <i className='ti-save'></i>
                </div>
            } */}
        </footer>
    )
}

export default EditFooter