import React, { useState } from 'react'
import axios from 'axios'
import { useContextApi } from '../../api/ContextApi'
import { useParams } from 'react-router-dom'
import logo from '../../assets/imgs/logo.png'
import InputContainer from '../../components/InputContainer'

function ResetPassword() {
    let state = useContextApi()
    let [BackendUrl] = state.BackendUrl

    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [Sending, setSending] = useState(false)
    const [Error, setError] = useState('')

    let params = useParams()

    const submitHandler = async e => {
        e.preventDefault()
        setSending(true)
        try {
            let res = await axios.post(`${BackendUrl}/user/reset-password`, {
                password: Password, confirmPassword: ConfirmPassword
            }, {
                headers: {
                    'Authorization': params.id
                }
            })

            if(res.data.success) {
                setSending(false)
                window.location.href = '/login'
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
                <InputContainer name={'new password'} type={'password'} value={Password} setValue={setPassword} required={true} />
                <InputContainer name={'confirm password'} type={'password'} value={ConfirmPassword} setValue={setConfirmPassword} required={true} />

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

export default ResetPassword