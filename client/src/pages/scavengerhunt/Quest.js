import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useContextApi } from '../../api/ContextApi'
import leaderBoard from '../../assets/imgs/leaderBoard.svg'
import logo from '../../assets/imgs/logo.png'
import pin from '../../assets/imgs/pin.svg'
import arrowLeft from '../../assets/imgs/arrowLeft.svg'
import questImg from '../../assets/imgs/questImg.png'
import Header from '../../components/Header'
import RangeBar from '../../components/RangeBar'
import QuestCard from './QuestCard'
import Maps from '../UserProfile/components/Maps'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { MapSvg } from '../../api/Icons'

const Quest = () => {
  const { id } = useParams()
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
          <p style={styles.title}>travel easy</p>
        </div>
        <div style={styles.rangeContainer}>
          <RangeBar range={7} steps={10} info="quests completed" />
        </div>
        <Link to="/scavengerHunt" style={styles.goBack}>
          <img src={arrowLeft} alt="Arrow Left" />
        </Link>
        <div style={styles.itemsContainer} className="noScrollBar">
          <QuestCard
            callToActionTitle={'claim offer'}
            callToActionUrl={''}
            header={'information about offer'}
            img={questImg}
            id={id}
          />
          <TransformWrapper
            initialScale={4}
            initialPositionX={-900}
            initialPositionY={0}
          >
            <TransformComponent>
              <MapSvg width={700} height={150} />
            </TransformComponent>
          </TransformWrapper>
          <div style={styles.btnContainer}>
            <Link style={styles.btn} to={''}>
              <p style={styles.btnText}>check-in & review</p>
            </Link>
          </div>
        </div>
        <div style={styles.btnContainer}>
          {/* Todo: Add Link routes */}
          <Link to="" style={styles.itemContainer}>
            <Item img={pin} header={'map view'} />
          </Link>
          <Link to="" style={styles.itemContainer}>
            <Item img={leaderBoard} header={'rank'} />
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
      gap: '0.5rem',
    },
    logoImg: {
      width: '15rem',
      height: 'auto',
    },
    rangeContainer: {
      width: '110%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '1.5rem',
    },
    goBack: {
      marginTop: '.5rem',
      width: '100%',
    },
    itemContainer: {
      minWidth: '45%',
    },
    item: {
      marginBottom: '15px',
      padding: '7px 20px',
      maxWidth: '100%',
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
      margin: '1rem 0',
      paddingBottom: '2rem',
      width: '100%',
      height: '50vh',
      overflow: 'scroll',
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
      justifyContent: 'center',
      gap: '1.5rem',
    },
    btn: {
      marginTop: '1rem',
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
    title: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
      fontSize: '22px',
      fontFamily: "'Poppins'",
      fontWeight: 300,
      lineHeight: '33px',
    },
  }
}

export default Quest