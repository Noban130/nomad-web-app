import React from 'react'
import { useContextApi } from '../../../api/ContextApi'

const Btns = ({ ActiveBtn, setActiveBtn }) => {
    let state = useContextApi()
    let [Colors] = state.Colors
    let styles = style(Colors)

    return (
        <div style={styles.container}>
            <button style={ActiveBtn === 'visited countries' ? styles.activeBtn : styles.notActiveBtn} onClick={() => setActiveBtn('visited countries')}>
                <p style={ActiveBtn === 'visited countries' ? styles.blackText : styles.btnText}>visited countries</p>
            </button>

            <button style={ActiveBtn === 'bucket list' ? styles.activeBtn : styles.notActiveBtn} onClick={() => setActiveBtn('bucket list')}>
                <p style={ActiveBtn === 'bucket list' ? styles.blackText : styles.btnText}>bucket list</p>
            </button>
        </div>
    )
}

let style = (Colors) => {
    return {

        container: {
            marginTop: 5,
            marginBottom: 20,
            width: '100%',
            maxWidth: 300,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 20,
        },
        activeBtn: {
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 8,
            paddingBottom: 8,

            borderRadius: 20,
            backgroundColor: '#B4FF9A',
        },
        notActiveBtn: {
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 8,
            paddingBottom: 8,

            borderRadius: 20,
            backgroundColor: Colors.transparentBlack,
        },
        btnText: {
            color: Colors.black,
            fontSize: 12,
            textAlign: 'center',
            fontFamily: 'Poppins',
            fontWeight: 300,
        },
        blackText: {
            color: '#000000',
            fontSize: 12,
            textAlign: 'center',
            fontFamily: 'Poppins',
            fontWeight: 300,
        },
    }
}

export default Btns