import React from 'react'
import { Link } from 'react-router-dom'
import { useContextApi } from '../../../api/ContextApi'
import logo from '../../../assets/imgs/coin-logo.png'

const FriendsContainer = ({ Connection = [] }) => {
    let state = useContextApi()
    let [Colors] = state.Colors    
    let styles = style(Colors)

    if(Connection.length === 0) return <p style={styles.noConnections}>your inbox is empty!</p>

    return (
        <div style={styles.container}>
            <div style={styles.friendsContainer}>
                {
                    Connection?.map(friend => {
                        return (
                            <Link to={`/chat/${friend?._id}`} style={styles.friend} key={friend?._id}>
                                <img src={friend?.profile_img?.url ? friend?.profile_img?.url : logo} style={styles.friendImg} alt='' />
                                <div style={styles.friendNameContainer}>
                                    <div style={styles.friendName}>{friend?.firstname} {friend?.lastname}</div>
                                    <div style={styles.friendSpan}>{friend?.username}</div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

let style = (Colors) => {
    return {
        noConnections: {
            marginTop: 20,
            textAlign: 'center',
            fontSize: 14,
            color: Colors.black
        },
        container: {
            padding: 20,

            width: '100%',
            maxWidth: 500,
            height: 'calc(100% - 112px)',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            gap: 20,

            backgroundColor: Colors.white,
        },

        friendsContainer: {
            width: '100%',
            height: '100%',
            maxHeight: '100vh',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',

            overflowY: 'auto',
        },
        friend: {
            paddingTop: 10,
            paddingBottom: 10,
            width: '100%',
            
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 20,

            cursor: 'pointer',
        },
        friendImg: {
            width: 50,
            height: 50,
            objectFit: 'cover',
            borderRadius: 50,
        },
        
        friendNameContainer: {
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        friendName: {
            fontSize: 17,
            fontFamily: 'Poppins',
            fontWeight: 500,
            color: Colors.black,
        },
        friendSpan: {
            marginTop: -5,
            fontSize: 13,
            fontFamily: 'Poppins',
            fontWeight: 300,
            color: '#666666',
        },
    }
}

export default FriendsContainer