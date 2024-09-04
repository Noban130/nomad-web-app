import React, { useEffect, useState } from 'react'
import logo from '../../assets/imgs/logo.png'
import account from '../../assets/imgs/account_circle_light.svg'
import leftArrow from '../../assets/imgs/left-arrow.svg'
import './UploadProfileImage.css'

import RangeBar from '../../components/RangeBar'
import { SkipContinueBtns } from '../../components/SkipContinueBtns'
import { Link } from 'react-router-dom'
import { useContextApi } from '../../api/ContextApi'
import axios from 'axios'

const UploadProfileImage = () => {
    let state = useContextApi()
    let [BackendUrl] = state.BackendUrl
    let [UserToken] = state.UserToken
    let [UserData] = state.UserData

    const [Sending, setSending] = useState(false)
    const [Uploading, setUploading] = useState(false)
    const [Deleting, setDeleting] = useState(false)
    const [Error, setError] = useState('')
    const [Img, setImg] = useState({})

    useEffect(() => {
        if(UserData) setImg(UserData?.profile_img || {})
    }, [UserData])

    const uploadImg = async e => {
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
                setImg({})    
            } catch (error) {
                setDeleting(false)
                console.log(error);
                console.log(error.response.data.message);
                setError(error.response.data.message)            
            }
        }
    }

    let styles = style()

    return (
        <div className='upload-profile-img-wrapper'>
            <div className={'upload-profile-img-container'}>
                <div className={'header'}>
                    <Link className='back' to={'/userlocation'}>
                        <img className='back-arrow' src={leftArrow} alt='' />
                        <p>back</p>
                    </Link>
                    <img className={'logo'} src={logo} alt='' />
                </div>

                <RangeBar range={4} />

                <p className={'name'}>{UserData?.username}</p>
                <p className={'text'}>upload your profile image</p>

                <input id='upload-img' type='file' hidden accept="image/png, image/jpg, image/jpeg, image/webp" onChange={e => uploadImg(e)} />
                <label htmlFor='upload-img' className={'ProfileContainer'}>
                    <img className={'ProfileImg'} src={account} alt='' />
                    <p className={'ProfileText'}>upload your profile image</p>
                </label>
                
                { Uploading ? <h1 style={styles.uploading}>uploading...</h1> : null }
                { Deleting ? <h1 style={styles.deleting}>deleting...</h1> : null }
                { Error ? <h1 style={styles.deleting}>{Error}</h1> : null }
                { 
                    Object.keys(Img).length !== 0 ?
                    <div style={styles.profileImgContainer}>
                        <button style={styles.deletePhoto} onClick={e => deleteImg(e, Img?.key)}>x</button>
                        <img style={styles.profileImg} src={Img?.url} alt='' />
                    </div> : 
                    null 
                }

                <SkipContinueBtns 
                    skip={'/foryou'} 
                    continueBtn={() => window.location.href = '/foryou'}
                    continueText='complete setup'
                    Sending={Sending} 
                />
            </div>
        </div>
    )
}

let style = () => {
    return {
        uploading: {
            margin: '20px 0 -20px',
            fontSize: 17,
            color: '#fff',
        },
        deleting: {
            margin: '20px 0 -20px',
            fontSize: 17,
            color: '#f00',
        },
        profileImgContainer: {
            position: 'relative',
            
            marginTop: 40,
            marginBottom: 40,
            padding: 10,
            width: '80%',
            aspectRatio: '1/1',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            
            borderRadius: '50%',
            border: '2px dashed #fff',
        },
        profileImg: {
            width: '100%',
            aspectRatio: '1/1',
            objectFit: 'cover',
            
            borderRadius: '50%',
            overflow: 'hidden',
        },
        deletePhoto: {
            position: 'absolute',
            top: 0,
            right: 0,

            width: 20,
            height: 20,
            
            backgroundColor: '#f00',
            color: '#fff',

            borderRadius: '50%',
            border: 'none',
            outline: 'none',

            cursor: 'pointer',
        }
    }
}

export default UploadProfileImage