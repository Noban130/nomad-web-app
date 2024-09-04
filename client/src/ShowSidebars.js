import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SideBar from './components/SideBar'
import FriendsSideBar from './components/FriendsSideBar'
import BottomBar from './components/BottomBar'

let notAuthorizedRoutes = ['/', '/login', '/register', '/welcome', '/username', '/birthday', '/userLocation', '/uploadProfileImage', '/shareWithFriends']

function ShowSidebars() {
    let location = useLocation()
    const [Show, setShow] = useState(false)
    

    useEffect(() => {
        notAuthorizedRoutes.map(r => r.toLowerCase()).includes(location.pathname.toLowerCase()) ? 
        setShow(false) : setShow(true)
    }, [location])
    
    if(!Show) return null

    return (
        <>
            <SideBar />
            <FriendsSideBar />
            <BottomBar />
        </>
    )
}

export default ShowSidebars