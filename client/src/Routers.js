import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContextApi } from './api/ContextApi';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Welcome from './pages/Welcome/Welcome';
import Username from './pages/Username/Username';
import Birthday from './pages/Birthday/Birthday';
import UserLocation from './pages/UserLocation/UserLocation';
import UploadProfileImage from './pages/UploadProfileImage/UploadProfileImage';
import ShareWithFriends from './pages/ShareWithFriends/ShareWithFriends';
import EditProfile from './pages/EditProfile/EditProfile';
import Wallet from './pages/Wallet/Wallet';
import Friends from './pages/Friends/Friends';
import Chat from './pages/Chat/Chat';
import ShowSidebars from './ShowSidebars';
import Home from './pages/Home/Home';
import Inbox from './pages/Inbox/Inbox';
import PersonProfile from './pages/PersonProfile/PersonProfile';
// import Checkins from './pages/Checkins/Checkins';
import AllCheckins from './pages/AllCheckins/AllCheckins';
import LeaveReview from './pages/LeaveReview/LeaveReview';
import Profile from './pages/UserProfile/Profile';
import VerifyYourEmail from './pages/VerifyYourEmail/VerifyYourEmail';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import CheckYourEmail from './pages/CheckYourEmail/CheckYourEmail';

// CHAHINE CODE
import WelcomeTrip from './pages/Checkins/WelcomeTrip.js'
import TripOverview from './pages/TripOverview/TripOverview'

import AddTrip from './pages/AddTrip/AddTrip'
import AddTrip2 from './pages/AddTrip2/AddTrip2'
import AddTrip3 from './pages/AddTrip3/AddTrip3'
import AddTrip4 from './pages/AddTrip4/AddTrip4'

import ScavengerHuntWelcomePage from './pages/scavengerhunt/ScavengerHuntWelcomePage'
import ScavengerHunt from './pages/scavengerhunt/ScavengerHunt'
import Quest from './pages/scavengerhunt/Quest'


const Routers = () => {

    let state = useContextApi()
    let [UserData] = state.UserData
    let [UserToken] = state.UserToken

    let logoutFirst = page => (UserToken) ? <Navigate to="/foryou" /> : page

    return (
        <Router>
            <Routes>
                <Route path="/" element={logoutFirst(<Login />)} />
                <Route path="/login" element={logoutFirst(<Login />)} />
                <Route path="/user/activate/:id" element={<VerifyYourEmail />} />
                <Route path="/user/check-email-to-activate" element={<CheckYourEmail message='activate your registration' />} />
                
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/user/check-email-to-reset" element={<CheckYourEmail message='reset your password' />} />

                <Route path="/user/reset/:id" element={<ResetPassword />} />
                <Route path="/register" element={logoutFirst(<Register />)} />
                {
                    (UserToken && UserData) ?
                    <>
                        <Route path="/welcome" element={<Welcome />} />
                        <Route path="/username" element={<Username />} />
                        <Route path="/birthday" element={<Birthday />} />
                        <Route path="/userLocation" element={<UserLocation />} />
                        <Route path="/uploadProfileImage" element={<UploadProfileImage />} />
                        <Route path="/shareWithFriends" element={<ShareWithFriends />} />

                        <Route path="/account-profile/:id" element={<Profile />} />

                        <Route path="/edit-profile" element={<EditProfile />} />
                        <Route path="/wallet/:id" element={<Wallet />} />
                        <Route path="/foryou" element={<Home />} />

                        <Route path="/friends" element={<Friends />} />
                        <Route path="/inbox" element={<Inbox />} />
                        <Route path="/profile/:id" element={<PersonProfile />} />
                        <Route path="/chat/:id" element={<Chat />} />
                            
                        {/* <Route path="/checkins" element={<Checkins />} /> */}
                        <Route path="/allCheckins" element={<AllCheckins />} />
                        <Route path="/leave-review/:id" element={<LeaveReview />} />

                        {/* CHAHINE CODE */}
                        
                        <Route path="/checkins" element={<WelcomeTrip />} />
                        <Route path="/addTrip" element={<AddTrip />} />
                        <Route path="/tripOverview" element={<TripOverview />} />
                        <Route path="/addTrip2" element={<AddTrip2 />} />
                        <Route path="/addTrip3" element={<AddTrip3 />} />
                        <Route path="/addTrip4" element={<AddTrip4 />} />
                        <Route path="/scavengerHuntWelcome" element={<ScavengerHuntWelcomePage />} />
                        <Route path="/scavengerHunt" element={<ScavengerHunt />} />
                        <Route path="/scavengerHunt/:id" element={<Quest />} />                        

                    </> :
                    null
                }

                {
                    !UserToken &&
                    <>
                        <Route path="*" element={<Login />} />
                    </>
                }
            </Routes>

            <ShowSidebars />
        </Router>
    )
}

export default Routers