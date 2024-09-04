import React from 'react'
import { useContextApi } from '../../../api/ContextApi'

const BucketListFlag = ({ name, children }) => {
    
    let state = useContextApi()
    let [Colors] = state.Colors
    let styles = style(Colors)

    return (
        <div style={styles.container}>
            <button style={styles.remove}>
                <p style={styles.x}>✖</p>
            </button>
            
            <div style={styles.flag}>
                { children }
            </div>

            <p style={styles.countryName}>{name}</p>
        </div>
    )
}

let style = (Colors) => {
    return {

        container: {
            position: 'relative',
            marginTop: 10,
            marginBottom: 10,

            width: '43%',
            minWidth: '43%',
            maxWidth: 170,
    
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        remove: {
            position: 'absolute',
            top: -10,
            right: -10,
    
            width: 20,
            height: 20,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
    
            borderRadius: 20,
            backgroundColor: '#FF6161',
    
            zIndex: 1,
        },
        x: {
            color: Colors.white,
            fontSize: 8,
        },
        flag: {
            width: '100%',
            border: '1px solid #00000020',
        },
        countryName: {
            marginTop: 5,
    
            fontFamily: 'Poppins',
            fontWeight: 600,
            color: Colors.black,
            fontSize: 17,
            textAlign: 'center',
        },
    }
}

export default BucketListFlag