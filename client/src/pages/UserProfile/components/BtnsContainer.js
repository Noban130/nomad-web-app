import React, { useEffect, useState } from 'react'
import { useContextApi } from '../../../api/ContextApi'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const BtnsContainer = (props) => {
    let { ProfileData } = props
    let state = useContextApi()
    let [Colors] = state.Colors
    let styles = style(Colors)
    
    let [BackendUrl] = state.BackendUrl
    let [UserToken] = state.UserToken
    let [UserData] = state.UserData

    const [Status, setStatus] = useState('')
    const [Callback, setCallback] = useState('')
    let params = useParams()

    let send_remove_connection_request = async () => {
        if(UserToken) {
            try {
                let res = await axios.get(`${BackendUrl}/user/account/connect/${params.id}`, {
                    headers: {
                        'Authorization': UserToken
                    }
                })
                res.data.data.connection_status === 'connected' ? setStatus('connected') :
                res.data.data.connection_status === 'accept' ? setStatus('accept') :
                res.data.data.connection_status === 'request sent' ? setStatus('request sent') :
                res.data.data.connection_status === 'connect' ? setStatus('connect') :
                setStatus('connect')
                setCallback(!Callback)
            } catch (error) {
                console.log(error);
                console.log(error.response.data.message)
            }
        }
    }

    let accept_deny_connection_request = async () => {
        if(UserToken) {
            try {
                let res = await axios.post(`${BackendUrl}/user/account/accept/${params.id}`, {
                    accept: true
                }, {
                    headers: {
                        'Authorization': UserToken
                    }
                })
                res.data.data.connection_status === 'connected' ? setStatus('connected') :
                res.data.data.connection_status === 'accept' ? setStatus('accept') :
                res.data.data.connection_status === 'request sent' ? setStatus('request sent') :
                res.data.data.connection_status === 'connect' ? setStatus('connect') :
                setStatus('connect')
                setCallback(!Callback)
            } catch (error) {
                console.log(error);
                console.log(error.response.data.message)
            }
        }
    }

    let statusChanged = async () => {
        try {
            Status === 'connected' ? await send_remove_connection_request() :
            Status === 'accept' ? await accept_deny_connection_request() :
            Status === 'request sent' ? await send_remove_connection_request() :
            Status === 'connect' ? await send_remove_connection_request() :
            await send_remove_connection_request ()
        } catch (error) {
            console.log(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        ProfileData?.connection_status === 'connected' ? setStatus('connected') :
        ProfileData?.connection_status === 'accept' ? setStatus('accept') :
        ProfileData?.connection_status === 'request sent' ? setStatus('request sent') :
        ProfileData?.connection_status === 'connect' ? setStatus('connect') :
        setStatus('connect')
    }, [ProfileData])
    
    if(Object.keys(ProfileData).length === 0) return null

    return (
        <div style={styles.profileBtnsContainer}>
            {
                UserData?._id !== params.id ?
                <button style={Status !== 'connected' ? styles.whiteBtn : styles.blackBtn} onClick={statusChanged}>
                    <p style={styles.whiteBtnText}>{Status}</p>
                </button> :
                null
            }
            <Link to={`/chat/${params.id}`} style={styles.transparentBtn}>
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