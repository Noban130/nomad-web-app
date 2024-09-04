import React, { useState } from 'react'
import './ShareWithFriends.css'

import logo from '../../assets/imgs/logo.png'
import shareToSocielMedia from '../../assets/imgs/shareToSocielMedia.png'
import share from '../../assets/imgs/share.svg'
import money from '../../assets/imgs/money-bold.svg'

import { SkipBtnOnly, SkipContinueBtns } from '../../components/SkipContinueBtns'

const ShareWithFriends = () => {
    const [ShowPopup, setShowPopup] = useState(false)
    
    let shareWithFriends = async () => {
        try {
            await navigator
            .share({
                title: 'nomad world',
                text: 'nomad world',
                url: 'https://nomadworld.ai'
            })
            console.log('Successful share! 🎉')
            
        } catch (error) {
            console.log(error);
        }
    }

    const skipHandler = () => {
        setShowPopup(true)
    }

    return (
        <div className={'share-WithFriends-wrapper'}>
            <div className={'share-WithFriends-container'}>
                <div className={'header'}>
                    <img className={'logo'} src={logo} alt='' />
                </div>

                <p className={'name'}>serena</p>
                <p className={'text'}>let's find your friends</p>
                <p className={'paragraph'}>see witch of your friends are already on nomad and invite others to join</p>

                <img className={'shareToSocielMediaImg'} src={shareToSocielMedia} alt='' />

                <ConnectBtn onClick={shareWithFriends} img={share} text={'share with your friends'} />

                <div className={'earnContainer'}>
                    <img src={money} className={'earnImage'} alt='' />
                    <p className={'earnText'}>earn 20 points for every friends you invite that joins nomad</p>
                </div>
                    
                <SkipBtnOnly skip={skipHandler}  />
            </div>

            { ShowPopup && <SkipStep setShowPopup={setShowPopup} />}
        </div>
            
    )
}

let ConnectBtn = ({ onClick, img, text }) => {
    return (
        <button className={'connectContainer'} onClick={onClick}>
            <img className={'connectImg'} src={img} alt='' />
            <p className={'connectText'}>{text}</p>
        </button>
    )
}

let SkipStep = () => {
    return (
        <div className={'skipScreen'}>
            <div className={'skipBody'}>
                <p className={'skipFirstText'}>nomad is more fun when you add friends and see their reviews.</p>
                <p className={'skipSecondText'}>are you sure that you want to skip this step ?</p>
            </div>
            <SkipContinueBtns continueText={'connect'} showArrow={false} skip={'/foryou'} continueBtn={() => window.location.href = '/foryou'} />
        </div>
    )
}


export default ShareWithFriends