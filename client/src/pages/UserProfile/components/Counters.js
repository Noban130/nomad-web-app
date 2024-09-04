import React from 'react'
import { Link } from 'react-router-dom'

let Counters = (props) => {
    let { ProfileData, displayCountries, setActiveBtn } = props
    if(Object.keys(ProfileData).length === 0) return null
    
    return (
        <div className="counters">
            <div className="counter" onClick={() => displayCountries('visited')}>
                <p className="label">countries visited</p>
                <p className="number">{ProfileData?.account?.visited_countries?.length}</p>
            </div>
            
            <div className="counter" onClick={() => displayCountries('bucket')}>
                <p className="label">bucket list</p>
                <p className="number">{ProfileData?.account?.bucket_list?.length}</p>
            </div>
            
            <Link to={'/allCheckins'} className="counter">
                <p className="label">checkins</p>
                <p className="number">{ProfileData?.account?.checkins?.length}</p>
            </Link>
            
            <div className="counter" onClick={() => setActiveBtn('reviews')}>
                <p className="label">reviews</p>
                <p className="number">{ProfileData?.account?.reviews?.length}</p>
            </div>
        </div>
    )
}

export default Counters