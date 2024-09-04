import React from 'react'
import { SettingsIcon } from '../../../api/Icons'
import leftArrow from '../../../assets/imgs/left-arrow.svg'
import { Link } from 'react-router-dom'

const ProfileHeader = ({ backTo, UserData }) => {
    let style = styles()

    return (
        <div style={style.header}>
            <div style={{ ...style.bannerImg, backgroundImage: `url(${UserData.img})` }}>
                <div style={style.headerTop}>
                    <Link to={backTo} style={style.back}>
                        <img src={leftArrow} style={style.backArrow} alt='' />
                        <p style={style.backText}>back</p>
                    </Link>

                    <button style={style.settingsBtn}>
                        <SettingsIcon style={style.settings} />
                    </button>
                </div>
            </div>
        </div>
    )
}

let styles = () => {
    return {
        header: {
            width: '100%',
            maxWidth: 700,
        },
        bannerImg: {
            width: '100%',
            maxWidth: 700,
            height: 108,
            backgroundSize: 'cover',
            borderRadius: '0 0 10px 10px',
            backgroundRepeat: 'no-repeat',
        },
        headerTop: {
            padding: 20,
            width: '100%',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
        },
        back: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        backArrow: {
            width: 18,
            height: 18,
            objectFit: 'contain',
    
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        backText: {
            marginLeft: 6,
            color: '#fff',
            fontFamily: 'Poppins',
            fontWeight: 200,
        },
        settingsBtn: {
            marginLeft: 'auto',
        },
        settings: {
            width: 18,
            height: 18,
            objectFit: 'contain',
        },
    }
}

export default ProfileHeader