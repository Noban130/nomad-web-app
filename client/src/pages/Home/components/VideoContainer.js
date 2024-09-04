import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useContextApi } from '../../../api/ContextApi';
import { DisLikeIcon, HeardIcon, LikeIcon, MessageIcon, PlayIcon, SaveIcon, SendIcon, ShareIcon } from '../../../api/Icons';
import map from '../../../assets/imgs/map.png';
import logo from '../../../assets/imgs/coin-logo.png'
import CommentsContainer from './CommentsContainer';
import VideoMap from './VideoMap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './VideoContainer.css';
import { getStar } from '../../Checkins/Methods';
import axios from 'axios';
import { Link } from 'react-router-dom';

let VideoContainer = (props) => {
    let { video } = props;

    let state = useContextApi();
    let [Colors] = state.Colors;
    let [BackendUrl] = state.BackendUrl;
    let [UserToken] = state.UserToken;

    const [WindowWidth, setWindowWidth] = useState(500);
    const [PauseVideo, setPauseVideo] = useState(false);
    const [ShowComments, setShowComments] = useState(false);
    const [ShowMap, setShowMap] = useState(false);
    const [Comments, setComments] = useState([]);
    const [Like, setLike] = useState(false);
    const [Save, setSave] = useState(false);
    const [LikeClicked, setLikeClicked] = useState(false);
    const [SaveClicked, setSaveClicked] = useState(false);
    const containerRef = useRef();
    const videoRef = useRef();

    let styles = style(Colors, WindowWidth);

    const windowSize = () => {
        setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', windowSize);

    const pausePlayVideo = () => {
        setPauseVideo(!PauseVideo);
        PauseVideo ? videoRef?.current?.play() : videoRef?.current?.pause();
    };

    const ShareHandler = async () => {
        try {
            await navigator
            .share({
                title: 'nomad world',
                text: 'nomad world',
                url: window.location.href
            });
            console.log('Successful share! 🎉');
        } catch (error) {
            console.log(error);
        }
    };

    const getComments = async () => {
        setShowComments(true);
        try {
            let res = await axios.get(`${BackendUrl}/video/${video._id}/comment`, {
                headers: {
                    'Authorization': UserToken
                }
            });
            setComments(res?.data?.data?.comments);
        } catch (error) {
            console.log(error);
        }
    };

    const like = async () => {
        try {
            await axios.post(`${BackendUrl}/video/${video._id}/like`, {}, {
                headers: {
                    'Authorization': UserToken
                }
            });
            setLike(!Like);
            setLikeClicked(!LikeClicked)
        } catch (error) {
            console.log(error);
        }
    };

    const save = async () => {
        try {
            await axios.post(`${BackendUrl}/video/${video._id}/save`, {}, {
                headers: {
                    'Authorization': UserToken
                }
            });
            setSave(!Save);
            setSaveClicked(!SaveClicked)
        } catch (error) {
            console.log(error);
        }
    };

    const getVideoData = useCallback(async () => {
        if(BackendUrl && UserToken) {
            try {
                let res = await axios.get(`${BackendUrl}/video/${video._id}`, {
                    headers: {
                        'Authorization': UserToken
                    }
                });
                setLike(res?.data?.data?.liked);
                setSave(res?.data?.data?.saved);
            } catch (error) {
                console.log(error);
            }
        }
    }, [BackendUrl, UserToken])

    useEffect(() => {
        windowSize();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    getVideoData();
                }
            });
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [getVideoData]);

    return (
        <div ref={containerRef} style={styles.videoContainer} onDoubleClick={like}>
            <div style={styles.videoWrapper}>
                <Swiper
                    modules={[Navigation, Pagination]}
                    className='swiper'
                    spaceBetween={10}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                >
                    {
                        video?.assets?.map(asset => {
                            return (
                                asset?.mimetype?.includes('image') ?
                                <SwiperSlide key={asset?.url} className='silde'>
                                    <div className='slider-asset-container'>
                                        <img src={asset?.url} alt='' />
                                    </div>
                                </SwiperSlide> :
                                <SwiperSlide key={asset?.url} className='silde'>
                                    <>
                                        { PauseVideo ? <div style={styles.PauseIcon}><PlayIcon /></div> : null }
                                        <video controls={false} ref={videoRef} style={styles.video} src={asset?.url} autoPlay loop onClick={pausePlayVideo}>
                                            <source src={asset?.url} />
                                        </video>
                                    </>
                                </SwiperSlide>
                            );
                        })
                    }
                </Swiper>
            </div>

            <div style={styles.sidebar}>
                <Link to={`/account-profile/${video?.user}`} style={styles.sidebarItem}>
                    <img style={styles.img} src={video?.profile_img?.url ? video?.profile_img?.url : logo} alt='' />
                </Link>

                <button style={styles.sidebarItem} onClick={like}>
                    <HeardIcon Colors={Like ? '#f00' : '#ffffff'} />
                    <p style={styles.sidebarItemText}>{ (Like && LikeClicked) ? video?.likes?.length + 1 : (!Like && LikeClicked) ? video?.likes?.length - 1 : video?.likes?.length }</p>
                </button>
                
                <div style={styles.sidebarItem} onClick={getComments}>
                    <MessageIcon Colors={'#ffffff'} />
                    <p style={styles.sidebarItemText}>{video?.comments?.length}</p>
                </div>
                
                <button style={styles.sidebarItem} onClick={save}>
                    <SaveIcon Colors={Save ? '#ffda1c' : '#ffffff'} />
                    <p style={styles.sidebarItemText}>{ (Save && SaveClicked) ? video?.likes?.length + 1 : (!Save && SaveClicked) ? video?.likes?.length - 1 : video?.likes?.length}</p>
                </button>
                
                <div style={styles.sidebarItem} onClick={ShareHandler}>
                    <ShareIcon Colors={'#ffffff'} />
                    <p style={styles.sidebarItemText}>share</p>
                </div>
            </div>
            
            <div style={styles.bottomBar}>
                {
                    Object.keys(video?.location).length !== 0 ?
                    <div style={styles.mapContainer}>
                        <img style={styles.mapImg} src={map} alt='' onClick={() => setShowMap(true)} />
                    </div> :
                    null
                }

                {
                    Object.keys(video?.country).length !== 0 ?
                    <p style={styles.nameText}>{video?.place?.name} {video?.city ? `, ${video?.city}` : null} {video?.country ? `, ${video?.country}` : null}</p> :
                    null
                }

                {
                    video?.rating ?
                    <div style={styles.starsContainer}>
                        { new Array(5).fill(0).map((star, i) => getStar(video?.rating, i)) }

                        <div style={styles.likeContainer}>
                            {
                                video?.like ?
                                <LikeIcon Colors={'#daabff'} width={17} /> :
                                <DisLikeIcon Colors={'#daabff'} width={17} />
                            }
                        </div>
                    </div> :
                    null
                }
                
                <p style={styles.descriptionText}>{video?.description}</p>
            </div>

            { ShowComments && <CommentsContainer setShowComments={setShowComments} Comments={Comments.reverse()} setComments={setComments} video={video} /> }
            { ShowMap && <VideoMap setShowMap={setShowMap} video={video} /> }
        </div>
    );
};

