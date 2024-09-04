import React from 'react'
import { Link } from 'react-router-dom'
import { useContextApi } from '../../../api/ContextApi'
import logo from '../../../assets/imgs/coin-logo.png'
import axios from 'axios'

const RequestsContainer = (props) => {
    let { Requests = [], getRequests, getFriends, sidebar = false } = props
    let state = useContextApi()
    let [Colors] = state.Colors
    let [BackendUrl] = state.BackendUrl
    let [UserToken] = state.UserToken
    let styles = style(Colors)
    
    let acceptDenyUser = async (e, accept, id) => {
        e.preventDefault()
        if(UserToken) {
            try {
                let res = await axios.post(`${BackendUrl}/user/account/accept/${id}`, {
                    accept: accept
                }, {
                    headers: {
                        'Authorization': UserToken
                    }
                })
    
                if(res.data.success) {
                    await getRequests()
                    await getFriends()
                }
            } catch(error) {
                console.log(error.response.data.message)
            }
        }
    }

    if(Requests.length === 0) return <p style={styles.noConnections}>your inbox is empty!</p>

    return (
        <div style={styles.container}>
            <div style={styles.friendsContainer}>
                {
                    Requests.map(request => {
                        return (
                            <div style={styles.friendContainer} key={request?._id}>
                                <Link style={styles.friend} to={`/account-profile/${request?._id}`}>
                                    <img src={request?.profile_img?.url ? request?.profile_img?.url : logo} style={styles.friendImg} alt='' />
                                    <div style={styles.friendNameContainer}>
                                        <div style={styles.friendName}>{request?.firstname} {request?.lastname}</div>
                                        <div style={styles.friendSpan}>{request?.username}</div>
                                    </div>
                                </Link>

                                <div style={styles.btnsContainer}>
                                    <button style={{ ...styles.deny_btn, padding: sidebar ? '8px 12px' : '8px 30px' }} onClick={e => acceptDenyUser(e, false, request?._id)}>deny</button>
                                    <button style={{ ...styles.accept_btn, padding: sidebar ? '8px 12px' : '8px 30px' }} onClick={e => acceptDenyUser(e, true, request?._id)}>accept</button>
                                </div>
                            </div>
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
        friendContainer: {
            paddingTop: 10,
            paddingBottom: 10,
            width: '100%',
            
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,

            cursor: 'pointer',
        },
        friend: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 20,
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
        btnsContainer: {
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: 10,
        },
        accept_btn: {
            padding: '8px 30px',
            color: Colors.white,
            backgroundColor: '#daabff',
            borderRadius: 8,
            cursor: 'pointer',
        },
        deny_btn: {
            padding: '8px 30px',
            color: Colors.black,
            backgroundColor: Colors.inputColor,
            borderRadius: 8,
            cursor: 'pointer',
        }
    }
}

export default RequestsContainer