import React, { useState, useEffect } from 'react'
import { CommonStyles } from '../../CommonStyles'
import { useContextApi } from '../../api/ContextApi'
import { EditIcon, LeftArrowIcon, SettingsIcon, UploadIcon } from '../../api/Icons'
import { Link } from 'react-router-dom'
import './EditProfile.css'
import Countries from '../UserLocation/Countries'
import axios from 'axios'

function EditProfile() {
    let state = useContextApi()
    let [WindowWidth] = state.WindowWidth
    let [Colors] = state.Colors
    let [UserData] = state.UserData
    let [UserToken] = state.UserToken
    let [BackendUrl] = state.BackendUrl

    const [Img, setImg] = useState({})
    const [Firstname, setFirstname] = useState('')
    const [Lastname, setLastname] = useState('')
    const [Username, setUsername] = useState('')
    const [Country, setCountry] = useState('')
    const [Uploading, setUploading] = useState(false)
    const [Error, setError] = useState(false)
    const [Sending, setSending] = useState(false)
    const [Deleting, setDeleting] = useState(false)
    

    let commonStyles = CommonStyles(WindowWidth, Colors)
    let textColor = { color: Colors.black }

    const uploadImg = async (e, key) => {
        if(UserToken) {
            try {
                setUploading(true)
                let file = e.target.files[0]
                
                if(!file || file === null || file === undefined) {
                    setUploading(false)
                    return alert("No file uploaded!")
                }
    
                if(file.size > 4 * 1024 * 1024) {
                    setUploading(false)
                    return alert("image size sould be 4MB or less!")
                }
    
                let file_types = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
                let file_match = file_types.includes(file.type)
    
                if(!file_match) {
                    setUploading(false)
                    return alert("file format not correct!")
                }
    
                var formData = new FormData()
                formData.append('files', file)
                
                let res = await axios.put(`${BackendUrl}/user/profile-img`, formData, {
                    headers: {
                        'Authorization': UserToken,
                        'content-type': 'multipart/form-data'
                    }
                })
    
                if(res.data.success) {                    
                    setSending(false)
                    setError('')
                    setImg(res?.data?.data?.results[0])
                    setUploading(false)
                    await deleteImg(e, key)
                
                    // window.location.href = '/uploadProfileImage'
                }
    
            } catch (error) {
                setUploading(false)
                setSending(false)
                console.log(error);
                console.log(error.response.data.message);
                setError(error.response.data.message)
            }
        }
    }

    let deleteImg = async (e, key) => {
        e.preventDefault()
        if(UserData && UserToken) {
            setDeleting(true)
            try {
                await axios.put(`${BackendUrl}/user/profile-img/${UserData._id}`, {
                    key: key
                }, {
                    headers: {
                        'Authorization': UserToken,
                        'Content-Type': 'application/json'
                    }
                })
                setDeleting(false)
            } catch (error) {
                setDeleting(false)
                console.log(error);
                console.log(error.response.data.message);
                setError(error.response.data.message)
            }
        }
    }

    let handleSubmit = async (e, key) => {
        e.preventDefault()
        if(UserData && UserToken) {
            setSending(true)
            try {
                let res = await axios.put(`${BackendUrl}/user/fullinfos`, {
                    firstname: Firstname, 
                    lastname: Lastname, 
                    username: Username, 
                    country: Country
                }, {
                    headers: {
                        'Authorization': UserToken,
                        'Content-Type': 'application/json'
                    }
                })
                setSending(false)
                window.alert('your information are updated successfuly!')

            } catch (error) {
                setDeleting(false)
                console.log(error);
                console.log(error.response.data.message);
                setError(error.response.data.message)            
            }
        }
    }

    useEffect(() => {
        if(UserData) {
            setImg(UserData?.profile_img || {})
            setFirstname(UserData?.firstname || '')
            setLastname(UserData?.lastname || '')
            setUsername(UserData?.username || '')
            setCountry(UserData?.country?.toLowerCase() || '')
        }
    }, [UserToken, UserData])

    return (
        <div style={commonStyles.bigContainer}>
            <div className="edit-profile-container" style={{ backgroundColor: Colors.white }}>
                <div className="navbar">
                    <Link to={`/account-profile/${UserData?._id}`} className="left">
                        <LeftArrowIcon Colors={Colors.black} />
                        <p style={textColor}>back</p>
                    </Link>

                    <div className="right">
                        <SettingsIcon Colors={Colors.black} />
                    </div>
                </div>

                {
                    !Uploading ?
                    <div className="edit-profile-img">
                        <input type="file" id="upload-photo" hidden onChange={e => uploadImg(e, UserData?.profile_img?.key)} />
                        <div className="profile-img">
                            <img src={Img?.url} alt="" />
                            <label htmlFor="upload-photo">
                                <EditIcon Colors={Colors.white} />
                            </label>
                        </div>
                    </div> :
                    null
                }

                {
                    Uploading ?
                    <div className="uploading">
                        <UploadIcon Colors={Colors.black} />
                        <p style={textColor}>uploading...</p>
                    </div> :
                    null
                }

                <form className="edit-profile-form" onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="firstname" style={textColor}>first name</label>
                        <input onChange={e => setFirstname(e.target.value)} value={Firstname} type='text' id='firstname' placeholder='first name...' style={{ backgroundColor: Colors.inputColor, color: Colors.black }} />
                    </div>

                    <div className="input-container">
                        <label htmlFor="lastname" style={textColor}>family name</label>
                        <input onChange={e => setLastname(e.target.value)} value={Lastname} type='text' id='lastname' placeholder='family name...' style={{ backgroundColor: Colors.inputColor, color: Colors.black }} />
                    </div>
                    
                    <div className="input-container">
                        <label htmlFor="username" style={textColor}>username</label>
                        <input onChange={e => setUsername(e.target.value)} value={Username} type='text' id='username' placeholder='username...' style={{ backgroundColor: Colors.inputColor, color: Colors.black }} />
                    </div>

                    <div className="select-container">
                        <label htmlFor="select-country" style={textColor}>country</label>
                        <select onChange={e => setCountry(e.target.value)} value={Country ? Country : ''} id="select-country" style={{ backgroundColor: Colors.inputColor, color: Colors.black }}>
                            {
                                Countries.map(country => {
                                    return (
                                        <option key={country?.name} value={country?.name?.toLowerCase()}>{country?.name?.toLowerCase()}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <button style={{ color: Colors.white }} type='submit' >{Sending ? 'sending...' : 'save'}</button>
                </form>
            </div>
        </div>
    )
}

export default EditProfile