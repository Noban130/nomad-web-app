import React from 'react'
import logo from '../../assets/imgs/logo.png'

function CheckYourEmail(props) {
    let { message } = props
    return (
        <div className='container'>
            <div className={'loginContainer'}>
                <div className={'logoContainer'}>
                    <img className={'logoImg'} src={logo} alt='nomad world logo' />
                    <p className={'logoText'}>travel easy</p>
                </div>

                <h1 className='verify-your-email-h1'>check your email to {message}</h1>
            </div>
        </div>
    )
}

export default CheckYourEmail