import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContextApi } from '../../api/ContextApi'
import Header from '../../components/Header'

import logo from '../../assets/imgs/logo.png'
import pin from '../../assets/imgs/pin.svg'
import plane from '../../assets/imgs/planeVerticale.svg'
import qr from '../../assets/imgs/qr.svg'
import scavenger from '../../assets/imgs/scavenger.svg'
import star from '../../assets/imgs/star.svg'

const WelcomeTrip = () => {
    const state = useContextApi()
    const [DarkMode] = state.DarkMode

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const styles = style(windowWidth, DarkMode)
    
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    
    return (
        <div style={styles.containerStyle}>
            <Header />
            <div style={styles.welcomeContainer}>
                <div style={styles.logoContainer}>
                    <img src={logo} style={styles.logoImg} alt="nomad world logo" />
                </div>
                <div style={styles.itemsContainer}>
                    <Link to="/addTrip">
                        <Item img={pin} header={'new check-in'} />
                    </Link>

                    <Link>
                        <Item img={star} header={"new review"} />
                    </Link>
                    <Link to="/tripOverview">
                        <Item img={plane} header={"plan a new trip"} />
                    </Link>

                    <Link to="/scavengerHuntWelcome">
                        <Item img={scavenger} header={'scavenger hunt'} />
                    </Link>
                    <Item img={qr} header={'scan qr code'} />
                </div>
            </div>
        </div>
        )
}
const Item = ({ img, header }) => {
    const styles = style()
    return (
    <div style={styles.item}>
        <div style={styles.imgContainer}>
            <img style={styles.itemImg} src={img} alt="" />
        </div>
        <div style={styles.ItemContent}>
            <p style={styles.ItemContentHeader}>{header}</p>
        </div>
    </div>
    )
}

const style = (windowWidth, DarkMode) => {
    return {
        containerStyle: {
            width: '100vw',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            background: DarkMode
            ? `url(${require('../../assets/imgs/background.png')}`
            : `url(${require('../../assets/imgs/darkModeBackground.png')})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPositionY: 'center',
            paddingLeft: windowWidth >= 970 ? 270 : 0,
            paddingRight: windowWidth >= 1300 ? 370 : 0,
        },
        welcomeContainer: {
            margin: 'auto',
            marginTop: windowWidth >= 970 ? '0' : '-7rem',
            position: 'relative',
            width: '100vw',
            minHeight: '100vh',
            maxWidth: '500px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },

        logoContainer: {
            width: '',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '-4rem',
            marginBottom: '4rem',
            gap: '0.5rem',
        },

        logoImg: {
            width: '15rem',
            height: 'auto',
        },
        item: {
            marginBottom: '15px',
            padding: '7px 20px',
            width: '100%',
            maxWidth: '430px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            gap: '20px',
            backgroundColor: '#ffffff20',
            border: '1px solid #ffffff40',
            borderRadius: '10px',
            boxShadow: '0 4px 12px #00000040',
        },
        imgContainer: {
            width: '40px',
            height: '40px',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
        },
        itemImg: {
            width: '100%',
            height: '100%',
            objectFit: 'contain',
        },
        ItemContent: {
            flexShrink: 1,
        },
        itemsContainer: {
            marginTop: '5rem',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
        },
        ItemContentHeader: {
            color: '#fff',
            fontSize: '16px',
            fontFamily: "'Poppins'",
            fontWeight: 300,
            lineHeight: '21px',
        },
    }
}

export default WelcomeTrip