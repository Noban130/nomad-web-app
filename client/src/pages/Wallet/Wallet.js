import { useEffect, useState } from 'react'
import { useContextApi } from '../../api/ContextApi'

let coinLogo = require('../../assets/imgs/coin-logo.png')

const Wallet = () => {
    let state = useContextApi()
    let [Colors] = state.Colors
    const [WindowWidth, setWindowWidth] = useState(500)
    let styles = style(Colors, WindowWidth)
    
    let windowSize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', windowSize)
    useEffect(() => {
        windowSize()
    }, [])

    return (
        <div style={styles.bigContainer}>
            <div style={styles.container}>                
                <div style={styles.wrapper}>
                    <p style={styles.balanceText}>balance</p>
                    <img style={styles.coinImg} src={coinLogo} alt='' />
                    <div style={styles.balanceContainer}>
                        <p style={styles.balance}>0</p>
                        <p style={styles.blob}>$blob</p>
                    </div>
                    
                    <p style={styles.walletText}>wallet address</p>
                    <p style={styles.walletAddress}>0xaa02412a1e4ab54478cd66364d786aecc5547800</p>
                </div>
            </div>
        </div>
    )
}

let style = (Colors, WindowWidth) => {
    
    return {
        bigContainer: {
            paddingLeft: WindowWidth >= 970 ? 270 : 0,
            paddingRight: WindowWidth >= 1300 ? 370 : 0,
            
            width: '100vw',
            minHeight: '100vh',

            backgroundColor: Colors.white,
        },
        container: {
            padding: 20,
            position: 'relative',
            minHeight: '100%',
            height: 'maxContent',
            width: '100%',
    
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
        },
        wrapper: {
            position: 'relative',
            minHeight: '100%',
            height: 'maxContent',
            width: '100%',
    
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
        },

        balanceText: {
            marginVertical: 6,
    
            fontFamily: 'Poppins',
            fontZeight: 700,
            fontSize: 27,
            textAlign: 'center',
            color: Colors.black,
        },
        coinImg: {
            width: 80,
            height: 80,
            objectFit: 'contain',
        },
        balanceContainer: {
            margin: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        balance: {
            
            fontFamily: 'Poppins',
            fontZeight: 300,
            fontSize: 17,
            textAlign: 'center',
            color: Colors.black,
        },
        blob: {
            marginLeft: 4,
            
            fontFamily: 'Poppins',
            fontZeight: 700,
            fontSize: 17,
            textAlign: 'center',
            color: Colors.black,
        },
        walletText: {
            marginTop: 20,
            
            fontFamily: 'Poppins',
            fontZeight: 600,
            fontSize: 14,
            textAlign: 'center',
            color: Colors.black,
        },
        walletAddress: {
            maxWidth: '100%',
            paddingHorizontal: 20,
            paddingBottom: 40,
            
            fontFamily: 'Poppins',
            fontZeight: 300,
            fontSize: 13,
            textAlign: 'center',
            color: Colors.black,
            
            flexWrap: 'wrap',
        },
    }
}

export default Wallet