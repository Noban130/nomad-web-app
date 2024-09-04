import React from 'react'
import arrow from '../assets/imgs/arrow.png'
import './SkipContinueBtns.css'
import { Link } from 'react-router-dom'

export const SkipBtn = ({ skip }) => {
    return (
        <Link className={'skipBtn'} to={skip}>
            <p className={'skipText'}>skip</p>
        </Link>
    )
}

export const SkipBtnOnly = ({ skip }) => {
    return (
        <button className={'skipBtnOnly'} onClick={skip}>
            <p className={'skipText'}>skip</p>
        </button>
    )
}

export const SkipContinueBtns = ({ skip, continueBtn, continueText, Sending = false, showArrow = true }) => {
    return (
        <div className={'btnsContainer'}>
            <SkipBtn skip={skip} />

            <button className={'continueBtn'} onClick={continueBtn}>
                <p className={'continueBtnText'}>{!Sending ? (!continueText ? 'continue' : continueText) : 'sending...'}</p>
                {!Sending && (showArrow && <img className={'continueBtnImg'} src={arrow} alt='' /> )}
            </button>
        </div>
    )
}