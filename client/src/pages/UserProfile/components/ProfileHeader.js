import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { EditIcon, MoonIcon, LogoutIcon, SettingsIcon, ShareBoldIcon, LeftArrowIcon } from "../../../api/Icons"
import { useContextApi } from '../../../api/ContextApi'
import Cookies from 'universal-cookie';

let ProfileHeader = (props) => {
    let { Colors, UserData, params } = props
    let state = useContextApi()
    let [DarkMode, setDarkMode] = state.DarkMode
    let [ShowSettings, setShowSettings] = useState(false)

    let ShareProfile = async () => {
        if(Object.keys(UserData).length !== 0) {
            try {
                await navigator
                .share({
                    title: 'nomad world app',
                    text: '',
                    url: `http://localhost:3000/account-profile/${params.id}`
                })
                console.log('Successful share! 🎉')
                
            } catch (error) {
                console.log(error);
            }
        }
    }

    let logout = () => {
        const cookies = new Cookies(null, { path: '/' });
        cookies.remove('accesstoken');
        window.location.href = '/login'
    }

    return (
        <div className="navbar">
            <Link to={'/foryou'} className="left">                
                <div className="icon">
                    <LeftArrowIcon Colors={Colors.black} />
                </div>
            </Link>

            <div className="right">
                <div className="icon" onClick={ShareProfile}>
                    <ShareBoldIcon Colors={Colors.black} />
                </div>
                <Link to={'/edit-profile'} className="icon">
                    <EditIcon Colors={Colors.black} />
                </Link>
                <button className="icon" onClick={() => setShowSettings(!ShowSettings)}>
                    <SettingsIcon Colors={Colors.black} />
                </button>
            </div>

            {
                ShowSettings ?
                <div className="darkmode-logout-container" style={{ backgroundColor: Colors.transparentWhite }}>
                    <button onClick={() => setDarkMode(!DarkMode)}>
                        <MoonIcon width={24} height={24} Colors={Colors} />
                        <p style={{ color: Colors.black }}>{DarkMode ? 'dark' : 'light'} mode</p>
                    </button>

                    <button onClick={logout}>
                        <LogoutIcon width={24} height={24} Colors={Colors.black} />
                        <p style={{ color: Colors.black }}>logout</p>
                    </button>
                </div> :
                null
            }
        </div>
    )
}

export default ProfileHeader