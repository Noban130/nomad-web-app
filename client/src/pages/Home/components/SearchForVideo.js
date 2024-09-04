import { useEffect, useState } from 'react'
import axios from 'axios'
import { HeardIcon, LeftArrowIcon, SearchIcon } from '../../../api/Icons'
import { useContextApi } from '../../../api/ContextApi'
import VideosPopup from '../../UserProfile/components/VideosPopup'
import './SearchForVideo.css'
import logo from '../../../assets/imgs/coin-logo.png'

const SearchForVideo = (props) => {
    let { setShowSearchForVideo } = props
    const [Search, setSearch] = useState('')
    const [ShowVideosPopup, setShowVideosPopup] = useState(false)
    const [ClickedVideoIndex, setClickedVideoIndex] = useState(0)
    const [Assets, setAssets] = useState([])

    let state = useContextApi()
    let [Colors] = state.Colors
    let [BackendUrl] = state.BackendUrl
    let [UserToken] = state.UserToken
    const [WindowWidth, setWindowWidth] = useState(500)
    let styles = style(Colors, WindowWidth)
    
    let windowSize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', windowSize)
    useEffect(() => {
        windowSize()
    }, [])

    let searchHandler = async e => {
        e.preventDefault()
        setSearch('')
        try {
            let res = await axios.post(`${BackendUrl}/video/search?search=${Search}`, {}, {
                headers: {
                    'Authorization': UserToken
                }
            })
            const sortedData = res.data.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            setAssets(sortedData)
        } catch(error) {
            console.log(error)
        }
    }

    let videosPopupHandler = i => {
        setShowVideosPopup(true)
        setClickedVideoIndex(i)
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <div style={styles.header}>
                    <button style={styles.search} onClick={() => setShowSearchForVideo(false)}>
                        <LeftArrowIcon Colors={Colors.black} />
                    </button>
                    <form onSubmit={searchHandler} className="search-input-container" style={{ backgroundColor: Colors.transparentBlack }} >
                        <input type='text' autoFocus placeholder='search...' value={Search} onChange={e => setSearch(e.target.value)} />
                        <button className="icon" type={'submit'}>
                            <SearchIcon Colors={Colors.black} />
                        </button>
                    </form>
                </div>

                {
                    Assets.length !== 0 ?
                    <div className="search-for-videos-assets">
                        {
                            Assets?.map((asset, i) => {
                                return (
                                    <div className="search-item" key={asset?._id} onClick={() => videosPopupHandler(i)}>
                                        <div className="search-item-asset">
                                            {
                                                asset?.assets?.[0]?.mimetype?.includes('image') ?
                                                <img src={asset?.assets?.[0]?.url} alt="" /> :
                                                <video controls={false} style={styles.video} src={asset?.assets?.[0]?.url} autoPlay={false} loop>
                                                    <source src={asset?.url} />
                                                </video>
                                            }
                                            <p className='search-asset-time'>{formatDate(asset?.createdAt)}</p>
                                        </div>
                                        <p className='search-item-title' style={{ color: Colors.black }}>{asset?.description?.length >= 12 ? asset?.description?.slice(0, 12) + '...' : asset?.description}</p>
                                        <div className="asset-owner-container">
                                            <div className="img-username">
                                                <img src={asset?.user?.profile_img?.url ? asset?.user?.profile_img?.url : logo} alt="" />
                                                <p style={{ color: Colors.black }}>{ asset?.user?.username?.length >= 9 ? asset?.user?.username?.slice(0, 9) + '...' : asset?.user?.username }</p>
                                            </div>

                                            <div className="likes-container">
                                                <HeardIcon Colors={Colors.black} stroke={true} width={18} />
                                                <p style={{ color: Colors.black }}>{asset?.likes.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div> :
                    null
                }

                {
                    ShowVideosPopup ?
                    <>
                        <div style={styles.absoluteArrow} onClick={() => setShowVideosPopup(false)}>
                            <LeftArrowIcon Colors={Colors.white} />
                        </div>
                        <div style={styles.videosContainer} className='videos_container'>
                            <VideosPopup Assets={Assets?.slice(ClickedVideoIndex, Assets?.length)} />
                        </div>
                    </> :
                    null
                }
            </div>
        </div>
    )
}

let style = (Colors, WindowWidth) => {
    
    return {
        container: {
            position: 'fixed',
            top: 0,
            
            width: '100%',
            maxWidth: 610,
            height: '100vh',
    
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',

            backgroundColor: Colors.white,
            zIndex: 9
        },
        wrapper: {
            position: 'relative',

            width: '100%',
            maxWidth: '100%',
            height: WindowWidth >= 970 ? '100vh' : window.innerHeight - 60,
            backgroundColor: Colors.white,
        },

        header: {
            position: 'relative',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            
            width: '100%',
            maxWidth: '100%',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 10,

            zIndex: 1,
        },
        search: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            cursor: 'pointer',
        },

        absoluteArrow: {
            position: 'fixed',
            top: 20,
            paddingLeft: 20,

            zIndex: 10,
            cursor: 'pointer',
        },

        videosContainer: {
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',

            width: '100%',
            maxWidth: 610,
            height: WindowWidth >= 970 ? '100vh' : window.innerHeight - 60,

            scrollBehavior: 'smooth',
            backgroundColor: '#000000',
            overflowY: 'scroll',
            overflowX: 'hidden',
            scrollSnapType: 'y mandatory',
            zIndex: 2,
        },
    }
}

export default SearchForVideo