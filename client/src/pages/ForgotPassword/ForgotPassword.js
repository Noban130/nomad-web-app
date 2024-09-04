import React, { useState } from 'react'
import axios from 'axios'
import { useContextApi } from '../../api/ContextApi'
import logo from '../../assets/imgs/logo.png'
import InputContainer from '../../components/InputContainer'

function ForgotPassword() {
    let state = useContextApi()
    let [BackendUrl] = state.BackendUrl

    const [Email, setEmail] = useState('')
    const [Sending, setSending] = useState(false)
    const [Error, setError] = useState('')

    const submitHandler = async e => {
        e.preventDefault()
        setSending(true)
        try {
            let res = await axios.post(`${BackendUrl}/user/forgot-password`, {
                email: Email
            })

            if(res.data.success) {
                setSending(false)
                window.location.href = '/user/check-email-to-reset'
            }
        } catch(error) {
            console.log(error)
            setError(error?.response?.data?.message)
            setSending(false)
        }
    }

    let styles = style()

    return (
        <div className='container'>
            <form className={'loginContainer'} onSubmit={submitHandler}>
                <div className={'logoContainer'}>
                    <img className={'logoImg'} src={logo} alt='nomad world logo' />
                    <p className={'logoText'}>travel easy</p>
                </div>

                <p style={styles.error}>{Error}</p>
                <InputContainer name={'your email'} type={'email'} value={Email} setValue={setEmail} required={true} />

                <button className={'button'} type='submit'>
                    <p className={'buttonText'}>{Sending ? 'sending...' : 'submit'}</p>
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

export default ForgotPassword