import React from 'react'
import axios from 'axios'
import { useContextApi } from '../../api/ContextApi'
import logo from '../../assets/imgs/logo.png'
import { useParams } from 'react-router-dom'

function VerifyYourEmail() {
    let state = useContextApi()
    let [BackendUrl] = state.BackendUrl
    let params = useParams()

    const submitHandler = async e => {
        e.preventDefault()
        try {
            let res = await axios.post(`${BackendUrl}/user/activate`, {
                activationToken: params.id
            })

            if(res.data.success) {
                window.location.href = '/login'
            }
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className='container'>
            <form className={'loginContainer'} onSubmit={submitHandler}>
                <div className={'logoContainer'}>
                    <img className={'logoImg'} src={logo} alt='nomad world logo' />
                    <p className={'logoText'}>travel easy</p>
                </div>

                <h1 className='verify-your-email-h1'>click the button bellow to verify your email</h1>
                
                <button className={'button'} type='submit'>
                    <p className={'buttonText'}>verify</p>
                </button>
            </form>
        </div>
    )
}

export default VerifyYourEmail