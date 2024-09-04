import React, { useEffect, useState } from 'react'
import { useContextApi } from '../api/ContextApi'
import BottomBarButton from './BottomBarButton';
import { AddIcon, FriendsIcon, HomeIcon, InboxIcon, ProfileIcon } from '../api/Icons';
import { Link, useLocation } from 'react-router-dom';

const BottomBar = () => {
    let state = useContextApi()
    let [Colors] = state.Colors
    let [UserData] = state.UserData
    let styles = style(Colors)
    
    const [WindowWidth, setWindowWidth] = useState(500)

    let windowSize = () => {
        setWindowWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', windowSize)

    useEffect(() => {
        windowSize()
    }, [])

    let location = useLocation()

    if(WindowWidth > 970) return null
    else if(location.pathname.includes('/chat/')) return null
    if(location.pathname.includes('/user/activate/')) return null
    if(location.pathname.includes('/forgot-password')) return null
    if(location.pathname.includes('/reset-password')) return null
    if(location.pathname.includes('/login')) return null
    if(location.pathname.includes('/register')) return null    
    
    return (
        <div style={styles.container}>
            <BottomBarButton text={'home'} goTo={'/foryou'}>
                <HomeIcon Colors={Colors} />
            </BottomBarButton>
            <BottomBarButton text={'friends'} goTo={'/friends'}>
                <FriendsIcon Colors={Colors.black} />
            </BottomBarButton>

            <Link to={'/checkins'} style={styles.addBtn}>
                <AddIcon Colors={Colors.black} />
            </Link>
            
            <BottomBarButton text={'inbox'} goTo={'/inbox'}>
                <InboxIcon Colors={Colors.black} />
            </BottomBarButton>
            <BottomBarButton text={'profile'} goTo={`/account-profile/${UserData?._id}`}>
                <ProfileIcon Colors={Colors} />
            </BottomBarButton>
        </div>
    )
}

let style = (Colors) => {
    
    return {
        container: {
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'fixed',
            bottom: 0,
            left: '50%',
    
            transform: 'translateX(-50%)',
    
            width: '100%',
            maxWidth: 700,
            height: 60,
    
            display: window.innerWidth > 970 ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
            
            backgroundColor: Colors.white,

            zIndex: 10,
        },
        addBtn: {
            width: 30,
            height: 30,
            resizeMode: 'contain',
        },
    }
}

export default BottomBar