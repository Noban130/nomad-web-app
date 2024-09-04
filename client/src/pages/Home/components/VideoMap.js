import React, { useEffect, useState } from 'react'
import { useContextApi } from '../../../api/ContextApi'
import GoogleMap from './GoogleMap'
import { StarIcon } from '../../../api/Icons'
import { getStar } from '../../Checkins/Methods'

function VideoMap(props) {
    let { video, setShowMap } = props
    let state = useContextApi()
    const [Colors] = state.Colors
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
            <div style={styles.mapHeader}>
                <p style={styles.mapHeaderText}>map</p>
                <p style={styles.x} onClick={() => setShowMap(false)}>✖</p>
            </div>

            <p style={styles.nameText}>{video?.place?.name} {video?.city ? `, ${video?.city}` : null} {video?.country ? `, ${video?.country}` : null}</p>
            
            <div style={styles.starsContainer}>            
                { new Array(5).fill(0).map((star, i) => getStar(video?.rating, i)) }
            </div>

            <div style={styles.mapContainer}>
                <GoogleMap Long={video?.location?.long} Lat={video?.location?.lat} />
            </div>
        </div>
    )
}

let style = (Colors, WindowWidth) => {
    return {
        container: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,

            padding: 20,

            width: '100%',
            height: WindowWidth >= 970 ? window.innerHeight - 60 : window.innerHeight - 120,
            backgroundColor: Colors.white,
            borderRadius: '20px 20px 0 0',
            boxShadow: '0 -4px 10px #0000001c',

            zIndex: 1000,
        },
        
        mapHeader: {
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',

            cursor: 'pointer',
        },
        mapHeaderText: {
            fontSize: 14,
            fontWeight: 700,
            color: Colors.black,
        },
        x: {
            color: Colors.black,
            cursor: 'pointer',
            zIndex: 20,
        },

        nameText: {
            fontFamily: 'Poppins',
            fontWeight: 500,
            fontSize: 17,
            lineHeight: '19px',
            textAlign: 'center',
            color: Colors.black,
        },
        starsContainer: {
            position: 'relative',
            paddingTop: 10,
            paddingBottom: 20,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',            
        },


        mapContainer: {
            width: '100%',
            height: 'calc(100% - 120px)',

            borderRadius: 20,
            overflow: 'hidden',
        },
        map: {
            width: '100%',
            height: '100%',

            border: 0,
        }
    }
}

export default VideoMap