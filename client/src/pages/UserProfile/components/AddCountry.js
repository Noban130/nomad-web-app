import React, { useState } from 'react'
import Countries from '../../UserLocation/Countries'
import axios from 'axios'

function AddCountry(props) {
    let { textColor, Colors, BackendUrl, UserToken, Callback, setCallback, setTripsActiveItem } = props

    const [Country, setCountry] = useState('afghanistan')
    const [Type, setType] = useState('visited countries')

    let addCountry = async e => {
        e.preventDefault()
        try {
            await axios.put(`${BackendUrl}/user/${Type === 'visited countries' ? 'add-visited-country' : 'add-bucket-list-country'}`, {
                country: Country
            }, {
                headers: {
                    'Authorization': UserToken
                }
            })
            setCallback(!Callback)
            setTripsActiveItem(Type === 'visited countries' ? 'visited' : 'bucket')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='add-countries-container'>
            <p className='title' style={textColor}>add countries</p>
            <p className='paragraph' style={textColor}>add countries to your visited countries list or bucket list</p>

            <form className="add-countries-form" onSubmit={addCountry}>
                <div className="select-container">
                    <label htmlFor="select-country" style={textColor}>country</label>
                    <select id="select-country" style={{ backgroundColor: Colors.inputColor, color: Colors.black }} onChange={e => setCountry(e.target.value)} value={Country}>
                        {
                            Countries.map(country => {
                                return (
                                    <option key={country?.name} value={country?.name?.toLowerCase()}>{country?.name?.toLowerCase()}</option>
                                )
                            })
                        }
                    </select>
                </div>
                
                <div className="select-container">
                    <label htmlFor="select-type" style={textColor}>type</label>
                    <select id="select-type" style={{ backgroundColor: Colors.inputColor, color: Colors.black }} onChange={e => setType(e.target.value)} value={Type}>
                        <option value="visited countries">visited countries</option>
                        <option value="bucket list">bucket list</option>
                    </select>
                </div>

                <button style={{ color: Colors.white }} type='submit'>add to profile</button>
            </form>
        </div>
    )
}

export default AddCountry