import React from 'react'
import ProfileHeader from './ProfileHeader'
import ProfileImg from './ProfileImg'
import SwitchToMap from './SwitchToMap'
import ConnectionsAndTrips from './ConnectionsAndTrips'
import BtnsContainer from './BtnsContainer'
import { useContextApi } from '../../../api/ContextApi'
import { WalletIcon } from '../../../api/Icons'
import { Link } from 'react-router-dom'

const UserProfileHeader = ({ backTo, displayMapBtn = true, MapMode, setMapMode, profileBtns = false, UserData, showWallet, AccountData, Callback, setCallback }) => {
    let state = useContextApi()
    let [Colors] = state.Colors
    let styles = style(Colors)

    return (
        <div style={styles.container}>
            <ProfileHeader backTo={backTo} UserData={UserData} AccountData={AccountData?.account} />
            <ProfileImg UserData={UserData} AccountData={AccountData?.account} />
            {
                showWallet &&
                <Link to={'/wallet'} style={styles.walletContainer}>
                    <WalletIcon Colors={Colors} />
                    <p style={styles.text}>wallet</p>
                </Link>
            }
            { displayMapBtn && <SwitchToMap setMapMode={setMapMode} MapMode={MapMode} Colors={Colors} /> }
            <ConnectionsAndTrips AccountData={AccountData?.account} />
            {
                MapMode || profileBtns ?
                <BtnsContainer UserData={UserData} AccountData={AccountData?.connection_status} Callback={Callback} setCallback={setCallback} /> : null
            }
        </div>
    )
}

let style = (Colors) => {
    return {
        container: {
            maxWidth: 700,
            position: 'relative',
            width: '100%',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
    
        walletContainer: {
            position: 'absolute',
            top: 108,
            left: 0,
    
            padding: 20,
            
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
    }
}

export default UserProfileHeader