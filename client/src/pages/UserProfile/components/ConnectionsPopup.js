import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

let ConnectionsPopup = (props) => {
    let { textColor, UserToken, isMyProfile, ProfileData, BackendUrl, params, setIsPopupActive } = props
    const [Connections, setConnections] = useState([])

    let getProfileInfo = useCallback(async () => {
        setConnections([])
        try {
            let id = isMyProfile ? ProfileData?.account?._id : params.id
            let res = await axios.get(`${BackendUrl}/user/connections/${id}`, {
                headers: {
                    'Authorization': UserToken
                }
            })
            setConnections(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }, [UserToken, isMyProfile, ProfileData, BackendUrl, params])

    useEffect(() => {
        getProfileInfo()
    }, [getProfileInfo])

    if(Connections.length === 0) return null

    return (
        <div className="profile-connections">
            {
                Connections.map(item => {
                    return (
                        <Link to={`/account-profile/${item?._id}`} className="user" key={item?._id} onClick={() => setIsPopupActive(false)}>
                            <div className="user-img">
                                <img src={item?.profile_img?.url} alt="" />
                            </div>
                            <div className="user-infos">
                                <p className="user-fullname" style={textColor}>{item?.firstname} {item?.lastname}</p>
                                <p className="user-username" style={textColor}>{item?.username}</p>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default ConnectionsPopup