import React from 'react'
import { VideoIcon } from "../../../api/Icons"

let VideosImgsContainer = (props) => {
    let { Assets, textColor, ActiveBtn, setShowVideosPopup, setClickedVideoIndex } = props

    let clickHandler = (i) => {
        setShowVideosPopup(true)
        setClickedVideoIndex(i)
    }

    return (
        <div className="videos-imgs-container">
            { 
                Assets.length === 0 ?
                <p style={textColor} className='no-assets-p'>no {ActiveBtn} assets yet!</p> : 
                <div className="videos-imgs">
                    {
                        Assets?.map((asset, i) => {
                            return (
                                <div key={asset._id} className="video-img" onClick={() => clickHandler(i)}>
                                    {
                                        asset?.assets?.[0] ?
                                        <>
                                            {
                                                asset?.assets?.[0].mimetype?.includes('image') ?
                                                <img src={asset?.assets[0]?.url} alt="" /> :
                                                <video controls={false} src={asset?.assets?.[0].url}>
                                                    <source src={asset?.assets?.[0].url} />
                                                </video>
                                            }
                                        </> :
                                        null
                                    }
                                    
                                    <div className="bottom">
                                        <p>{asset?.description?.length >= 20 ? asset?.description?.slice(0, 20) + '...' : asset?.description}</p>
                                        <VideoIcon Colors={'#fff'} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default VideosImgsContainer