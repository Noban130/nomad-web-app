import React, { useCallback, useEffect, useState } from 'react'

let ConnectionsTrips = (props) => {
    let { textColor, popupActiveItem, ProfileData, params } = props
    const [ConnectionsLength, setConnectionsLength] = useState(0)

    let getConnectionsLength = useCallback(() => {
        if(Object.keys(ProfileData).length !== 0) {
            let connections = ProfileData?.account?.connections?.filter(a => a !== params.id)
            setConnectionsLength(connections.length)
        }
    }, [ProfileData, params])

    useEffect(() => {
        getConnectionsLength()
    }, [getConnectionsLength, params])

    if(Object.keys(ProfileData).length === 0) return null

    return (
        <div className="connections-trips-container">
            <div className="connections-trips" onClick={() => popupActiveItem('connections')}>
                <p className="number" style={textColor}>{ConnectionsLength}</p>
                <p className="label" style={textColor}>connections</p>
            </div>

            <div className="connections-trips" onClick={() => popupActiveItem('trips')}>
                <p className="number" style={textColor}>{ProfileData?.account?.visited_countries?.length + ProfileData?.account?.checkins?.length}</p>
                <p className="label" style={textColor}>trips</p>
            </div>

            <div className="connections-trips">
                <p className="number" style={textColor}>#1</p>
                <p className="label" style={textColor}>nomad rank</p>
            </div>
        </div>
    )
}

export default ConnectionsTrips