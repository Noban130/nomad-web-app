import React from 'react'
import { useContextApi } from '../api/ContextApi'

const Input = ({ name, value, setValue, message, error }) => {
    let state = useContextApi()
    let [Colors] = state.Colors
    let styles = style(Colors)

    return (
        <div style={styles.textInputContainer}>
            <p style={styles.label}>{name}</p>
            <input 
                type='text'
                style={styles.input} 
                onChange={e => setValue(e)} value={value}
            />
            {
                (message || error) &&
                <p style={error ? styles.error : styles.normal}>{ error ? error : message }</p>
            }
        </div>
    )
}

let style = (Colors) => {
    
    return {
        textInputContainer: {
            marginTop: 10,
            maxWidth: 700,
            width: '100%',

            display: 'flex',
            alignItems: 'stretch',
            flexDirection: 'column',
        },
        label: {
            marginBottom: 3,
            width: '100%',

            textAlign: 'left',
            fontFamily: 'Poppins',
            fontWeight: 300,
            fontSize: 14,
            color: Colors.black,
        },
        input: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 12,
            paddingBottom: 12,

            width: '100%',
            maxWidth: 700,
            
            borderRadius: 10,
            borderColor: Colors.black,
            backgroundColor: Colors.transparentBlack,
            color: Colors.black,
        },
        normal: {
            marginTop: 3,
            marginBottom: 5,
            width: '100%',

            textAlign: 'left',
            fontFamily: 'Poppins',
            fontWeight: 200,
            fontSize: 12,
            color: Colors.black,
        },
        error: {
            marginTop: 3,
            marginBottom: 5,
            
            width: '100%',
            textAlign: 'left',
            fontFamily: 'Poppins',
            fontWeight: 300,
            fontSize: 12,
            color: "#be0000",
        },
    }
}

export default Input