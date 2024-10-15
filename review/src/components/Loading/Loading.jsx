import React from 'react'
import "./Loading.scss"
import huscLogo from "../../assets/image/husc-logo.png"

export default function Loading({ text }) {
    return (
        <div className='loading-screen'>
            <div className='center'>
                <img src={huscLogo}/>
                <span className="loading">L &nbsp; ading</span>
                <p>{text || "Dữ liệu đang được cập nhật"}</p>
            </div>
        </div>
    )
}
