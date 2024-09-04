import React, { useEffect, useState } from 'react'
import { useContextApi } from '../../api/ContextApi'
import UserProfileHeader from './components/UserProfileHeader'
import { useParams } from 'react-router-dom'
import axios from 'axios'
// import Maps from './components/Maps'
// import VisitedAndBucketCountries from './components/VisitedAndBucketCountries'

const PersonProfile = () => {
    const [MapMode, setMapMode] = useState(true)

    let state = useContextApi()
    let [Colors] = state.Colors
    let [BackendUrl] = state.BackendUrl
    let [UserToken] = state.UserToken
    let [UserData] = state.UserData

    const [WindowWidth, setWindowWidth] = useState(500)
    const [Sending, setSending] = useState(false)
    const [Error, setError] = useState('')
    const [AccountData, setAccountData] = useState('')
    const [Callback, setCallback] = useState(false)
    let styles = style(Colors, WindowWidth)

    let params = useParams()

    let getAccountData = async () => {
        console.log('person profile');
        if(UserToken) {
            console.log('axios');
            try {
                let res = await axios.get(`${BackendUrl}/user/account/${params.id}`, {
                    headers: {
                        'Authorization': UserToken
                    }
                })
    
                console.log(res.data.data);
                if(res.data.success) {
                    setSending(false)
                    setError('')
                    setAccountData(res.data.data)
                }
            } catch (error) {
                setSending(false)
                console.log(error);
                console.log(error.response.data.message);
                setError(error.response.data.message)
            }
        }
    }
    
    let windowSize = () => {
        setWindowWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', windowSize)

    useEffect(() => {
        windowSize()
        getAccountData()
    }, [])

    useEffect(() => {
        getAccountData()
    }, [params.id, UserToken, Callback])
    
    if(Object.keys(UserData).length === 0) return null
    
    return (
        <div style={styles.bigContainer}>
            <div style={styles.container}>
                <div style={styles.wrapper}>
                    <UserProfileHeader 
                        displayMapBtn={false} 
                        backTo={'/foryou'} 
                        MapMode={MapMode} 
                        setMapMode={setMapMode} 
                        UserData={UserData} 
                        showWallet={false} 
                        AccountData={AccountData} 
                        Callback={Callback}
                        setCallback={setCallback}
                    />
                    {/* {
                        MapMode ?
                        <Maps /> :
                        <VisitedAndBucketCountries />
                    } */}
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
            paddingBottom: WindowWidth >= 970 ? 0 : 40,

            width: '100vw',
            minHeight: '100vh',

            backgroundColor: Colors.white,
        },
        container: {
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
    }
}

export default PersonProfile