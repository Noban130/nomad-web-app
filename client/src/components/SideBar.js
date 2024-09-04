import React, { useEffect, useState } from 'react'
import { useContextApi } from '../api/ContextApi'
import { AddIcon, FriendsIcon, HomeIcon, InboxIcon, ProfileIcon, MoonIcon, LogoutIcon } from '../api/Icons';
import logo from '../assets/imgs/logo.png'
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const SideBar = () => {
    const [WindowWidth, setWindowWidth] = useState(500)
    let state = useContextApi()
    let [Colors] = state.Colors
    let [UserData] = state.UserData
    let [DarkMode, setDarkMode] = state.DarkMode
    let styles = style(Colors, DarkMode)
    
    let windowSize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', windowSize)
    useEffect(() => {
        windowSize()
    }, [])
    
    let logout = () => {
        const cookies = new Cookies(null, { path: '/' });
        cookies.remove('accesstoken');
        window.location.href = '/login'
    }

    if(WindowWidth < 970) return null
    if(Object.keys(UserData).length === 0) return null
    
    return (
        <div style={styles.container}>
            <div style={styles.container}>
                <div style={styles.logoContainer}>
                    <div style={styles.logo}>
                        <img style={styles.logoImg} src={logo} alt='nomadworld logo' />
                    </div>
                </div>

                <div style={styles.linksContainer}>
                    <Link to={'/foryou'} style={styles.Link}>
                        <div style={styles.LinkIcon}>
                            <HomeIcon Colors={Colors} />
                        </div>
                        <div style={styles.LinkText}>home</div>
                    </Link>
                    <Link to={'/friends'} style={styles.Link}>
                        <div style={styles.LinkIcon}>
                            <FriendsIcon Colors={Colors.black} />
                        </div>
                        <div style={styles.LinkText}>friends</div>
                    </Link>
                    <Link to={'/checkins'} style={styles.Link}>
                        <div style={styles.LinkIcon}>
                            <AddIcon width={24} height={24} Colors={Colors.black} />
                        </div>
                        <div style={styles.LinkText}>new trip</div>
                    </Link>
                    <Link to={'/inbox'} style={styles.Link}>
                        <div style={styles.LinkIcon}>
                            <InboxIcon Colors={Colors.black} />
                        </div>
                        <div style={styles.LinkText}>inbox</div>
                    </Link>
                    <Link to={`/account-profile/${UserData?._id}`} style={styles.Link}>
                        <div style={styles.LinkIcon}>
                            <ProfileIcon Colors={Colors} />
                        </div>
                        <div style={styles.LinkText}>profile</div>
                    </Link>                    
                </div>

                    
                <div style={styles.bottomLinksContainer}>
                    
                    <button to={'/addCountry'} style={styles.Link} onClick={() => setDarkMode(!DarkMode)}>
                        <div style={styles.LinkIcon}>
                            <MoonIcon width={24} height={24} Colors={Colors} />
                        </div>
                        <div style={styles.LinkText}>mode</div>
                    </button>
                    <button onClick={logout} style={styles.Link}>
                        <div style={styles.LinkIcon}>
                            <LogoutIcon Colors={Colors.black} />
                        </div>
                        <div style={styles.LinkText}>logout</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

let style = (Colors, DarkMode) => {
    
    return {
        container: {
            position: 'fixed',
            top: 0,
            left: 0,

            padding: 20,
            width: 270,
            height: '100vh',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',

            borderRight: `.5px solid ${Colors.sidebarBorder}`,
            backgroundColor: Colors.white,

            zIndex: 1,
        },
        logoContainer: {
            padding: 20,
            width: '100%',
        },
        logo: {
            width: '100%',
            
        },
        logoImg: {
            width: '100%',
            maxWidth: 100,
            filter: DarkMode ? 'invert(0)' : 'invert(1)',
        },
        linksContainer: {
            width: '100%',

            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        Link: {
            width: '100%',
            padding: 10,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 10,
            
        },
        LinkIcon: {
            width: 35,
            height: 35,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        LinkText: {
            fontFamily: 'Poppins',
            fontWeight: 500,
            color: Colors.black,
            fontSize: 15,
        },
        bottomLinksContainer: {
            marginTop: 'auto',
            width: '100%',

            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'column',
        },

    }
}

export default SideBar