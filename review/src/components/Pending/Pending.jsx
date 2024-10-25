import React from 'react'
import "./Pending.scss"
import logo from '../../assets/image/favicon.ico'
import { Link } from "react-router-dom"

export default function Pending() {
    return (
        <div id='pending'>
            <img src={logo}/>
            <h2>HỆ THỐNG ĐANG ĐƯỢC PHÁT TRIỂN, VUI LÒNG TRỞ VỀ <Link to={"/"}>TRANG CHỦ</Link></h2>
        </div>
    )
}
