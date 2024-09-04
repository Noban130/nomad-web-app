import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContextApi } from '../../api/ContextApi'
import GoogleMap from '../Home/components/GoogleMap'
import axios from 'axios'
import { DisLikeIcon, LikeIcon, StarIcon, UploadIcon } from '../../api/Icons'
import Countries from '../UserLocation/Countries'
import noImg from '../../assets/imgs/no-img.png'
import { getStar } from '../Checkins/Methods'
import './LeaveReview.css'

const LeaveReview = () => {
    let state = useContextApi()
    let [Colors] = state.Colors
    
    let [BackendUrl] = state.BackendUrl
    let [UserToken] = state.UserToken
    let [UserData] = state.UserData

    const [WindowWidth, setWindowWidth] = useState(500)
    const [Long, setLong] = useState(0)
    const [Lat, setLat] = useState(0)

    const [Sending, setSending] = useState(false)
    const [Uploading, setUploading] = useState(false)
    const [Deleting, setDeleting] = useState(false)
    const [Error, setError] = useState('')
    const [Place, setPlace] = useState({})
    const [Rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0);
    const [Description, setDescription] = useState('')
    const [Country, setCountry] = useState('')
    const [City, setCity] = useState('')
    const [LikeStatus, setLikeStatus] = useState('')
    const [LikeHover, setLikeHover] = useState('')
    const [Assets, setAssets] = useState([])

    let params = useParams()
    
    let windowSize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', windowSize)

    useEffect(() => {
        let getPlace = async () => {
            if(params.id && BackendUrl && UserToken) {
                try {
                    let res = await axios.get(`${BackendUrl}/checkin/${params.id}`, {
                        headers: {
                            'Authorization': UserToken,
                        }
                    })
                    setPlace(res.data.data)
                } catch(error) {
                    console.log(error);
                    console.log(error.response.data.message);
                    setError(error.response.data.message)
                }
            }
        }
        getPlace()
    }, [params, BackendUrl, UserToken])

    useEffect(() => {
        if(Place) {
            let showPosition = () => {
                if(Place?.place?.location) {
                    setLong(Place?.place?.location?.lng)
                    setLat(Place?.place?.location?.lat)
                }
            }

            showPosition()
        }
    }, [Place])

    useEffect(() => {
        windowSize()

        let assets = localStorage.getItem('checkin-assets')
        if(assets) {
            assets = JSON.parse(assets)
            if(Object.keys(assets).length !== 0) setAssets(assets)
        }
    }, [])

    const uploadVideo = async e => {
        if(UserToken) {
            try {
                setUploading(true)
                
                var filesSize = 0
                var matchedFiles = []
                let files = e.target.files

                if(Object.keys(files).length === 0) {
                    return alert("No file uploaded!")
                }
                
                for(let i = 0; i < Object.keys(files).length; i++) {
                    filesSize += files[i].size
                }

                if(filesSize > 100 * 1024 * 1024) {
                    return alert("Files size is too big")
                }
                
                let file_types = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "video/mp4", "video/webm", "video/ogg", "video/x-msvideo", "video/mpeg", "video/quicktime", "video/3gpp", "video/3gpp2", "video/x-flv", "video/x-matroska", "video/x-ms-asf", "video/x-ms-wmv", "video/x-m4v"]

                for(let i=0; i < Object.keys(files).length; i++) {
                    if(file_types.includes(files[i].type)) {
                        matchedFiles.push(files[i])
                    }
                }
                
                const formData = new FormData()

                for(let i = 0; i < matchedFiles.length; i++) {
                    formData.append('files', files[i])
                }

                let res = await axios.post(`${BackendUrl}/video/upload-assets`, formData, {
                    headers: {
                        'Authorization': UserToken,
                        'content-type': 'multipart/form-data'
                    }
                })
    
                if(res.data.success) {
                    localStorage.setItem('checkin-assets', JSON.stringify([...Assets, ...res?.data?.data?.results]))
                    setAssets([...Assets, ...res.data.data.results])
                    
                    setSending(false)
                    setError('')
                    setUploading(false)
                }

            } catch (error) {
                setUploading(false)
                setSending(false)
                console.log(error);
                console.log(error.response.data.message);
                setError(error.response.data.message)
            }
        }
    }
    
    let deleteImg = async (e, key) => {
        e.preventDefault()
        console.log(key, UserData)
        if(UserData && UserToken) {
            setDeleting(true)
            try {
                await axios.post(`${BackendUrl}/video/delete-asset`, {
                    key: key, owner: UserData._id
                }, {
                    headers: {
                        'Authorization': UserToken,
                        'Content-Type': 'application/json'
                    }
                })

                let assets = Assets.filter(asset => asset.key !== key)
                setAssets(assets)
                localStorage.setItem('checkin-assets', JSON.stringify(assets))

                setDeleting(false)
            } catch (error) {
                setDeleting(false)
                console.log(error);
                console.log(error.response.data.message);
                setError(error.response.data.message)            
            }
        }
    }

    let submitHandler = async e => {
        e.preventDefault()        
        setSending(true)
        if(!Place) {
            setSending(false)
            return setError('please select the place you wanna rating')
        }
        if(!Long) {
            setSending(false)
            return setError('please select your location')
        }
        if(!Lat) {
            setSending(false)
            return setError('please select your location')
        }
        if(!Country) {
            setSending(false)
            return setError('please select the country')
        }
        if(!City) {
            setSending(false)
            return setError('please write the city')
        }
        if(!Rating) {
            setSending(false)
            return setError('please make a rating')
        }
        if(!Description) {
            setSending(false)
            return setError('write a description')
        }
        if(!LikeStatus) {
            setSending(false)
            return setError("please select if you like or you don't like the place")
        }

        try {
            let res = await axios.post(`${BackendUrl}/video/`, {
                assets: Assets,
                place: {
                    img: Place?.place?.img,
                    name: Place?.place?.name,
                    rating: Place?.place?.rating,
                    location: { 
                        long: Place?.place?.location?.lng, 
                        lat: Place?.place?.location?.lat 
                    },
                },
                location: { 
                    long: Place?.place?.location?.lng, 
                    lat: Place?.place?.location?.lat 
                },
                country: Country,
                city: City,
                rating: Rating,
                description: Description,
                like: LikeStatus === 'like' ? true : false,
            }, {
                headers: {
                    'Authorization': UserToken,
                }
            })

            if(res.data.success) {
                setSending(false)
                setError('')
                localStorage.removeItem('checkin-assets')
                window.alert('your review uploaded successfuly!')
                setLong(0)
                setLat(0)
                setCountry('')
                setCity('')
                setRating(0)
                setDescription('')
                setLikeStatus('')

                window.location.href = '/foryou'
            }
        } catch(error) {
            setSending(false)
            console.log(error);
            console.log(error.response.data.message);
            setError(error.response.data.message)
        }
    }

    /*-----------------------------------*/
    let style = styles(Colors, WindowWidth)

    return (
        <div style={style.container}>
            <form style={style.wrapper} onSubmit={e => submitHandler(e)}>
                <p style={style.title}>upload video</p>
                <p style={style.paragraph}>share your amazing moments with the world!</p>

                {
                    Object.keys(Place).length !== 0 ?
                    <div style={style.placeWrapper}>
                        <img style={style.placeImg} src={
                            Place?.place?.img ?
                            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${Place?.place?.img}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}` : 
                            noImg
                        } alt='' />
                        <div style={style.placeInfoContainer}>
                            <p style={style.placeName}>{Place?.place?.name?.toLowerCase()}</p>
                            <div style={style.placeRatingContainer} >
                                <p style={style.placeRating}>{Place?.place?.rating}</p>
                                <div style={style.starsContainer}>
                                    { new Array(5).fill(0).map((star, i) => getStar(Place?.place?.rating, i)) }
                                </div>
                            </div>
                        </div>
                    </div> : 
                    null
                }

                <div style={style.reviewContainer}>
                    {
                        Uploading ?
                        <div className="uploading" style={{ paddingTop: 0 }} >
                            <UploadIcon Colors={Colors.black} />
                            <p style={{ color: Colors.black }}>uploading...</p>
                        </div> :
                        null
                    }

                    {
                        !Uploading ?
                        <>
                            <label style={style.uploadVideoOrImages} htmlFor='files'>
                                <UploadIcon Colors={'#bbb'} />
                                <p style={style.uploadVideoOrImagesLabel}>upload video or images</p>
                            </label>
                            <input id='files' type="file" hidden multiple accept="video/*, image/*" onChange={e => uploadVideo(e)} />
                        </> :
                        null
                    }

                    {
                        Assets.length !== 0 ?
                        <div className='review-assets-container'>
                            {
                                Assets.map(img => {
                                    return (
                                        img?.mimetype?.includes('image') ?
                                        <div className="review-img" key={img?.key}>
                                            <span onClick={e => deleteImg(e, img?.key)} >×</span>
                                            <img src={img?.url} alt="" />
                                        </div> :
                                        <div className="review-img" key={img?.key}>
                                            <span onClick={e => deleteImg(e, img?.key)} >×</span>
                                            <video style={style.video} src={img?.url}>
                                                <source src={img?.url} />
                                            </video>
                                        </div>
                                    )
                                })
                            }
                        </div> :
                        null
                    }

                    {
                        Deleting ?
                        <p style={{ textAlign: 'center', color: '#f00', fontSize: 14, }}>deleting...</p> : 
                        null
                    }

                    {
                        Long && Lat ?
                        <>
                            <label style={style.inputLabel}>location</label>
                            <div style={style.mapContainer}>
                                <GoogleMap Long={Long} Lat={Lat} zoom={20} />
                            </div>
                        </> :
                        null
                    }

                    <div style={style.inputContainer}>
                        <label style={style.inputLabel}>country</label>
                        <select onChange={e => setCountry(e.target.value)} value={Country} style={style.select}>
                        {
                            Countries?.map(country => {
                                return (
                                    <option key={country.name} value={country?.name?.toLowerCase()}>{country?.name?.toLowerCase()}</option>
                                )
                            })
                        }
                        </select>
                    </div>

                    <div style={style.inputContainer}>
                        <label style={style.inputLabel}>city</label>
                        <input style={style.input} placeholder='city...' value={City} onChange={e => setCity(e.target.value)} />
                    </div>

                    <div style={style.inputContainer}>
                        <label style={style.inputLabel}>description</label>
                        <textarea style={style.textarea} placeholder='description...' value={Description} onChange={e => setDescription(e.target.value)} ></textarea>
                    </div>

                    <div>
                        <p style={style.label}>leave a review</p>
                        <div style={style.iconsContainer}>
                   
                            {[1, 2, 3, 4, 5].map((star) => (
                                <div
                                    key={star}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                >
                                    <StarIcon
                                        key={star}
                                        width={30}
                                        Colors={star <= (hoverRating || Rating) ? '#daabff' : '#ddd'}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p style={style.label}>would you recommend this place or visit again?</p>
                        <div style={{...style.iconsContainer, gap: 20, marginTop: 10 }}>
                            <div onClick={() => setLikeStatus('like')} onMouseEnter={() => setLikeHover('like')} onMouseLeave={() => setLikeHover('')} >
                                <LikeIcon Colors={(LikeStatus === 'like' || LikeHover === 'like') ? '#daabff' : '#ddd'} width={36}/>
                            </div>
                            <div onClick={() => setLikeStatus('dislike')} onMouseEnter={() => setLikeHover('dislike')} onMouseLeave={() => setLikeHover('')} >
                                <DisLikeIcon Colors={(LikeStatus === 'dislike' || LikeHover === 'dislike') ? '#daabff' : '#ddd'} width={36} onClick={() => setLikeStatus('dislike')} />
                            </div>
                        </div>
                    </div>
                    
                    {
                        Error ?
                        <p style={{ marginBottom: 20, textAlign: 'center', color: '#f00', fontSize: 14, }}>{Error}</p> : 
                        null
                    }
                </div>
                
                <button style={style.postBtn} type='submit'>{Sending ? 'sending...' : 'post'}</button>
            </form>
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
            paddingBottom: WindowWidth >= 970 ? 20 : 80,

            maxWidth: '100vw',
            width: '100%',

            // height: WindowWidth >= 970 ? '100vh' : window.innerHeight - 60,
            minHeight: WindowWidth >= 970 ? '100vh' : window.innerHeight - 60,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            gap: 20,

            backgroundColor: Colors.white,
        },
        
        wrapper: {
            width: '100%',
            maxWidth: 500,
            height: '100%',

            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            gap: 10,
        },

        title: {
            width: '100%',
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: 24,
            textAlign: 'center',
            color: Colors.black,
        },
        paragraph: {
            marginLeft: 'auto',
            marginRight: 'auto',
    
            maxWidth: 250,
            width: '100%',
    
            fontFamily: 'Poppins',
            fontWeight: 300,
            fontSize: 12,
            textAlign: 'center',
            color: Colors.black,
        },

        placeWrapper: {
            marginBottom: 20,
            padding: 20,
            width: '100%',
            display: 'flex',
            gap: 20,

            backgroundColor: '#daabff3b',
            borderRadius: 10,
        },
        placeImg: {
            width: '100%',
            maxWidth: 100,
            aspectRatio: '1/1',
            objectFit: 'cover',
            borderRadius: 10,
        },
        placeInfoContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
        },
        placeName: {
            width: '100%',
            maxWidth: 250,

            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: 16,
            lineHeight: '18px',
            color: Colors.black,
        },
        placeRatingContainer : {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
        },
        placeRating: {
            fontFamily: 'Poppins',
            fontWeight: 400,
            fontSize: 14,
            color: Colors.black,
        },
        starsContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
        },
        
        uploaded_video_container: {
            position: 'relative',
            width: '100%',
            maxWidth: 500,
        },
        video_container: {
            width: '100%',
            aspectRatio: '1/1',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            borderRadius: 10,
            backgroundColor: '#000',
            border: '2px dashed #fff',
        },
        video: {
            width: '100%',
            height: '100%',
            borderRadius: 6,
        },
        
        mapContainer: {
            marginBottom: 20,
            width: '100%',
            aspectRatio: '1/1',

            borderRadius: 20,
            overflow: 'hidden',
        },
        
        inputContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        input: {
            padding: 10,
            paddingTop: 8,
            paddingBottom: 8,

            width: '100%',
            maxWidth: 700,
            borderRadius: 6,

            color: '#000',
            backgroundColor: '#f1f1f1',

            outline: 'none',
            cursor: 'pointer',
        },
        
        select: {
            padding: 10,
            paddingTop: 8,
            paddingBottom: 8,

            width: '100%',
            maxWidth: 700,
            borderRadius: 6,

            color: '#000',
            backgroundColor: '#f1f1f1',

            outline: 'none',
            cursor: 'pointer',
        },
        textarea: {
            padding: 10,
            paddingTop: 6,
            paddingBottom: 6,
            marginBottom: 15,

            width: '100%',
            maxWidth: 700,
            borderRadius: 6,
            backgroundColor: '#f1f1f1',

            color: Colors.black,
            resize: 'vertical',

            outline: 'none',
            border: 'none',
            cursor: 'pointer',
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

        reviewContainer: {
            width: '100%',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            gap: 30,
            
        },

        uploadVideoOrImages: {
            width: '100%',
            padding: 20,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 10,

            backgroundColor: '#f2f2f2',
            borderRadius: 10,
            cursor: 'pointer',
        },
        uploadText: {},

        uploadVideoOrImagesLabel: {
            maxWidth: 250,

            fontSize: 13,
            fontWeight: 400,
            textAlign: 'center',
        },

        label: {
            maxWidth: 250,
            marginBottom: 6,

            fontSize: 14,
            fontWeight: 500,
            textAlign: 'center',
            color: Colors.black,
        },

        inputLabel: {
            maxWidth: '100%',
            marginBottom: 6,

            fontSize: 14,
            fontWeight: 500,
            textAlign: 'left',
            color: Colors.black,
        },
        iconsContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,

            cursor: 'pointer',
        },

        selectOption: {
            paddingTop: 6,
            paddingBottom: 6,
            paddingLeft: 16,
            paddingRight: 16,

            backgroundColor: '#eee',
            borderRadius: 6,

            border: 'none',
            outline: 'none',
            cursor: 'pointer',
        },

        postBtn: {
            paddingTop: 6,
            paddingBottom: 6,
            paddingLeft: 40,
            paddingRight: 40,
            
            marginTop: 'auto',
            marginLeft: 'auto',

            fontWeight: 300,

            backgroundColor: '#DAABFF',
            color: Colors.white,
            borderRadius: 6,
            cursor: 'pointer',
        }
    }
}

export default LeaveReview