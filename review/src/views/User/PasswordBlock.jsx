import React, { useState } from 'react'
import { checkValidInformation, handleChangeInformation, validElement } from './user-function'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export default function PasswordBlock({ data, name, setState, title, newPassword }) {
    const [ hide, setHide ] = useState(true)
    
    return (
        <div className='input-block available'>
            <p>{title}</p>
            <input
                type={hide && "password" || "test"}
                name={name}
                value={data || ""}
                autoComplete='off'
                onChange={(e) => handleChangeInformation({
                    e,
                    setState,
                })}
                onBlur={e => checkValidInformation({e, newPassword})}
                onFocus={e => validElement(e.target)}
            />
            <span></span>
            {
                hide 
                &&
                <FontAwesomeIcon icon={faEye} onClick={() => setHide(!hide)}/>
                ||
                <FontAwesomeIcon icon={faEyeSlash} onClick={() => setHide(!hide)}/>
            }
        </div>
    )
}
