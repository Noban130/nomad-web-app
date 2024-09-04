import React from 'react'
import { useContextApi } from '../../../api/ContextApi'
import { MapSvg } from '../../../api/Icons'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

const Maps = () => {
    let state = useContextApi()
    let [Colors] = state.Colors
    let styles = style(Colors)

    return (
        <div style={styles.mapContainer}>
            <div style={styles.labelsContainer}>
                <div style={styles.label}>
                    <div style={styles.firstCircle}></div>
                    <p style={styles.labelText}>visitred countries</p>
                </div>
                <div style={styles.label}>
                    <div style={styles.secondCircle}></div>
                    <p style={styles.labelText}>bucket list</p>
                </div>
            </div>
            
            <div style={styles.zoomableArea}>
                <TransformWrapper
                    initialScale={2}
                    initialPositionX={-400}
                    initialPositionY={-150}
                >
                    <TransformComponent>
                        <MapSvg width={700} height={400} />
                    </TransformComponent>
                </TransformWrapper>
            </div>
        </div>
    )
}

let style = (Colors) => {
    return {

        countriesContainer: {
            padding: 0,
            paddingBottom: 100,
            width: '100%',
            height: '100%',
            flex: 1,

            border: `1px solid ${Colors.white}`,
            overflow: 'hidden',
        },
        mapContainer: { 
            paddingBottom: 10,
            margin: 'auto',
            width: '100%',
            maxWidth: 700,

            overflow: 'hidden',
        },
        labelsContainer: {
            margin: 'auto',
            padding: 20,
            width: '100%',
            maxWidth: 700,
    
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 20,
        },
        label: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 10,
        },
        firstCircle: {
            width: 12,
            height: 12,
            backgroundColor: '#58FFB9',
            borderRadius: 12,
        },
        secondCircle: {
            width: 12,
            height: 12,
            backgroundColor: '#DAABFF',
            borderRadius: 12,
        },
        labelText: {
            fontFamily: 'Poppins',
            fontWeight: 300,
            fontSize: 12,
            textAlign: 'left',
            color: Colors.black,
        },
        zoomableArea: {
            maxWidth: 700,
            width: '100%',

            borderRadius: 10,
            overflow: 'hidden',
        },
    }
}

export default Maps