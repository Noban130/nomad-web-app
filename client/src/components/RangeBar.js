import React from 'react'
import './RangeBar.css'

let RangeBar = ({ range }) => {
    return (
        <div className={'rangeBarContainer'}>
            <div className={'defaultRange'}>
                <div className='currentRange' style={{ width: `${range*25}%` }}></div>
            </div>
            <div>
                <p className={'range'}>{range} / 4</p>
            </div>
        </div>
    )
}

export default RangeBar