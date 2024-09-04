import GoogleMapReact from 'google-map-react'
import img from '../../assets/imgs/not_found.png'

let CheckinsMap = ({ coords, places, setCoords, setBounds, setShowPopup, setSelectedPlace }) => {
    let selectPlace = (place) => {
        setShowPopup(true)
        setSelectedPlace(place)
    }

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_PLACES_API_KEY }}
                defaultCenter={coords}
                center={coords}
                defaultZoom={20}
                options={{ disableDefaultUI: true, zoomControl: true, styles: {} }}
                onChange={(e) => {
                    setCoords({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
            >
                {
                    places.length !== 0 ?
                    places.map(place => { 
                        return (
                            (place?.name && place?.photo?.images?.large?.url) ?
                            <div
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 50,
                                    border: '2px solid #d5aaef',
                                }}
                                lat={Number(place?.latitude)}
                                lng={Number(place?.longitude)}
                                key={place?.location_id + place?.name + place?.longitude}
                                onClick={() => selectPlace(place)}
                            >
                                <img
                                    src={ place?.photo ? place?.photo?.images?.large?.url : img } alt=''
                                    style={{ 
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: 50,
                                    }}
                                />
                            </div> :
                            null
                        )
                    }) : 
                    null 
                }

            </GoogleMapReact>
        </div>
    )
}

export default CheckinsMap