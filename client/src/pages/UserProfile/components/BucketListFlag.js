import React, { useEffect, useState } from 'react'
import '../Profile.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Flags from '../../../assets/flags'

const BucketListFlag = (props) => {
    let { name, textColor, ProfileData, UserData, Callback, setCallback, BackendUrl, UserToken, Type } = props
    const [ShowRemoveBtn, setShowRemoveBtn] = useState(false)
    let params = useParams()

    useEffect(() => {
        if(params.id && UserData) {
            UserData?._id === params.id ?
            setShowRemoveBtn(true) :
            setShowRemoveBtn(false)
        } else {
            setShowRemoveBtn(false)
        }
    }, [params, ProfileData, UserData])

    let deleteCountry = async e => {
        e.preventDefault()
        try {
            await axios.put(`${BackendUrl}/user/${Type === 'visited countries' ? 'remove-visited-country' : 'remove-bucket-list-country'}`, {
                country: name.toLowerCase()
            }, {
                headers: {
                    'Authorization': UserToken
                }
            })
            setCallback(!Callback)

        } catch (error) {
            console.log(error?.response?.data?.error);
        }
    }

    return (        
        <div className='flag-container'>
            {
                ShowRemoveBtn ?
                <button className='remove' onClick={deleteCountry}>
                    <p className='x'>✖</p>
                </button> :
                null
            }
            <div className='flag'>
                { Flags[name]?.svg }
            </div>
            <p className='country-name' style={textColor}>{name?.toLowerCase()}</p>
        </div>
    )
}

export default BucketListFlag