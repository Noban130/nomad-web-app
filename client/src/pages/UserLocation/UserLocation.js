import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/imgs/logo.png'
import location from '../../assets/imgs/location.svg'
import leftArrow from '../../assets/imgs/left-arrow.svg'
import './UserLocation.css'
import { useContextApi } from '../../api/ContextApi'
import axios from 'axios'

import RangeBar from '../../components/RangeBar'
import { SkipContinueBtns } from '../../components/SkipContinueBtns'
import Countries from './Countries'

const UserLocation = () => {
    let state = useContextApi()
    let [BackendUrl] = state.BackendUrl
    let [UserToken] = state.UserToken
    let [UserData] = state.UserData
    
    const [Country, setCountry] = useState('united states')
    const [Error, setError] = useState('')
    const [Sending, setSending] = useState(false)

    useEffect(() => {
        if(UserData) setCountry(UserData?.country || 'united states')
    }, [UserData])

    let submitHandler = async e => {
        e.preventDefault()
        setSending(true)

        if(UserToken) {
            try {
                let res = await axios.put(`${BackendUrl}/user/country`, {
                    country: Country
                }, {
                    headers: {
                        'Authorization': UserToken
                    }
                })
    
                if(res.data.success) {
                    setSending(false)
                    setError('')
                    window.location.href = '/uploadProfileImage'
                }
            } catch(error) {
                setSending(false)
                console.log(error);
                console.log(error.response.data.message);
                setError(error.response.data.message)
            }
        }
    }

    return (
        <div className='userlocation-wrapper'>
            <div className={'userlocation-container'}>
                <div className={'header'}>
                    <Link className='back' to={'/birthday'}>
                        <img className='back-arrow' src={leftArrow} alt='' />
                        <p>back</p>
                    </Link>
                    <img className={'logo'} src={logo} alt='' />
                </div>

                <RangeBar range={3} />
                
                <p style={styles.error}>{Error}</p>
                <p className={'name'}>{UserData?.username}</p>
                <p className={'text'}>where are you located?</p>

                <div style={styles.selectContainer}>
                    <div style={styles.imgContainer}>
                        <img style={styles.img} className={'locationImg'} src={location} alt='location icon svg' />
                    </div>
                    <select style={styles.select} onChange={e => setCountry(e.target.value)} value={Country}>
                        {
                            Countries?.map(country => {
                                return (
                                    <option style={styles.option} key={country.name} value={country.name}>{country.name}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <SkipContinueBtns 
                    skip={'/uploadProfileImage'} 
                    continueBtn={submitHandler}
                    Sending={Sending} 
                />
            </div>
        </div>
    )
}

let styles = {
    selectContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
    },
    imgContainer: {
        marginTop: 20,
        padding: 6,
        width: 40,
        height: 40,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
        backgroundColor: '#ffffff20',
        border: "1px solid #ffffff40",
        borderRadius: 10,
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    select: {
        marginTop: 20,
        width: '100%',
        maxWidth: 500,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        backgroundColor: '#ffffff20',
        border: "1px solid #ffffff40",
        borderRadius: 10,
        outline: 'none',

        color: '#fff',
        cursor: 'pointer',
    },
    option: {
        color: '#000',
    },
    error: {
        color: '#f00',
    }
}

export default UserLocation