import React from 'react'
import { useContextApi } from '../api/ContextApi'
import { Link } from 'react-router-dom'

const BottomBarButton = ({ text, goTo, children }) => {

    let state = useContextApi()
    let [Colors] = state.Colors
    let styles = style(Colors)

    return (
        <Link to={goTo} style={styles.btn}>
            { children }
            <p style={styles.text}>{text}</p>
        </Link>
    )
}

let style = (Colors) => {
    return {
        btn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
    
            backgroundColor: Colors.white,
        },
        img: {
            width: 21,
            height: 21,
            resizeMode: 'contain',
        },
        text: {
            marginTop: 2,
            textAlign: 'center',
            fontFamily: 'Poppins',
            fontWeight: 400,
            color: Colors.black,
            fontSize: 12,
            lineHeight: '12px',
        },
    }
}

export default BottomBarButton