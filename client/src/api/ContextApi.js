import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios'

let ContextApi = createContext()

let ContextProvider = ({ children }) => {
    const [DarkMode, setDarkMode] = useState(false)
    // const [BackendUrl, setBackendUrl] = useState('https://nomadworld-app-3b81684a3729.herokuapp.com/api/v0')
    const [BackendUrl, setBackendUrl] = useState('http://localhost:5000/api/v0')
    
    const [UserData, setUserData] = useState({})
    const [UserToken, setUserToken] = useState('')
    const [UserStepComplete, setUserStepComplete] = useState(0)
    const [Callback, setCallback] = useState(false)
    
    const [Colors, setColors] = useState({
        white: '#ffffff',
        black: '#000000',
        pink: '#ffffff',
        transparentBlack: '#1a1a1a',
    })
    const [WindowWidth, setWindowWidth] = useState(500)

    let windowSize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', windowSize)

    let getUserInfo = useCallback(async (UserAccessToken) => {
        try {
            let res = await axios.get(`${BackendUrl}/user/userinfo`, {
                headers: {
                    'Authorization': UserAccessToken
                }
            })
            setUserData(res.data.data)
            setUserStepComplete(res.data.data.step_completed)
        } catch (error) {
            console.log(error);
        }
    }, [BackendUrl])

    useEffect(() => {
        let mode = localStorage.getItem('nomadworld_mode')
        if(mode === 'true') {
            setDarkMode(mode)
        }
        else {
            localStorage.setItem('nomadworld_mode', false)
            setDarkMode(false)
        }        
        windowSize()
    }, [])

    useEffect(() => {
        const cookies = new Cookies(null, { path: '/' });
        let UserAccessToken = cookies.get('accesstoken');
        setUserToken(UserAccessToken)

        if(UserAccessToken) getUserInfo(UserAccessToken)
    }, [getUserInfo])
    

    useEffect(() => {
        if(DarkMode) {
            setColors({
                white: '#000000',
                black: '#ffffff',
                pink: '#ffffff',
                transparentBlack: '#1a1a1a',                
                transparentWhite: '#1a1a1a',
                sidebarBorder: '#333333',
                inputColor: '#2e2e2e',
            })
        }
        else {
            setColors({
                white: '#ffffff',
                black: '#000000',
                pink: '#d5aaef',
                transparentBlack: '#00000010',                
                transparentWhite: '#fff',
                sidebarBorder: '#dddddd',
                inputColor: '#f2f2f2',
            })
        }
        
        localStorage.setItem('nomadworld_mode', DarkMode)
    }, [DarkMode])
    
    let state = {
        DarkMode: [DarkMode, setDarkMode],
        Colors: [Colors, setColors],
        BackendUrl: [BackendUrl, setBackendUrl],

        UserData: [UserData, setUserData],
        UserToken: [UserToken, setUserToken],
        UserStepComplete: [UserStepComplete, setUserStepComplete],
        Callback: [Callback, setCallback],
        WindowWidth: [WindowWidth, setWindowWidth],
    }

    return (
        <ContextApi.Provider value={state}>
            { children }
        </ContextApi.Provider>
    )
}

let useContextApi = () => useContext(ContextApi)

export { ContextApi, ContextProvider, useContextApi }