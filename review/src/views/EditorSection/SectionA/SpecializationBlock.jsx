import { memo, useState } from 'react'
import { handleChangeValueSpecial, handleCreateSpecialize, handleDeleteSpecialize, saveChangeSectionSpecialize } from '../database/sectionA'
import { useContext } from 'react'
import { UserContext } from '../../../context/ContextProvider'
import { useParams } from 'react-router-dom'

function SpecializationBlock({ data, setSpecialization, isDataSaved }) {
    const { fakeAPI, serverAPI, apiURL, token, setIsDataSaved } = useContext(UserContext)
    const [ isDisableButton, setIsDisableButton ] = useState(false)
    const { id } = useParams()

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
                            onBlur={() => saveChangeSectionSpecialize({ id, api: serverAPI, token, payload: element, setIsDataSaved })}
                        />
                        <button 
                            onClick={async () => handleDeleteSpecialize({id, api: serverAPI, token, payload: element, setSpecialization})}
                        >
                            <i className="iconoir-minus-square"></i>
                        </button>
                    </div>
                )
            })
        }
            <button 
                className='create-btn'
                disabled={isDisableButton}
                onDoubleClick={async () => handleCreateSpecialize({ id, api: serverAPI, token, setSpecialization, setIsDisableButton })}
            >Thêm chuyên ngành (double click)</button>
        </div>
    )
}

export default memo(SpecializationBlock)