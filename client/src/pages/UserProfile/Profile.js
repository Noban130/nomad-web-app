import React, { useCallback, useEffect, useState } from 'react'
import './Profile.css'
import { CommonStyles } from '../../CommonStyles'
import { useContextApi } from '../../api/ContextApi'
import BtnsContainer from './components/BtnsContainer'
import ProfileHeader from './components/ProfileHeader'
import ProfileImg from './components/ProfileImg'
import ConnectionsTrips from './components/ConnectionsTrips'
import Counters from './components/Counters'
import ProfileNavigationBar from './components/ProfileNavigationBar'
import VideosImgsContainer from './components/VideosImgsContainer'
import ConnectionsPopup from './components/ConnectionsPopup'
import TripsContainer from './components/TripsContainer'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import VideosPopupContainer from './components/VideosPopupContainer'

function Profile(props) {
    let { isMyProfile } = props
    let state = useContextApi()
    let [WindowWidth] = state.WindowWidth
    let [Colors] = state.Colors
    let [UserData] = state.UserData
    let [BackendUrl] = state.BackendUrl
    let [UserToken] = state.UserToken
    let params = useParams()

    const [ProfileData, setProfileData] = useState({})
    const [ActiveBtn, setActiveBtn] = useState('reviews')
    const [IsPopupActive, setIsPopupActive] = useState(false)
    const [ActiveItem, setActiveItem] = useState('trips')
    const [TripsActiveItem, setTripsActiveItem] = useState('visited')
    const [Assets, setAssets] = useState([])
    const [Callback, setCallback] = useState(false)
    const [ShowVideosPopup, setShowVideosPopup] = useState(false)
    const [ClickedVideoIndex, setClickedVideoIndex] = useState(0)

    let commonStyles = CommonStyles(WindowWidth, Colors)
    let textColor = { color: Colors.black }
    
    let getProfileInfo = useCallback(async () => {
        setProfileData({})
        
        try {
            let res = await axios.get(`${BackendUrl}/user/account/${params.id}`, {
                headers: {
                    'Authorization': UserToken
                }
            })
            setProfileData(res.data.data)
        } catch (error) {
            console.log(error?.response?.data?.msg);
        }
    }, [UserToken, BackendUrl, params])

    let getAssets = useCallback(async (ActiveBtn) => {
        if(UserToken) {
            if(ActiveBtn === 'reviews') {
                let getVideos = async () => {
                    if (UserToken) {
                        try {
                            let res = await axios.get(`${BackendUrl}/video/videos/${params.id}`, {
                                headers: {
                                    'Authorization': UserToken
                                }
                            });
            
                            if (res.data.success) {
                                setAssets(res.data.data.videos ? res.data.data.videos.reverse() : []);
                            }
                        } catch (error) {
                            console.log(error);
                            console.log(error.response.data.message);
                        }
                    }
                }

                await getVideos()
            }
            else if(ActiveBtn === 'liked') {
                let getLiked = async () => {
                    if (UserToken) {
                        try {
                            let res = await axios.get(`${BackendUrl}/video/liked-videos/${params.id}`, {
                                headers: {
                                    'Authorization': UserToken
                                }
                            });
            
                            if (res.data.success) {
                                setAssets(res.data.data.liked_videos.reverse());
                            }
                        } catch (error) {
                            console.log(error);
                            console.log(error.response.data.message);
                        }
                    }
                }

                await getLiked()
            }
            else if(ActiveBtn === 'saved') {
                let getSaved = async () => {
                    if (UserToken) {
                        try {
                            let res = await axios.get(`${BackendUrl}/video/saved-videos/${params.id}`, {
                                headers: {
                                    'Authorization': UserToken
                                }
                            });
            
                            if (res.data.success) {
                                setAssets(res.data.data.saved_videos.reverse());
                            }
                        } catch (error) {
                            console.log(error);
                            console.log(error.response.data.message);
                        }
                    }
                }

                await getSaved()
            }
        }
    }, [UserToken, BackendUrl, params.id])
    
    let popupActiveItem = (item) => {
        setIsPopupActive(true)
        item === 'connections' ? setActiveItem('connections') : setActiveItem('trips')
    }

    let displayCountries = (item) => {
        setIsPopupActive(true)
        setActiveItem('trips')
        item === 'visited' ? setTripsActiveItem('visited') : setTripsActiveItem('bucket')
    }

    useEffect(() => {
        getAssets(ActiveBtn)
    }, [ActiveBtn, getAssets, params])

    useEffect(() => {
        getProfileInfo()
    }, [getProfileInfo, params, Callback])
    
    return (
        <div style={commonStyles.bigContainer}>
            <div className="profile-container" style={{ backgroundColor: Colors.white }}>
                { ShowVideosPopup ? <VideosPopupContainer ActiveBtn={ActiveBtn} Assets={Assets} ShowVideosPopup={ShowVideosPopup} setShowVideosPopup={setShowVideosPopup} ClickedVideoIndex={ClickedVideoIndex} /> : null }
                <ProfileHeader Colors={Colors} UserData={UserData} params={params} />
                <ProfileImg Colors={Colors} textColor={textColor} ProfileData={ProfileData} />
                <ConnectionsTrips textColor={textColor} popupActiveItem={popupActiveItem} ProfileData={ProfileData} params={params} />
                { UserData?._id !== params.id ? <BtnsContainer ProfileData={ProfileData} /> : null }
                <Counters ProfileData={ProfileData} displayCountries={displayCountries} setActiveBtn={setActiveBtn} />
                <ProfileNavigationBar Colors={Colors} textColor={textColor} ActiveBtn={ActiveBtn} setActiveBtn={setActiveBtn} />
                <VideosImgsContainer Assets={Assets} textColor={textColor} ActiveBtn={ActiveBtn} setShowVideosPopup={setShowVideosPopup} setClickedVideoIndex={setClickedVideoIndex} />
            
                <div style={commonStyles.bigContainer} className={`profile-popup ${IsPopupActive ? 'active' : ''}`}>
                    <div className="popup-body">
                        <div className="popup-header" style={{ backgroundColor: Colors.white }}>
                            <p style={textColor}>{ActiveItem}</p>
                            <button className='cross' style={textColor} onClick={() => setIsPopupActive(false)}>×</button>
                        </div>

                        {
                            ActiveItem === 'connections' ?
                            <ConnectionsPopup 
                                textColor={textColor} 
                                UserToken={UserToken} 
                                isMyProfile={isMyProfile} 
                                ProfileData={ProfileData} 
                                BackendUrl={BackendUrl} 
                                params={params} 
                                setIsPopupActive={setIsPopupActive} 
                            /> :
                            <TripsContainer 
                                Colors={Colors} 
                                textColor={textColor} 
                                TripsActiveItem={TripsActiveItem} 
                                setTripsActiveItem={setTripsActiveItem} 
                                ProfileData={ProfileData} 
                                UserToken={UserToken} 
                                BackendUrl={BackendUrl}
                                Callback={Callback}
                                setCallback={setCallback}
                                UserData={UserData}
                                params={params} 
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile