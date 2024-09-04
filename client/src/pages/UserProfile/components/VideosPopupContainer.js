import { useEffect, useState } from 'react'
import { LeftArrowIcon } from '../../../api/Icons'
import { useContextApi } from '../../../api/ContextApi'
import VideosPopup from './VideosPopup'

const VideosPopupContainer = (props) => {
    let { Assets, setShowVideosPopup, ClickedVideoIndex } = props

    let state = useContextApi()
    let [Colors] = state.Colors
    const [WindowWidth, setWindowWidth] = useState(500)
    let styles = style(Colors, WindowWidth)
    
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
                    <div style={styles.search} onClick={() => setShowVideosPopup(false)}>
                        <LeftArrowIcon Colors={'#ffffff'} />
                    </div>
                </div>

                <div style={styles.videosContainer} className='videos_container'>
                    <VideosPopup Assets={Assets?.slice(ClickedVideoIndex, Assets?.length)} />
                </div>
            </div>
        </div>
    )
}

let style = (Colors, WindowWidth) => {
    
    return {
        container: {
            position: 'fixed',
            top: 0,
            
            width: '100%',
            maxWidth: 700,
            height: '100vh',
    
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',

            backgroundColor: Colors.white,
            zIndex: 9
        },
        wrapper: {
            position: 'relative',

            width: '100%',
            maxWidth: '100%',
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
            maxWidth: '100%',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',

            zIndex: 1,
        },
        search: {
            position: 'absolute',
            top: 24,
            left: 24,

            cursor: 'pointer',
        },

        videosContainer: {
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',

            width: '100%',
            maxWidth: 700,
            height: WindowWidth >= 970 ? '100vh' : window.innerHeight - 60,

            scrollBehavior: 'smooth',
            backgroundColor: '#000000',
            overflowY: 'scroll',
            overflowX: 'hidden',
            scrollSnapType: 'y mandatory',
        },
    }
}

export default VideosPopupContainer