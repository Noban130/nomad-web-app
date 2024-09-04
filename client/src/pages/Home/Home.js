import { useEffect, useState } from 'react'
import { useContextApi } from '../../api/ContextApi'
import { SearchIcon } from '../../api/Icons'
import ForYou from './components/ForYou'
import Following from './components/Following'
import SearchForVideo from './components/SearchForVideo'

const Home = () => {
    let state = useContextApi()
    let [Colors] = state.Colors
    const [WindowWidth, setWindowWidth] = useState(500)
    let styles = style(Colors, WindowWidth)
    const [ActiveTab, setActiveTab] = useState('for_you')
    const [ShowSearchForVideo, setShowSearchForVideo] = useState(false)
    
    let windowSize = () => {
        setWindowWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', windowSize)

    useEffect(() => {
        windowSize()
    }, [])

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <div style={styles.header}>
                    <div style={styles.headerBtnsContainer}>
                        <button style={styles.headerBtn}>
                            <p style={ ActiveTab === 'following' ? styles.headerBtnActiveText : styles.headerBtnText}>following</p>
                            { ActiveTab === 'following' ? <div style={styles.bottomBorder}></div> : '' }
                        </button>
                        
                        <button style={styles.headerBtn} onClick={() => setActiveTab('for_you')}>
                            <p style={ ActiveTab === 'for_you' ? styles.headerBtnActiveText : styles.headerBtnText}>for you</p>
                            { ActiveTab === 'for_you' ? <div style={styles.bottomBorder}></div> : '' }
                        </button>
                    </div>
                    
                    <div style={styles.search} onClick={() => setShowSearchForVideo(true)} >
                        <SearchIcon Colors={'#ffffff'}/>
                    </div>
                </div>

                <div style={styles.videosContainer} className='videos_container'>
                    {/* { ActiveTab === 'for_you' ? <ForYou /> : <Following /> } */}
                    <ForYou />
                </div>

                {ShowSearchForVideo ? <SearchForVideo setShowSearchForVideo={setShowSearchForVideo} /> : null }
            </div>
        </div>
    )
}

let style = (Colors, WindowWidth) => {
    
    return {
        container: {
            position: 'relative',
            paddingLeft: WindowWidth >= 970 ? 270 : 0,
            paddingRight: WindowWidth >= 1300 ? 370 : 0,
            
            width: '100vw',
            height: '100vh',
    
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',

            backgroundColor: Colors.white,
        },
        wrapper: {
            position: 'relative',

            width: '100%',
            maxWidth: 610,
            height: WindowWidth >= 970 ? '100vh' : window.innerHeight - 60,
            backgroundColor: '#000000',
        },

        header: {
            position: 'relative',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            
            width: '100%',
            maxWidth: 604,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',

            zIndex: 1,
        },
        headerBtnsContainer: {
            marginLeft: 'auto',
            marginRight: 'auto',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 30,
        },
        headerBtn: {
            position: 'relative',
            
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',

            cursor: 'pointer',
        },
        headerBtnText: {
            fontFamily: 'Poppins',
            fontZeight: 300,
            fontSize: 14,
            textAlign: 'center',
            color: '#ffffffc0',
            textWrap: 'nowrap',

            textShadow: '1px 1px 1px #00000050',
        },
        headerBtnActiveText: {
            
            fontFamily: 'Poppins',
            fontZeight: 300,
            fontSize: 14,
            textAlign: 'center',
            color: '#ffffff',
            
            textWrap: 'nowrap',
            textShadow: '1px 1px 1px #00000050',
        },
        bottomBorder: {
            position: 'absolute',
            top: 25,
            left: '50%',
            transform: 'translate(-50%, -50%)',

            height: 3,
            width: 25,
            backgroundColor: '#fff',
            borderRadius: 4,
            
            boxShadow: '1px 1px 1px #00000050',
        },
        search: {
            position: 'absolute',
            top: 24,
            right: 20,

            cursor: 'pointer',
        },

        videosContainer: {
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',

            width: '100%',
            maxWidth: 610,
            height: WindowWidth >= 970 ? '100vh' : window.innerHeight - 60,

            scrollBehavior: 'smooth',
            backgroundColor: '#000000',
            overflowY: 'scroll',
            overflowX: 'hidden',
            scrollSnapType: 'y mandatory',
        },
    }
}

export default Home