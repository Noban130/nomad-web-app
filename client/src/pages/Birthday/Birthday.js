import React, { useEffect, useState } from 'react'
import './Birthday.css'
import logo from '../../assets/imgs/logo.png'
import leftArrow from '../../assets/imgs/left-arrow.svg'
import RangeBar from '../../components/RangeBar'
import { SkipContinueBtns } from '../../components/SkipContinueBtns'
import Dates from './Dates'
import { calculateAge, getDaysInMonth } from './methods'
import { Link } from 'react-router-dom'
import { useContextApi } from '../../api/ContextApi'
import axios from 'axios'

const Birthday = () => {
    let state = useContextApi()
    let [BackendUrl] = state.BackendUrl
    let [UserToken] = state.UserToken
    let [UserData] = state.UserData

    const [Day, setDay] = useState(1)
    const [Month, setMonth] = useState('january')
    const [Year, setYear] = useState(2003)
    const [Age, setAge] = useState(21)
    const [ShowOptions, setShowOptions] = useState({ day: false, month: false, year: false })

    const [Error, setError] = useState('')
    const [Sending, setSending] = useState(false)

    useEffect(() => {
        setAge(calculateAge(Day, Month, Year).age)
    }, [Day, Month, Year])

    useEffect(() => {
        if(UserData !== undefined) {
            let date = new Date(UserData?.birthday)
            let day = date?.getDate()
            let month = Dates?.month[date?.getMonth()]
            let year = date?.getFullYear()
            let age = calculateAge(day, month, year).age

            setDay(day || 1)
            setMonth(month || 'january')
            setYear(year || 2001)
            setAge(age || '')
        }
    }, [UserData])

    let submitHandler = async e => {
        e.preventDefault()
        setSending(true)

        if(UserToken) {
            try {
                let res = await axios.put(`${BackendUrl}/user/birthday`, {
                    birthday: new Date(`${Dates.month.indexOf(Month)+1}-${Day}-${Year}`)
                }, {
                    headers: {
                        'Authorization': UserToken
                    }
                })

                if(res.data.success) {
                    setSending(false)
                    setError('')
                    window.location.href = '/userLocation'
                }
            } catch(error) {
                setSending(false)
                console.log(error);
                console.log(error.response.data.message);
                setError(error.response.data.message)
            }
        }
    }

    return (
        <div className={'container'}>
            <div className='birthdayContainer'>
                <div className={'header'}>
                    <Link className='back' to={'/username'}>
                        <img className='back-arrow' src={leftArrow} alt='' />
                        <p>back</p>
                    </Link>
                    <img className={'logo'} src={logo} alt='nomad world logo' />
                </div>

                <RangeBar range={2} />

                <p className={'name'}>{UserData?.username}</p>
                <p className={'text'}>when your birthday?</p>
                
                <div className={'datesContainer'}>
                    <SelectOption 
                        label={'day'} 
                        data={Dates.day.slice(0, getDaysInMonth(Month, Year))} 
                        Option={Day}
                        setOption={setDay}
                        ShowOptions={ShowOptions}
                        setShowOptions={setShowOptions}
                    />
                    <SelectOption 
                        label={'month'} 
                        data={Dates.month} 
                        Option={Month}
                        setOption={setMonth}
                        ShowOptions={ShowOptions}
                        setShowOptions={setShowOptions}
                    />
                    <SelectOption 
                        label={'year'} 
                        data={Dates.year} 
                        Option={Year}
                        setOption={setYear}
                        ShowOptions={ShowOptions}
                        setShowOptions={setShowOptions}
                    />
                </div>

                <div className={'ageContainer'}>
                    <p className={'ageText'}>you're</p>
                    <p className={'ageBoldText'}>{Age}</p>
                    <p className={'ageText'}>years old</p>
                </div>

                <SkipContinueBtns 
                    skip={'/userLocation'} 
                    continueBtn={submitHandler}
                    Sending={Sending} 
                />
            </div>
        </div>
    )
}

let SelectOption = ({ label, data, Option, setOption, ShowOptions, setShowOptions }) => {
    return (
        <div className={'selectContainer'} onClick={() => setShowOptions({...ShowOptions, [label]: !ShowOptions[label] })}>
            <p className={'label'}>{label}</p>
            <div className={'select'}>
                <p className={'selectText'}>{Option}</p>
                {/* <img className={'selectArrow'} src={arrow} /> */}
            </div>
            
            {
                ShowOptions[label] ?
                <div className={'optionsContainer'}>
                {
                    data.map((item) => {
                        return (
                            <OptionItem 
                                key={item}
                                value={item} 
                                label={label}
                                setOption={setOption} 
                                ShowOptions={ShowOptions}
                                setShowOptions={setShowOptions}
                            />
                        )
                    })
                }
                </div> : 
                null
            }
        </div>
    )
}

let OptionItem = ({ value, label, setOption, ShowOptions, setShowOptions }) => {
    let optionHandler = () => {
        setOption(value)
        setShowOptions({ ...ShowOptions, [label]: false })
    }

    return (
        <button className={'option'} onClick={optionHandler}>
            <p className={'optionText'}>{value}</p>
        </button>
    )
}

export default Birthday