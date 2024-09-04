import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { useContextApi } from '../../api/ContextApi'
import diamond from '../../assets/imgs/diamond.svg'
import leaderBoard from '../../assets/imgs/leaderBoard.svg'
import logo from '../../assets/imgs/logo.png'
import specialOffer from '../../assets/imgs/specialOffer.svg'
import Header from '../../components/Header'

const ScavengerHuntWelcomePage = () => {
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
        <div style={styles.titleContainer}>
          <h1 style={styles.title}>
            Welcome to <span style={styles.titleSpan}>toronto</span>
          </h1>
        </div>
        <div style={styles.itemsContainer}>
          <Item
            img={diamond}
            header={
              'explore top locations. check-in and leave reviews to earn points'
            }
          />
          <Item
            img={specialOffer}
            header={
              'claim special offers at each location. complete quests and earn badges for your profile'
            }
          />
          <Item
            img={leaderBoard}
            header={
              'climb the leaderboard and earn rewards from the airdrop pool'
            }
          />
        </div>
        <div style={styles.btnContainer}>
          <Link style={styles.btn} to={'/scavengerHunt'}>
            <p style={styles.btnText}>get started</p>
          </Link>
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
      marginTop: windowWidth >= 970 ? '0' : '-5rem',
      position: 'relative',
      width: '100vw',
      minHeight: '100vh',
      maxWidth: '500px',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },

    logoContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '4rem',
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
      minHeight: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: '20px',
      backgroundColor: '#ffffff20',
      border: '1px solid #ffffff40',
      borderRadius: '10px',
      boxShadow: '0 4px 12px #00000040',
    },
    imgContainer: {
      width: '75px',
      height: '75px',
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
    },
    itemImg: {
      width: '75px',
      height: '75px',
      objectFit: 'contain',
    },
    ItemContent: {
      gap: '2px',
      color: '#fff',
      flexShrink: 1,
    },
    itemsContainer: {
      marginTop: '3rem',
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
    btnContainer: {
      width: '100%',
      display: 'flex',
      alignItems: 'start',
      marginTop: '6rem',
    },
    btn: {
      padding: '15px 10px',
      width: '100%',
      maxWidth: '430px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 12px #00000040',
    },
    btnText: {
      width: '100%',
      textAlign: 'center',
      color: '#000',
      fontFamily: "'Poppins'",
      fontWeight: 400,
    },
    titleContainer: {
      width: '100%',
      padding: '0 10px',
    },
    title: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'start',
      color: '#fff',
      fontSize: '24px',
      fontFamily: "'Poppins'",
      fontWeight: 500,
      lineHeight: '33px',
    },
    titleSpan: {
      color: '#fff',
      fontSize: '24px',
      fontFamily: "'Poppins'",
      fontWeight: 700,
      lineHeight: '33px',
      letterSpacing: '.57rem',
    },
  }
}

export default ScavengerHuntWelcomePage