import React from 'react'
import { useContextApi } from '../../../api/ContextApi'

const ProfileImg = ({ border, UserData, AccountData }) => {
    let state = useContextApi()
    let [Colors] = state.Colors
    let styles = style(Colors)
    
    return (
        <div style={styles.imgAndName}>
            {
                border ?
                <img style={styles.imgWithBorder} src={AccountData?.profile_img?.url} alt='' /> :
                <img style={styles.profileImg} src={AccountData?.profile_img?.url} alt='' />
            }
            <p style={styles.username}>{AccountData?.username}</p>
            <p style={styles.country}>{AccountData?.country}</p>
        </div>
    )
}

let style = (Colors) => {
    
    return {
        imgAndName: {
            marginTop: -40,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        profileImg: {
            width: 80,
            height: 80,
            borderRadius: 80,
            objectFit: 'cover',
        },
        username: {
            marginTop: 2,
            fontSize: 17,
            color: Colors.black,
            fontFamily: 'Poppins',
            fontWeight: 800,
            textAlign: 'center',
        },
        country: {
            marginTop: -4,
            fontSize: 14,
            color: Colors.black,
            fontFamily: 'Poppins',
            fontWeight: 400,
            textAlign: 'center',
        },
        imgWithBorder: {
            width: 80,
            height: 80,
            borderRadius: 80,
            objectFit: 'cover',
    
            borderWidth: 5,
            borderColor: Colors.white,
        },
    }
}

export default ProfileImg