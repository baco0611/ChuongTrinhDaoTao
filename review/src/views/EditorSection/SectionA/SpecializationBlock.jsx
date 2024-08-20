import { memo } from 'react'
import { handleChangeValueSpecial, handleCreateSpecialize, handleDeleteSpecialize, saveChangeSectionSpecialize } from '../database/sectionA'
import { useContext } from 'react'
import { UserContext } from '../../../context/ContextProvider'
import { useParams } from 'react-router-dom'

function SpecializationBlock({ data, setSpecialization, isDataSaved }) {
    const { fakeAPI, serverAPI, apiURL, token, setIsDataSaved } = useContext(UserContext)
    const { id } = useParams()
    console.log(data)

    return (
        <div className='sectionA-special'>
        {
            data.map((element, index) => {
                return (
                    <div className='sectionA-special-element' key={index}>
                        <input
                            value={element.specializationName}
                            type='text'
                            autoComplete='off'
                            onChange={e => handleChangeValueSpecial(e, setSpecialization, index, setIsDataSaved)}
                            onBlur={() => saveChangeSectionSpecialize({ id, api: apiURL, token, payload: element, setIsDataSaved })}
                        />
                        <button 
                            onClick={async () => handleDeleteSpecialize({id, api: apiURL, token, payload: element})}
                        >
                            <i className="iconoir-minus-square"></i>
                        </button>
                    </div>
                )
            })
        }
            <button 
                className='create-btn'
                onClick={async () => handleCreateSpecialize({ id, api: serverAPI, token, setSpecialization })}
            >Thêm chuyên ngành</button>
        </div>
    )
}

export default memo(SpecializationBlock)