import React from 'react'
import { useContextApi } from '../../../api/ContextApi'
import { BrazilFlag, FranceFlag, IndonesiaFlag, JaponFlag, KoreaFlag } from '../../../api/CountriesFlags'
import BucketListFlag from './BucketListFlag'

const BucketList = () => {
    
    let state = useContextApi()
    let [Colors] = state.Colors
    let styles = style(Colors)

    return (
        <div style={styles.container}>
            <p style={styles.title}>bucket list</p>
            <p style={styles.paragraph}>places you want to visit</p>

            <div style={styles.bucketList}>
                <BucketListFlag name={'france'}>
                    <FranceFlag />
                </BucketListFlag>

                <BucketListFlag name={'brazil'}>
                    <BrazilFlag />
                </BucketListFlag>

                <BucketListFlag name={'korea'}>
                    <KoreaFlag />
                </BucketListFlag>

                <BucketListFlag name={'indonesia'}>
                    <IndonesiaFlag />
                </BucketListFlag>

                <BucketListFlag name={'japon'}>
                    <JaponFlag />
                </BucketListFlag>
            </div>
        </div>
    )
}

let style = (Colors) => {
    
    return {
        container: {
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 20,
            paddingTop: 10,
    
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        title: {
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: 24,
            textAlign: 'center',
            color: Colors.black,
        },
        paragraph: {
            marginBottom: 20,
            fontFamily: 'Poppins',
            fontWeight: 300,
            fontSize: 12,
            textAlign: 'center',
            color: Colors.black,
        },
        bucketList: {
            width: '100%',
            maxWidth: 500,
            marginTop: 10,
            marginLeft: 'auto',
            marginRight: 'auto',

            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            columnGap: 30,
        },
    }
}

export default BucketList