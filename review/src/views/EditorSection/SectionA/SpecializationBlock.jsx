import { memo } from 'react'
import { handleChangeValueSpecial } from '../database/sectionA'

function SpecializationBlock({ data, setSpecialization, isDataSaved, setIsDataSaved, token }) {
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
                            onChange={e => handleChangeValueSpecial(e, setSpecialization, index)}
                        />
                        <button 
                        >
                            <i className="iconoir-minus-square"></i>
                        </button>
                    </div>
                )
            })
        }
            <button className='create-btn'>Thêm chuyên ngành</button>
        </div>
    )
}

export default memo(SpecializationBlock)