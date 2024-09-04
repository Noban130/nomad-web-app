import React, { useState } from 'react'
import './Login.css'
import InputContainer from '../../components/InputContainer'
import axios from 'axios'

import logo from '../../assets/imgs/logo.png'
import google from '../../assets/imgs/google.svg'
import apple from '../../assets/imgs/apple.svg'
import facebook from '../../assets/imgs/facebook.svg'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { useContextApi } from '../../api/ContextApi'

const Login = () => {
    let state = useContextApi()
    let [BackendUrl] = state.BackendUrl

    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [Error, setError] = useState('')
    const [Sending, setSending] = useState(false)
    
    let onGoogleSubmit = () => console.log('Google Submit');
    let onFacebookSubmit = () => console.log('Facebook Submit');
    let onAppleSubmit = () => console.log('Apple Submit');

    let submitHandler = async e => {
        e.preventDefault()
        if(Email.length < 8) return setError('please enter your email!')
        if(!Password) return setError('please enter your password!')
        if(Password.length < 8) return setError('the password should be at least 8 characters!')
        
        setSending(true)
        const cookies = new Cookies(null, { path: '/', expires: new Date(Date.now()+86400000) });
                
        try {
            let res = await axios.post(`${BackendUrl}/user/login`, {
                email: Email, password: Password
            })

            if(res.data.success) {
                cookies.set('accesstoken', res.data.accesstoken);

                setSending(false)
                setError('')

                const stepCompleted = res?.data?.data?.step_completed;

                if (!stepCompleted) window.location.href = '/welcome'
                else if (stepCompleted === 0) window.location.href = '/welcome'
                else if (stepCompleted === 1) window.location.href = '/birthday'
                else if (stepCompleted === 2) window.location.href = '/userLocation'
                else if (stepCompleted === 3) window.location.href = '/uploadProfileImage'
                else if (stepCompleted === 4) window.location.href = '/foryou'
            }
        } catch(error) {
            setSending(false)
            console.log(error);
            console.log(error.response.data.message);
            setError(error.response.data.message)
        }
    }

    let styles = style()

    return (
        <div className={'container'}>
            <form className={'loginContainer'} onSubmit={submitHandler}>
                <div className={'logoContainer'}>
                    <img className={'logoImg'} src={logo} alt='nomad world logo' />
                    <p className={'logoText'}>travel easy</p>
                </div>

                <p style={styles.error}>{Error}</p>
                <InputContainer name={'email'} type={'email'} value={Email} setValue={setEmail} required={true} />
                <InputContainer name={'password'} type={'password'} value={Password} setValue={setPassword} required={true} />

                <button className={'button'} type='submit'>
                <p className={'buttonText'}>{Sending ? 'sending...' : 'login'}</p>
                </button>

                <div className={'paragraph'}>
                    <p className={'paragraph_text'}>i don't have an account - </p>
                    <Link to={'/register'} className={'underline'}>register</Link>
                </div>

                <div className={'paragraph'}>
                    <Link to={'/forgot-password'} className={'underline'}>forgot password</Link>
                </div>

                <div className={'orContainer'}>
                    <div className={'orBorder'}></div>
                    <p className={'or'}>or</p>
                    <div className={'orBorder'}></div>
                </div>

                <div className={'socialMediaContainer'}>
                    <button className={'socialMedia'} onClick={onGoogleSubmit}>
                        <img src={google} alt='google svg logo' className={'socialMediaImg'} />
                    </button>
                    <button className={'socialMedia'} onClick={onFacebookSubmit}>
                        <img src={facebook} alt='facebook svg logo' className={'socialMediaImg'} />
                    </button>
                    <button className={'socialMedia'} onClick={onAppleSubmit}>
                        <img src={apple} alt='apple svg logo' className={'socialMediaImg'} />
                    </button>
                </div>
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

export default Login