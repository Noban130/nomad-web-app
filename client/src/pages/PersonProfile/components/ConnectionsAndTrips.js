import React, { useCallback, useEffect, useState } from 'react'
import { useContextApi } from '../../../api/ContextApi'

const ConnectionsAndTrips = (props) => {
    let { AccountData, params } = props

    let state = useContextApi()
    let [Colors] = state.Colors
    let styles = style(Colors)

    const [ConnectionsLength, setConnectionsLength] = useState(0)

    let getConnectionsLength = useCallback(() => {
        if(Object.keys(AccountData).length !== 0) {
            let connections = AccountData?.connections?.filter(a => a._id !== params.id)
            console.log(connections);
            setConnectionsLength(connections.length)
        }
    }, [AccountData, params])

    useEffect(() => {
        getConnectionsLength()
    }, [getConnectionsLength, params])
    
    return (
        <div style={styles.accountInfosContainer}>
            <div style={styles.counterContainer}>
                <p style={styles.counterNumber}>{ConnectionsLength}</p>
                <p style={styles.counterText}>connection</p>
            </div>

            <div style={styles.counterContainer}>
                <p style={styles.counterNumber}>{AccountData?.visited_countries?.length}</p>
                <p style={styles.counterText}>trips</p>
            </div>
        </div>
    )
}

let style = (Colors) => {
    return {
        accountInfosContainer: {
            padding: 20,
            width: '100%',
            maxWidth: 200,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            gap: 20,
        },
        counterContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        counterNumber: {
            fontSize: 16,
            textAlign: 'center',
            fontFamily: 'Poppins',
            fontWeight: 800,
            color: Colors.black,
        },
        counterText: {
            fontSize: 13,
            textAlign: 'center',
            fontFamily: 'Poppins',
            fontWeight: 300,
            color: Colors.black,
        },
    }
}

export default ConnectionsAndTrips