let style = (Colors, WindowWidth) => {
    return {
        videoContainer: {
            position: 'relative',
            height: WindowWidth >= 970 ? '100vh' : window.innerHeight - 60,
            width: '100%',
            scrollSnapAlign: 'start',
            overflow: 'hidden',
            zIndex: 1,
        },
        videoWrapper: {
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItem: 'center',
            justifyContent: 'center',
        },
        PauseIcon: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
        video: {
            width: '100%',
            height: '100%',
            objectFit: 'contain',
        },
        sidebar: {
            position: 'absolute',
            right: 0,
            bottom: 0,
            padding: 20,
            paddingRight: WindowWidth >= 700 ? 20 : 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 20,
            zIndex: 1000
        },
        sidebarItem: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 3,
            cursor: 'pointer',
        },
        sidebarItemText: {
            fontFamily: 'Poppins',
            fontZeight: 300,
            fontSize: 12,
            textAlign: 'center',
            color: '#ffffff',
            textShadow: '1px 1px 1px #00000050',
            userSelect: 'none',
        },
        img: {
            marginBottom: 5,
            width: 50,
            height: 50,
            objectFit: 'cover',
            borderRadius: 50,
            border: '2px solid #fff',
        },
        follow: {
            marginTop: -15,
        },
        bottomBar: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '70%',
            padding: 14,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            zIndex: 1000,
        },
        nameText: {
            marginBottom: 5,
            fontFamily: 'Poppins',
            fontWeight: 500,
            fontSize: 17,
            lineHeight: '19px',
            textAlign: 'start',
            color: '#ffffff',
            textShadow: '1px 1px 1px #00000050',
        },
        starsContainer: {
            position: 'relative',
            marginBottom: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',            
        },
        likeContainer: {
            marginLeft: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
        },
        descriptionText: {
            fontFamily: 'Poppins',
            fontWeight: 200,
            fontSize: 13,
            lineHeight: '15px',
            textAlign: 'start',
            color: '#ffffff',
            textShadow: '1px 1px 1px #00000050',
        },
        mapContainer: {
            marginBottom: 10,
            width: 70,
            height: 70,
            borderRadius: 10,
            border: '4px solid #fff',
            textShadow: '1px 1px 1px #00000050',
            cursor: 'pointer',
            overflow: 'hidden',
        },
        mapImg: {
            width: 70,
            height: 70,
            objectFit: 'cover',
        },
    };
};

export default VideoContainer;