import React from 'react'
import { getStar } from './Methods';
import noImg from '../../assets/imgs/no-img.png'

function PlacesContainer(props) {
    let { Places, setSelectedPlace, setShowPopup, style } = props
    let selectPlace = (place) => {
        setShowPopup(true)
        setSelectedPlace(place)
    }

    if(Places.length === 0) return null

    return (
        <div style={style.placesContainer}>
            {Places?.map(place => {
                let photoReference = place?.photos?.[0]?.photo_reference ? place?.photos?.[0]?.photo_reference : false
                return (
                    <div key={place?.place_id} style={style.placeContainer} onClick={() => selectPlace(place)}>
                        <img
                            style={style.placeImg}
                            src={photoReference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}` : noImg}
                            alt=''
                        />
                        <p style={style.placeText}>{place?.name}</p>
                        <div style={style.starsContainer}>
                            <div style={style.stars}>
                                {new Array(5).fill(0).map((star, i) => getStar(place?.rating, i))}
                            </div>
                            <p style={style.rating}>{place?.rating}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default PlacesContainer