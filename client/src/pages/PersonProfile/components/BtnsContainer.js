import React, { useEffect, useState } from 'react'
import { useContextApi } from '../../../api/ContextApi'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const BtnsContainer = ({ AccountData, Callback, setCallback }) => {
    let state = useContextApi()
    let [Colors] = state.Colors
    let styles = style(Colors)
    
    let [BackendUrl] = state.BackendUrl
    let [UserToken] = state.UserToken
    let [UserData] = state.UserData

    const [Status, setStatus] = useState('')
    let params = useParams()

    useEffect(() => {
        console.log(AccountData);
        AccountData === 'connected' ? setStatus('connected') :
        AccountData === 'accept connection' ? setStatus('accept') :
        AccountData === 'connection request sent' ? setStatus('request sent') :
        AccountData === 'not connected' ? setStatus('connect') :
        setStatus('connect')
    }, [AccountData, Callback])

    let send_remove_connection_request = async () => {
        if(UserToken) {
            console.log(UserToken)
            try {
                let res = await axios.get(`${BackendUrl}/user/account/connect/${params.id}`, {
                    headers: {
                        'Authorization': UserToken
                    }
                })
        
                console.log(res.data.data)
                setCallback(!Callback)
            } catch (error) {
                console.log(error);
                console.log(error.response.data.message)
            }
        }
    }

    let accept_deny_connection_request = async () => {
        if(UserToken) {
            console.log(UserToken)
            try {
                let res = await axios.post(`${BackendUrl}/user/account/accept/${params.id}`, {
                    accept: true
                }, {
                    headers: {
                        'Authorization': UserToken
                    }
                })
        
                console.log(res.data.data)
                setCallback(!Callback)
            } catch (error) {
                console.log(error);
                console.log(error.response.data.message)
            }
        }
    }

    let statusChanged = async () => {
        try {
            console.log(AccountData);
            AccountData === 'connected' ? await send_remove_connection_request() :
            AccountData === 'accept connection' ? await accept_deny_connection_request() :
            AccountData === 'connection request sent' ? await send_remove_connection_request() :
            AccountData === 'not connected' ? await send_remove_connection_request() :
            await send_remove_connection_request ()
            
        } catch (error) {
            console.log(error);
            console.log(error.response.data.message)
        }
    }
    
    return (
        <div style={styles.profileBtnsContainer}>
            <button style={Status !== 'connected' ? styles.whiteBtn : styles.blackBtn} onClick={statusChanged}>
                <p style={styles.whiteBtnText}>{Status}</p>
            </button>
            <Link to={`/chat/${UserData.id}`} style={styles.transparentBtn}>
                <p style={styles.transparentBtnText}>message</p>
            </Link>
        </div>
    )
}

let style = (Colors) => {
    return {
        profileBtnsContainer: {
            marginLeft: 'auto',
            marginRight: 'auto',

            paddingLeft: 20,
            paddingRight: 20,
    
            width: '100%',
            maxWidth: 300,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 10,
        },
        whiteBtn: {
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 20,
            paddingRight: 20,

            width: 'auto',
            flex: 1,
    
            borderRadius: 5,
            backgroundColor: '#d5aaef',
        },
        blackBtn: {
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 20,
            paddingRight: 20,

            width: 'auto',
            flex: 1,
    
            borderRadius: 5,
            backgroundColor: Colors.black,
        },
        whiteBtnText: {
            fontSize: 12,
            textAlign: 'center',
            fontFamily: 'Poppins',
            fontWeight: 300,
            color: Colors.white,
        },
        transparentBtn: {
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 20,
            paddingRight: 20,

            width: 'auto',
            flex: 1,
    
            borderRadius: 5,
            backgroundColor: Colors.transparentBlack,

            border: 'none',
            outline: 'none',
        },
        transparentBtnText: {
            fontSize: 12,
            textAlign: 'center',
            fontFamily: 'Poppins',
            fontWeight: 400,
            color: Colors.black,
        },
    }
}

export default BtnsContainer