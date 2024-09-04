import React, { useState } from 'react'
import Btns from './Btns'
import VisitedCountriesList from './VisitedCountriesList'
import BucketList from './BucketList'

const VisitedAndBucketCountries = () => {
    const [ActiveBtn, setActiveBtn] = useState('visited countries')

    let styles = style()

    return (
        <div style={styles.container}>
            <Btns setActiveBtn={setActiveBtn} ActiveBtn={ActiveBtn} />
            {
                ActiveBtn === 'visited countries' ?
                <VisitedCountriesList /> :
                <BucketList />
            }
        </div>
    )
}

let style = () => {
    return {
        container: {
            width: '100%',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        }
    }
}

export default VisitedAndBucketCountries