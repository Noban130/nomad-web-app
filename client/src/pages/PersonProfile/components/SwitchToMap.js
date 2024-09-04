import React from 'react'

const SwitchToMap = ({ MapMode, setMapMode, Colors }) => {
    let styles = style(Colors)

    return (
        <div style={styles.container}>
            <p style={styles.text}>map</p>
            <button style={MapMode ? styles.switchBtnActive : styles.switchBtn} onClick={() => setMapMode(!MapMode)}>
                <div style={MapMode ? styles.btnCircleActive : styles.btnCircle}></div>
            </button>
        </div>
    )
}

let style = (Colors) => {
    
    return {
        container: {
            position: 'absolute',
            top: 108,
            right: 0,

            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 14,
            paddingBottom: 14,
            
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
        },
        text: {
            fontFamily: 'Poppins',
            fontWeight: 400,
            color: Colors.black,
            fontSize: 12,
        },
        switchBtn: {
            width: 33,
            height: 17,
    
            borderRadius: 13,
            backgroundColor: Colors.transparentBlack,

            border: `1px solid #fff`,
        },
        btnCircle: {
            width: 15,
            height: 15,
            borderRadius: 15,
            backgroundColor: Colors.transparentBlack,

            border: `1px solid #fff`,
        },
        switchBtnActive: {
            width: 33,
            height: 17,
    
            borderRadius: 13,
            backgroundColor: '#58FFB9',
    
            border: `1px solid ${Colors.white}`
        },
        btnCircleActive: {
            marginLeft: 'auto',
            width: 15,
            height: 15,

            borderRadius: 15,
            backgroundColor: '#58FFB9',

            border: `1px solid ${Colors.white}`
        },
    }
}

export default SwitchToMap