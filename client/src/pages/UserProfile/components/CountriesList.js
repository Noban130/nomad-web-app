import React, { useEffect, useState } from 'react'
import BucketListFlag from './BucketListFlag'
import { FranceFlag } from '../../../api/CountriesFlags'

function CountriesList(props) {
    let { type, name, textColor, ProfileData = {}, UserData, Callback, setCallback, UserToken, BackendUrl } = props
    const [Content, setContent] = useState({ title: '', p: '' })

    useEffect(() => {
        type === 'visited' ? 
        setContent({ title: 'visited countries', p: 'these are all the countries you have visited' }) : 
        setContent({ title: 'bucket list', p: 'places you want to visit' })
    }, [type, name, ProfileData])
    
    if(Object.keys(ProfileData).length === 0) return null
    
    return (
        <div className='countries-list-container'>
            <p className='title' style={textColor}>{Content?.title}</p>
            <p className='paragraph' style={textColor}>{Content?.p}</p>

            {
                ProfileData?.account[name]?.length === 0 ?
                <p className='no-countries' >you did not visit any country yet!</p> : 

                <div className='list'>
                    {
                        ProfileData?.account[name]?.map(country => {
                            return (
                                <BucketListFlag 
                                    name={country} 
                                    textColor={textColor} 
                                    key={country} 
                                    ProfileData={ProfileData} 
                                    UserData={UserData} 
                                    Callback={Callback} 
                                    setCallback={setCallback} 
                                    UserToken={UserToken} 
                                    Type={Content?.title}
                                    BackendUrl={BackendUrl}
                                >
                                    <FranceFlag />
                                </BucketListFlag>
                            )
                        })
                    }
                </div>
                
            }
        </div>
    )
}

export default CountriesList