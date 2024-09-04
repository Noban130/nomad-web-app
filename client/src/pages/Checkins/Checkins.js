import React, { useState, useEffect } from 'react';
import { useContextApi } from '../../api/ContextApi';
import { LocationIcon } from '../../api/Icons';
import { Link } from 'react-router-dom';
import PlacesContainer from './PlacesContainer';
import PlaceDetailsPopup from './PlaceDetailsPopup';
import { CommonStyles } from '../../CommonStyles';
import MapComponent from './MapComponent';
import Options from './Options';
import { LoadScript } from '@react-google-maps/api';
import PlacesAutocomplete from './PlacesAutocomplete';

const libraries = ['places']

function Checkins() {
    let state = useContextApi();
    let [Colors] = state.Colors;
    let [WindowWidth] = state.WindowWidth

    const [Places, setPlaces] = useState([]);
    const [Long, setLong] = useState(0);
    const [Lat, setLat] = useState(0);
    const [Type, setType] = useState('hotel');
    const [ShowPopup, setShowPopup] = useState(false);
    const [SelectedPlace, setSelectedPlace] = useState({});
    let style = styles(Colors, WindowWidth);
    let commonStyles = CommonStyles(WindowWidth, Colors)

    const getLocation = (e) => {
        e.preventDefault();
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(showPosition)
    };

    const showPosition = (position) => {
        setLong(position.coords.longitude);
        setLat(position.coords.latitude);
    };

    const handlePlaceSelected = (place) => {
        setLong(place?.geometry?.viewport?.Gh?.lo);
        setLat(place?.geometry?.viewport?.Wh?.lo);        
        setSelectedPlace(place);
    };

    return (
        <div style={commonStyles.bigContainer}>
            <div style={style.wrapper}>

                <div style={style.btnsContainer}>
                    <Link to={'/checkins'} style={style.activeBtn}>
                        <p style={style.activeBtnText}>check-in</p>
                    </Link>
                    <Link to={'/allCheckins'} style={style.btn}>
                        <p style={style.btnText}>all checkins</p>
                    </Link>
                </div>

                <div style={style.locationHeader}>
                    <p style={style.locationLabel}>location search</p>
                    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY} libraries={libraries}>
                        <div style={{ width: '100%' }}>
                            <PlacesAutocomplete onPlaceSelected={handlePlaceSelected} />
                        </div>
                    </LoadScript>
                </div>

                <div style={style.locationHeader}>
                    <p style={style.locationLabel}>location</p>
                    <button style={style.locationBtn} onClick={getLocation}>
                        <LocationIcon Colors={'#000'} />
                        <p style={style.locationBtnText}>find my location</p>
                    </button>
                </div>

                <div style={style.locationHeader}>
                    <p style={style.locationLabel}>type</p>
                    <select style={style.selectType} onChange={e => setType(e.target.value)} value={Type}>
                        <Options />
                    </select>
                </div>
                
                {(Long && Lat) ? 
                    <div style={style.mapContainer}>
                        <MapComponent 
                            Lat={Lat}
                            Long={Long}
                            setLat={setLat}
                            setLong={setLong}
                            radius={15} 
                            type={Type}
                            Places={Places}
                            setPlaces={setPlaces}
                            setSelectedPlace={setSelectedPlace}
                            setShowPopup={setShowPopup}
                            // fetchPlaces={fetchPlaces}
                        />
                    </div> : 
                    null
                }

                { Places && <h1 style={style.resultText}>({Places.length}) result found</h1> }
                { Places.length !== 0 ? <PlacesContainer Places={Places} setSelectedPlace={setSelectedPlace} setShowPopup={setShowPopup} style={style} /> : null }
                <PlaceDetailsPopup ShowPopup={ShowPopup} setShowPopup={setShowPopup} SelectedPlace={SelectedPlace} />
            </div>
        </div>
    );
}

const styles = (Colors, WindowWidth) => {
    return {
        container: {
            position: 'relative',
            margin: '0 auto',
            paddingTop: 10,
            paddingLeft: WindowWidth >= 970 ? 290 : 20,
            paddingRight: WindowWidth >= 1300 ? 390 : 20,
            paddingBottom: WindowWidth >= 970 ? 20 : 80,
            maxWidth: '100vw',
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            gap: 10,
            backgroundColor: Colors.white,
        },
        wrapper: {
            padding: 20,
            margin: '0 auto',
            maxWidth: 500,
            width: '100%',

            display: 'flex',
            flexDirection: 'column',
            gap: 10,
        },
        btnsContainer: {
            padding: 10,
            width: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            borderRadius: 20,
        },
        activeBtn: {
            paddingTop: 6,
            paddingBottom: 6,
            paddingLeft: 30,
            paddingRight: 30,
            backgroundColor: Colors.black,
            borderRadius: 20,
            cursor: 'pointer',
        },
        activeBtnText: {
            textAlign: 'center',
            color: Colors.white,
            fontWeight: 300,
            fontSize: 12,
        },
        btn: {
            paddingTop: 6,
            paddingBottom: 6,
            paddingLeft: 30,
            paddingRight: 30,
            backgroundColor: '#eee',
            borderRadius: 20,
            cursor: 'pointer',
        },
        btnText: {
            textAlign: 'center',
            color: '#000',
            fontWeight: 300,
            fontSize: 12,
        },
        header: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
        },
        backContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
        },
        backText: {
            color: '#000',
            fontSize: 12,
        },
        seeAllLink: {
            marginLeft: 'auto',
            color: '#000',
            fontSize: 12,
            textDecoration: 'underline',
        },
        locationHeader: {
            width: '100%',
            maxWidth: 500,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        locationLabel: {
            textAlign: 'start',
            color: Colors.black,
            fontWeight: 300,
            fontSize: 14,
        },
        locationBtn: {
            width: '100%',
            padding: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 10,
            borderRadius: 6,
            backgroundColor: '#eee',
            cursor: 'pointer',
            border: 'none',
            outline: 'none',
        },
        locationBtnIcon: {},
        locationBtnText: {
            textAlign: 'center',
            color: '#000',
            fontWeight: 300,
            fontSize: 14,
        },
        selectType: {
            maxWidth: 500,
            width: '100%',
            padding: 8,
            borderRadius: 6,
            backgroundColor: '#eee',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
        },
        mapContainer: {
            marginTop: 10,
            width: '100%',
            maxWidth: 500,
            aspectRatio: '1/1',
            borderRadius: 6,
            boxShadow: '0 4px 16px #00000020',
            border: '2px solid #fff',
            overflow: 'hidden',
        },

        resultText: {
            margin: '10px auto',
            width: '100%',
            maxWidth: 500,

            color: Colors.black, 
            fontSize: 17, 
            fontWeight: 600, 
            textAlign: 'left', 
        },

        placesContainer: {
            width: '100%',
            maxWidth: 500,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            flexWrap: 'wrap',
            columnGap: 20,
            rowGap: 20,

            cursor: 'pointer',
        },
        placeContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
        },
        placeImg: {
            width: '100%',
            aspectRatio: '16/10',
            borderRadius: 6,
            boxShadow: '0 4px 16px #00000020',
            objectFit: 'cover',
        },
        placeText: {
            textAlign: 'start',
            color: Colors.black,
            fontWeight: 400,
            fontSize: 14,
            lineHeight: '16px',
        },
        starsContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            gap: 10,
        },
        stars: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            gap: 0,
        },
        rating: {
            textAlign: 'start',
            color: Colors.black,
            fontWeight: 400,
            fontSize: 14,
        },
    };
};

export default Checkins;
