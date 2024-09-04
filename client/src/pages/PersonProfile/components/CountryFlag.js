import React from 'react'
import { useContextApi } from '../../../api/ContextApi'
import { FranceFlag } from '../../../api/CountriesFlags'

const CountryFlag = () => {
    
    let state = useContextApi()
    let [Colors] = state.Colors
    let styles = style(Colors)

    return (
        <div style={styles.container}>
            <FranceFlag width={130} height={97.5}/>
            <p style={styles.countryName}>united states</p>
        </div>
    )
}

let style = (Colors) => {
    return {
        container: {
            marginTop: 10,
            marginBottom: 10,
            width: '100%',
            
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        flag: {
            width: 130,
            height: 97.5,
            objectFit: 'contain',
        },
        countryName: {
            marginTop: 5,
    
            fontFamily: 'Poppins',
            fontWeight: 600,
            color: Colors.black,
            fontSize: 17,
            textAlign: 'center',
        },
    }
}

export default CountryFlag