import React from 'react'
import { Link } from "react-router-dom"
import chest from '../../../assets/imgs/chest.png'
import logo from '../../../assets/imgs/coin-logo.png'

let ProfileImg = (props) => {
    let { textColor, ProfileData } = props
    if(Object.keys(ProfileData).length === 0) return <p style={{ padding: 10, width: '100%', textAlign: 'center', ...textColor }}>loading...</p>

    return (
        <div className="profile-img-username">
            <div className="img-container">
                <img src={ProfileData?.account?.profile_img?.url ? ProfileData?.account?.profile_img?.url : logo} alt="" />
            </div>

            <div className="username-country">
                <p className="fullname" style={textColor}>{ProfileData?.account?.username}</p>
                <p className="username" style={textColor}>{ProfileData?.account?.country}</p>
            </div>

            <Link to={`/wallet/${ProfileData?.account?._id}`} className="wallet">
                <img src={chest} alt="chest png" />
                <p style={textColor}>wallet</p>
            </Link>
        </div>
    )
}

export default ProfileImg