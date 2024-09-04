import React, { useState, useEffect } from 'react'
import { useContextApi } from '../../api/ContextApi'
import { LeftArrowIcon } from '../../api/Icons'
import { Link } from 'react-router-dom'
import { CommonStyles } from '../../CommonStyles'
import axios from 'axios'
import noImg from '../../assets/imgs/no-img.png'
import { getStar } from '../Checkins/Methods'

function AllCheckins() {
    let state = useContextApi()
    let [Colors] = state.Colors
    let [WindowWidth] = state.WindowWidth
    let [BackendUrl] = state.BackendUrl
    let [UserToken] = state.UserToken
    
    let style = styles(Colors, WindowWidth)
    let commonStyles = CommonStyles(WindowWidth, Colors)

    const [Checkins, setCheckins] = useState([])

    useEffect(() => {
        let getAllCheckins = async () => {
            try {
                let res = await axios.get(`${BackendUrl}/checkin/checkins`, {
                    headers: {
                        'Authorization': UserToken
                    }
                })
                setCheckins(res.data.data.checkins)
            } catch(error) {
                console.log(error)
            }
        }

        getAllCheckins()
    }, [BackendUrl, UserToken])

    if(Checkins.length === 0) return (
        <div style={commonStyles.bigContainer}>
            <div style={{ maxWidth: 500, width: '100%', margin: '0 auto', padding: 20 }}>
                <div style={style.btnsContainer}>
                    <Link to={'/checkins'} style={style.btn}>
                        <p style={style.btnText}>check-ins</p>
                    </Link>
                    <Link to={'/allCheckins'} style={style.activeBtn}>
                        <p style={style.activeBtnText}>all check-ins</p>
                    </Link>
                </div>

                <p style={{ padding: 20, textAlign: 'center', fontSize: 14, color: Colors.black }} >you have no checkins yet!</p>
            </div>
        </div>
    )

    return (
        <div style={commonStyles.bigContainer}>
            <div style={{ maxWidth: 500, width: '100%', margin: '0 auto' }}>
                <div style={style.btnsContainer}>
                    <Link to={'/checkins'} style={style.btn}>
                        <p style={style.btnText}>check-in</p>
                    </Link>
                    <Link to={'/allCheckins'} style={style.activeBtn}>
                        <p style={style.activeBtnText}>all check-ins</p>
                    </Link>
                </div>

                <div style={style.header}>
                    <Link to={'/checkins'} style={style.backContainer}>
                        <LeftArrowIcon Colors={Colors.black} />
                        <p style={style.backText}>back</p>
                    </Link>
                </div>

                <div style={style.checkinsContainer}>
                    {
                        Checkins.length !== 0 ?
                        Checkins.map(checkin => {
                            return (
                                <div key={checkin?._id} style={style.checkinContainer}>
                                    <img 
                                        style={style.checkinImg} 
                                        src={
                                            checkin?.place?.img ?
                                            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${checkin?.place?.img}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}` : 
                                            noImg
                                        } 
                                        alt='' 
                                    />
                                    
                                    <div style={style.infos}>
                                        <p style={style.title}>{checkin?.place?.name?.slice(0, 20)}...</p>
                                        {
                                            checkin?.place?.rating ?
                                            <div style={style.ratingContainer}>
                                                <div style={style.starsContainer}>
                                                    { new Array(5).fill(0).map((star, i) => getStar(checkin?.place?.rating, i)) }
                                                </div>
                                                <p style={style.rating}>({checkin?.place?.rating})</p>
                                            </div> :
                                            null
                                        }
                                        <a href={`/leave-review/${checkin?._id}`} style={style.reviewBtn}>
                                            <p style={style.reviewBtnText}>leave review</p>
                                        </a>
                                    </div>
                                </div>
                            )
                        }) :
                        null
                    }
                </div>
            </div>
        </div>
    )
}

let styles = (Colors, WindowWidth) => {
    return {
        container: {
            margin: '0 auto',
            paddingTop: 10,
            paddingLeft: WindowWidth >= 970 ? 290 : 20,
            paddingRight: WindowWidth >= 1300 ? 390 : 20,
            paddingBottom: WindowWidth >= 970 ? 20 : 0,

            maxWidth: '100vw',
            width: '100%',

            minHeight: WindowWidth >= 970 ? '100vh' : window.innerHeight - 60,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            gap: 20,

            backgroundColor: Colors.white,
        },

        wrapper: {
            maxWidth: 500,
            width: '100%',

            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
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
            padding: 20,
            paddingBottom: 0,
            margin: '0 auto',
            width: '100%',
            maxWidth: 500,

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
            color: '#000',
            fontSize: 12,
            textDecoration: 'underline',
        },
        checkinsContainer: {
            padding: 20,
            paddingTop: 0,
            marginTop: 10,
            width: '100%',

            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            gap: 10,
        },

        checkinContainer: {
            maxWidth: 500,

            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: 10,
        },
        checkinImg: {
            width: 80,
            height: 80,
            objectFit: 'cover',
            borderRadius: 6,
        },
        infos: {
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            gap: 4,
        },
        title: {
            fontSize: 14,
            fontWeight: 400,
            color: Colors.black,
        },
        ratingContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 10,
        },
        starsContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
        },
        rating: {
            fontSize: 14,
            fontWeight: 400,
            color: Colors.black,
        },
        reviewBtn: {
            marginTop: 'auto',
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: 20,
            paddingRight: 20,

            backgroundColor: '#DAABFF',
            borderRadius: 6,
            cursor: 'pointer',

            border: 'none',
            outline: 'none',
        },
        reviewBtnText: {
            fontSize: 12,
            fontWeight: 400,
            color: '#000',
        },
        
    }
}

export default AllCheckins