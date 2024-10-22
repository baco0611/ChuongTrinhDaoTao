import React from 'react'
import "./Competency.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { getParentElementByClass } from '../../../utils/function'

export default function Competency({ setState }) {
    const closeBlock = e => {
        const element = getParentElementByClass(e.target, "content")

        if(!element)
            setState(false)
    }
    
    return (
        <div id='competency-information' onClick={closeBlock} >
            <div className='content'>
                <h2>THANG TRÌNH ĐỘ NĂNG LỰC</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Thang trình độ năng lực</th>
                            <th>Mô trả thang trình độ năng lực</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Có trải nghiệm qua hoặc gặp qua</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Có thể tham gia và đóng góp</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Có thể hiểu và giải thích</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Có kỹ năng trong thực hành hoặc triển khai</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Có thể lãnh đạo hoặc sáng tạo</td>
                        </tr>
                    </tbody>
                </table>

                <FontAwesomeIcon 
                    icon={faXmark} 
                    onClick={() => setState(false)}    
                />
            </div>
        </div>
    )
}
