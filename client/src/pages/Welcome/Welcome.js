import React from 'react'
import './Welcome.css'
import { Link } from 'react-router-dom'

import logo from '../../assets/imgs/logo.png'
import plane from '../../assets/imgs/plane.svg'
import money from '../../assets/imgs/money.svg'
import share from '../../assets/imgs/share.svg'
import ai from '../../assets/imgs/ai.png'

const Welcome = () => {

    return (
        <div className={'container'}>
            <div className={'welcomeContainer'}>

                <p className={'welcomeText'}>welcome to</p>
                <div className={'logoContainer'}>
                    <img className={'logoImg'} src={logo} alt='nomad world logo' />
                    <p className={'logoText'}>travel easy</p>
                </div>

                <Item 
                    img={plane}
                    header={'plan & book your entire trip'}
                    paragraph={'flights, accommodations, rentals, things to do and more'}
                />
                <Item 
                    img={money}
                    header={'earn tokens on all bookings'}
                    paragraph={'redeem your tokens for rewards'}
                />
                <Item 
                    img={share}
                    header={'share travel plans with friends'}
                    paragraph={'meet & interact with other nomads'}
                />
                <Item 
                    img={ai}
                    header={'personalized experiences'}
                    paragraph={'with your ai sidekick'}
                />

                <Link className={'btn'} to={'/username'}>
                    <p className={'btnText'}>get started</p>
                </Link>
            </div>
        </div>
    )
}

let Item = ({ img, header, paragraph }) => {
    return (
        <div className={'item'}>
            <div className={'imgContainer'}>
                <img className={'itemImg'} src={img} alt='' />
            </div>
            <div className={'ItemContent'}>
                <p className={'ItemContentHeader'}>{header}</p>
                <p className={'ItemContentParagraph'}>{paragraph}</p>
            </div>
        </div>
    )
}

export default Welcome