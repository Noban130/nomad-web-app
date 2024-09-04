import React, { useEffect, useState } from 'react'
import axios from 'axios'

import InputContainer from '../../components/InputContainer'
import RangeBar from '../../components/RangeBar'
import { useContextApi } from '../../api/ContextApi'

import './Username.css'
import arrow from '../../assets/imgs/arrow.png'
import logo from '../../assets/imgs/logo.png'

const Username = () => {
    let state = useContextApi()
    let [BackendUrl] = state.BackendUrl
    let [UserToken] = state.UserToken
    let [UserData] = state.UserData

    const [Name, setName] = useState('')
    const [LastName, setLastName] = useState('')
    const [UserName, setUserName] = useState('')
    const [Error, setError] = useState('')
    const [Sending, setSending] = useState(false)

    useEffect(() => {
        if(UserData) {
            setName(UserData?.firstname || '')
            setLastName(UserData?.lastname || '')
            setUserName(UserData?.username || '')
        }
    }, [UserData])

    let submitHandler = async e => {
        e.preventDefault()
        setSending(true)

        if(UserToken) {
            try {
                let res = await axios.put(`${BackendUrl}/user/fullname`, {
                    firstname: Name,
                    lastname: LastName,
                    username: UserName
                }, {
                    headers: {
                        'Authorization': UserToken
                    }
                })

                if(res.data.success) {
                    setSending(false)
                    setError('')
                    window.location.href = '/birthday'
                }
            } catch(error) {
                setSending(false)
                console.log(error);
                console.log(error.response.data.message);
                setError(error.response.data.message)
            }
        }
    }

    let styles = style()

    return (
        <div className='username-wrapper'>
            <form className={'username-container'} onSubmit={submitHandler}>
                <div className={'logoContainer'}>
                    <img className={'logoImg'} src={logo} alt='' />
                    <p className={'logoText'}>travel easy</p>
                </div>

                <RangeBar range={1} />
                
                <p style={styles.error}>{Error}</p>
                <InputContainer name={'first name'} value={Name} setValue={setName} error={''} type={'text'} required={true} />
                <InputContainer name={'last name'} value={LastName} setValue={setLastName} message={'last name is optional'} type={'text'} />
                <InputContainer name={'username'} value={UserName} setValue={setUserName} message={'you can change this at anytime'} error={''} type={'text'} required={true} />
                
                <button className={'btn'} type='submit' >
                    {
                        Sending ?
                        'sending...' :
                        <>
                            continue <img className={'btnImg'} src={arrow} alt='' />
                        </>
                    }
                </button>
            </form>
        </div>
    )
}

let style = () => {
    return {
        error: {
            color: '#f00',
            fontSize: 14,
        }
    }
}

export default Username