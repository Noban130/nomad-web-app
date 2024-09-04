import React from 'react'
import { useContextApi } from '../../../api/ContextApi'
import { UnitedStateMap } from '../../../api/CountriesMaps'

const CountryMap = () => {
    
    let state = useContextApi()
    let [Colors] = state.Colors
    let styles = style(Colors)

    return (
        <div style={styles.container}>
            <UnitedStateMap width={'100%'} />
        </div>
    )
}

let style = (Colors) => {
    return {
        container: {
            padding: 20,
            width: '100%',
            maxWidth: 700,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
    }
}

export default CountryMap