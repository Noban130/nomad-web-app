import React from 'react'
import VideoContainer from '../../Home/components/VideoContainer'

function VideosPopup(props) {
    let { Assets } = props
    return (
        <>
            { Assets?.map(video => <VideoContainer video={video} key={video?._id} />) }
        </>
    )
}

export default VideosPopup