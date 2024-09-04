import React, { useEffect, useState } from 'react'
import { useContextApi } from '../../api/ContextApi'
import { LocationBoldIcon, PhoneIcon, WebsiteIcon } from '../../api/Icons'
import { Link } from 'react-router-dom'
import { getStar } from './Methods'
import noImg from '../../assets/imgs/no-img.png'
import axios from 'axios'

function PlaceDetailsPopup({ ShowPopup, setShowPopup, SelectedPlace }) {
    let state = useContextApi()
    let [Colors] = state.Colors
    let [BackendUrl] = state.BackendUrl
    let [UserToken] = state.UserToken
    const [WindowWidth, setWindowWidth] = useState(500)
    const [PhotoReference, setPhotoReference] = useState('')
    const [CheckinAdded, setCheckinAdded] = useState(false)

    let style = styles(Colors, WindowWidth, ShowPopup)

    let windowSize = () => setWindowWidth(window.innerWidth)
    
    window.addEventListener('resize', windowSize)

    useEffect(() => {
        windowSize()
    }, [])

    useEffect(() => {
        let photoReference = SelectedPlace?.photos?.[0]?.photo_reference ? SelectedPlace?.photos?.[0]?.photo_reference : ''
        setPhotoReference(photoReference)
    }, [SelectedPlace])

    let checkinOnly = async e => {
        e.preventDefault()
        let place = {}

        if(SelectedPlace) {
            place = {
                img: PhotoReference ? PhotoReference : '',
                name: SelectedPlace?.name,
                rating: SelectedPlace?.rating,
                location: {
                    lng: SelectedPlace?.geometry?.location?.lng,
                    lat: SelectedPlace?.geometry?.location?.lat
                }
            }

            try {
                let res = await axios.post(`${BackendUrl}/checkin/`, {
                    place: place
                }, {
                    headers: {
                        'Authorization': UserToken
                    }
                })
                if(res?.data?.success) {
                    setCheckinAdded(true)
                }
            } catch(error) {
                console.log(error)
            }
        }
    }
    

    let checkinAndReview = async e => {
        e.preventDefault()
        let place = {}

        if(SelectedPlace) {
            place = {
                img: PhotoReference ? PhotoReference : '',
                name: SelectedPlace?.name,
                rating: SelectedPlace?.rating,
                location: {
                    lng: SelectedPlace?.geometry?.location?.lng,
                    lat: SelectedPlace?.geometry?.location?.lat
                }
            }

            try {
                let res = await axios.post(`${BackendUrl}/checkin/`, {
                    place: place
                }, {
                    headers: {
                        'Authorization': UserToken
                    }
                })

                console.log(res)
                if(res?.data?.success) {
                    window.location.href = `/leave-review/${res.data.data.checkin._id}`
                }
            } catch(error) {
                console.log(error)
            }
        }
    }

    if(Object.keys(SelectedPlace).length === 0) return null;

    return (
        <div style={style.container}>
            <div style={style.wrapper}>
                
                <div style={style.mapHeader}>
                    <p style={style.mapHeaderText}>map</p>
                    <p style={style.x} onClick={() => setShowPopup(false)}>✖</p>
                </div>

                <div style={style.header}>
                    <Link to={'/allCheckins'} style={style.seeAllLink}>see all the check-ins</Link>
                </div>

                <div style={style.imgContainer}>
                    {
                        PhotoReference.length !== 0 ? 
                        <img style={style.img} src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${PhotoReference}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`} alt='' /> :
                        <img style={style.img} src={noImg} alt='' />
                    }
                </div>
                
                <p style={style.text}>{SelectedPlace?.name}</p>
                
                <div style={style.ratingContainer}>
                    <div style={style.starsContainer}>
                        <p style={style.starsText}>{SelectedPlace?.rating}</p>
                        <div style={style.stars}>
                            { new Array(5).fill(0).map((star, i) => getStar(SelectedPlace?.rating, i)) }
                        </div>
                    </div>
                    <p style={style.reviewsText}>{SelectedPlace?.user_ratings_total} reviews</p>
                </div>
                
                <div style={style.infosContainer}>
                    {
                        SelectedPlace?.address ?
                        <div style={style.info}>
                            <LocationBoldIcon Colors={'#DAABFF'} width={16} height={22} />
                            <p style={style.infoText}>{SelectedPlace?.address}</p>
                        </div> :
                        null
                    }
                    
                    {
                        SelectedPlace?.phone ?
                        <div style={style.info}>
                            <PhoneIcon Colors={'#DAABFF'} width={16} />
                            <a href={`tel:${SelectedPlace?.phone}`} style={style.infoText}>{SelectedPlace?.phone}</a>
                        </div> : 
                        null
                    }
                    
                    {
                        SelectedPlace?.web_url ?
                        <div style={style.info}>
                            <WebsiteIcon Colors={'#DAABFF'} width={30} />
                            <a href={SelectedPlace?.web_url} style={style.link}>{SelectedPlace?.web_url}</a>
                        </div> :
                        null
                    }
                </div>
                
                
                <div style={style.bottomBtns}>
                    <button style={style.bottomBtn} onClick={checkinOnly} >
                        <p style={style.bottomBtnText}>check-in only</p>
                    </button>

                    <button style={style.bottomBtnPink} onClick={checkinAndReview}>
                        <p style={style.bottomBtnPinkText}>check-in & review</p>
                    </button>
                </div>

                {
                    CheckinAdded ?
                    <div style={style.addedSuccessfulyPopup} >
                        <p style={style.addedSuccessfulyPopupP}>the place is added successfuly to you checkins!</p>
                        <button style={style.addedSuccessfulyPopupBtn} onClick={() => setCheckinAdded(false)}>Okey</button>
                    </div> :
                    null
                }
            </div>
        </div>
    )
}

let styles = (Colors, WindowWidth, ShowPopup) => {
    return {
        container: {
            position: 'fixed',
            top: ShowPopup ? 0 : '100%',
            left: 0,

            margin: '0 auto',
            paddingTop: 0,
            marginLeft: WindowWidth >= 970 ? 280 : 0,
            marginRight: WindowWidth >= 1300 ? 380 : 0,
            marginBottom: WindowWidth >= 970 ? 20 : 0,

            width: WindowWidth >= 1300 ? (WindowWidth-280-380) : (WindowWidth < 1300 && WindowWidth >= 970) ? (WindowWidth-280) : '100%',

            height: WindowWidth >= 970 ? '100vh' : window.innerHeight - 60,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            gap: 20,

            // backgroundColor: Colors.white,
            borderRadius: '10px 10px 0 0',
            transition: '.4s all ease',
            overflowY: 'auto',

            zIndex: 1100,
            userSelect: 'none',
            pointerEvent: 'none',
        },
        wrapper: {
            width: '100%',
            maxWidth: 600,
            height: '100%',
            padding: 20,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            gap: 20,

            backgroundColor: Colors.white,
            borderRadius: '10px 10px 0 0',
            boxShadow: '0 -4px 10px #00000020',
        },
        
        
        mapHeader: {
            maxWidth: 600,

            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',

            backgroundColor: Colors.white,

            cursor: 'pointer',
        },
        mapHeaderText: {
            fontSize: 14,
            fontWeight: 700,
            color: Colors.black,
        },
        x: {
            color: Colors.black,
            cursor: 'pointer',
            zIndex: 20,
        },

        btnsContainer: {
            margin: '0 auto',
            width: 'max-content',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            backgroundColor: '#eee',
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
            maxWidth: 600,

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
            color: Colors.black,
            fontSize: 12,
        },
        seeAllLink: {
            width: '100%',

            textAlign: 'right',
            color: Colors.black,
            fontSize: 12,
            textDecoration: 'underline',
        },

        imgContainer: {
            maxWidth: 600,
            width: '100%',
            aspectRatio: '16/10',
            borderRadius: 6,
            overflow: 'hidden',
        },
        img: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },

        text: {
            maxWidth: 600,
            textAlign: 'left',
            color: Colors.black,
            fontSize: 14,
            fontWeight: 500,
        },
        ratingContainer: {
            maxWidth: 600,
            width: '100%',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        starsContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
        },
        starsText: {
            color: Colors.black,
            fontSize: 14,
        },
        stars: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
        },
        reviewsText: {
            color: Colors.black,
            fontSize: 12,
        },

        infosContainer: {
            maxWidth: 600,
            width: '100%',

            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            gap: 10,
        },
        info: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 10,
        },
        infoText: {
            color: Colors.black,
            fontSize: 12,
        },
        link: {
            color: Colors.black,
            fontSize: 12,
            textDecoration: 'underline',
        },

        bottomBtns: {
            paddingBottom: 10,
            width: '100%',
            maxWidth: 600,
            marginTop: 'auto',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
        },
        bottomBtn: {
            width: '100%',
            padding: 10,
            borderRadius: 10,
            backgroundColor: '#ddd',
            cursor: 'pointer',
        },
        bottomBtnText: {
            textAlign: 'center',
            color: '#000',
            fontSize: 12,
        },
        bottomBtnPink: {
            width: '100%',
            padding: 10,
            borderRadius: 10,
            backgroundColor: '#DAABFF'
        },
        bottomBtnPinkText: {
            textAlign: 'center',
            color: '#fff',
            fontSize: 12,
        },
        addedSuccessfulyPopup: {
            padding: '20px 30px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',

            width: 'calc(100% - 40px)',
            maxWidth: 500,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 20,

            backgroundColor: Colors.white,
            borderRadius: '10px',
            boxShadow: '2px 6px 21px #00000026',
        },
        addedSuccessfulyPopupP: {
            textAlign: 'center',
            fontSize: 14,
            color: Colors.black
        },
        addedSuccessfulyPopupBtn: {
            padding: '10px 40px',
            color: '#fff',
            borderRadius: 8,
            backgroundColor: '#daabff',
            cursor: 'pointer',
        }
    }
}

export default PlaceDetailsPopup