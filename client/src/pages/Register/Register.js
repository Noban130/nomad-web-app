import React, { useState } from 'react'
import '../Login/Login.css'
import InputContainer from '../../components/InputContainer'
import axios from 'axios'

import logo from '../../assets/imgs/logo.png'
import google from '../../assets/imgs/google.svg'
import apple from '../../assets/imgs/apple.svg'
import facebook from '../../assets/imgs/facebook.svg'
import { Link } from 'react-router-dom'
import { useContextApi } from '../../api/ContextApi'

const Register = () => {
    let state = useContextApi()
    let [BackendUrl] = state.BackendUrl

    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [Error, setError] = useState('')
    const [Sending, setSending] = useState(false)

    let submitHandler = async e => {
        e.preventDefault()
        if(Email.length < 8) return setError('please enter your email!')
        if(!Password) return setError('please enter your password!')
        if(Password.length < 8) return setError('the password should be at least 8 characters!')
        setSending(true)
                
        try {
            let res = await axios.post(`${BackendUrl}/user/register`, {
                email: Email, password: Password
            })

            if(res.data.success) {
                setSending(false)
                setError('')
                window.location.href = '/user/check-email-to-activate'
            }
        } catch(error) {
            setSending(false)
            console.log(error);
            console.log(error.response.data.message);
            setError(error.response.data.message)
        }
    }
    
    let onGoogleSubmit = () => console.log('Google Submit');
    let onFacebookSubmit = () => console.log('Facebook Submit');
    let onAppleSubmit = () => console.log('Apple Submit');

    let styles = style()

    return (
        <div className='container'>
            <form className={'loginContainer'} onSubmit={submitHandler}>
                <div className={'logoContainer'}>
                    <img className={'logoImg'} src={logo} alt='nomad world logo' />
                    <p className={'logoText'}>travel easy</p>
                </div>

                <p style={styles.error}>{Error}</p>
                <InputContainer name={'email'} type={'email'} value={Email} setValue={setEmail} required={true} />
                <InputContainer name={'password'} type={'password'} value={Password} setValue={setPassword} required={true} />

                <button className={'button'} type='submit'>
                    <p className={'buttonText'}>{Sending ? 'sending...' : 'sign up'}</p>
                </button>

                <div className={'paragraph'}>
                    <p className={'paragraph_text'}>i already have an account - </p>
                    <Link to={'/login'} className={'underline'}>login</Link>
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

export default Register