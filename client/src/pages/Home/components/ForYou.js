import React, { useState, useEffect } from 'react';
import VideoContainer from './VideoContainer';
import { useContextApi } from '../../../api/ContextApi';
import axios from 'axios';

function ForYou() {
    let state = useContextApi();
    let [BackendUrl] = state.BackendUrl;
    let [UserToken] = state.UserToken;

    const [Videos, setVideos] = useState([]);
    const [Loading, setLoading] = useState(false);

    const getVideos = async () => {
        if (UserToken) {
            setLoading(true)
            try {
                let res = await axios.get(`${BackendUrl}/video/foryou`, {
                    headers: {
                        'Authorization': UserToken
                    }
                });
                if (res.data.success) {
                    setVideos(res.data.data)
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
                console.log(error);
                console.log(error.response.data.message);
            } finally {
                setLoading(false)
            }
        }
    };

    useEffect(() => {
        getVideos();
    }, []);

    useEffect(() => {
        getVideos();
    }, [UserToken]);

    return (
        <>
            { 
                (Videos.length !== 0 && !Loading) ? 
                Videos?.reverse()?.map(video => <VideoContainer video={video} key={video?._id} />) :
                (Videos.length == 0 && Loading) ?
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                    <h1 style={{ fontSize: 14, color: '#fff', textAlign: 'center' }}>loading...</h1>
                </div> :
                null
            }
        </>
    );
}

export default ForYou;