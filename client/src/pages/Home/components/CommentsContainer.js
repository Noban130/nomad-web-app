import React, { useState } from 'react'
import { useContextApi } from '../../../api/ContextApi'
import axios from 'axios'
import logo from '../../../assets/imgs/coin-logo.png'
import { Link } from 'react-router-dom'

const CommentsContainer = (props) => {
    let { setShowComments, Comments, setComments, video } = props

    let state = useContextApi()
    const [Colors] = state.Colors
    let [BackendUrl] = state.BackendUrl
    let [UserToken] = state.UserToken
    let styles = style(Colors)

    let [Comment, setComment] = useState('')

    let addComment = async e => {
        e.preventDefault()
        try {
            let res = await axios.post(`${BackendUrl}/video/${video._id}/comment`, {
                comment: Comment
            }, {
                headers: {
                    'Authorization': UserToken
                }
            })

            setComments([...Comments?.reverse(), res?.data?.data?.comment])
            setComment('')
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.commentsHeader}>
                <p style={styles.commentsHeaderText}>{Comments?.length} comments</p>
                <p style={styles.x} onClick={() => setShowComments(false)}>✖</p>
            </div>

            <form style={styles.addComment} onSubmit={addComment}>
                <div style={styles.commentInputContainer}>
                    <input style={styles.input} type='text' placeholder='add a comment...' onChange={e => setComment(e.target.value)} value={Comment} />
                    <button style={styles.button} type={'submit'}>add</button>
                </div>
            </form>

            {
                Comments.length !== 0 ?
                <div style={styles.commentsContainer}>
                    {
                        Comments.map(comment => {
                            return (
                                <div key={comment?._id} style={styles.comment}>
                                    <Link to={`/account-profile/${comment?.author}`}>
                                        <img style={styles.commentUserImg} src={comment?.profile_img?.url ? comment?.profile_img?.url : logo} alt='' />
                                    </Link>
                                    <div style={styles.nameAndComment}>
                                        <p style={styles.commentUserName}>{comment?.author_name}</p>
                                        <p style={styles.userComment}>{comment?.content}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div> :
                null
            }
        </div>
    )
}

let style = (Colors) => {
    return {
        container: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingBottom: 50,

            width: '100%',
            height: '50vh',
            backgroundColor: Colors.white,
            borderRadius: '10px 10px 0 0',

            zIndex: 1000,
        },
        
        commentsHeader: {
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',

            cursor: 'pointer',
        },
        commentsHeaderText: {
            fontSize: 14,
            fontWeight: 700,
            color: Colors.black,
        },
        x: {
            color: Colors.black,
        },
        
        commentsContainer: {
            padding: 10,
            paddingTop: 0,
            paddingBottom: 45,

            maxHeight: '100%',
            height: '100%',

            display: 'flex',
            flexDirection: 'column',

            overflowY: 'auto',
        },
        comment: {
            
            padding: 10,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            gap: 15,
        },
        commentUserImg: {
            width: 40,
            height: 40,
            objectFit: 'cover',
            borderRadius: 40,
        },
        nameAndComment: {
            display: 'flex',
            flexDirection: 'column',
        },
        commentUserName: {
            fontSize: 12,
            fontWeight: 400,
            color: Colors.black,
        },
        userComment: {
            marginTop: -3,

            fontSize: 14,
            fontWeight: 500,
            color: Colors.black,
        },

        addComment: {
            padding: '0 20px',
            width: '100%',
        },
        commentInputContainer: {
            width: '100%',
            paddingBottom: 10,

            display: 'flex',
            alignItems: 'center',
            gap: 10,

            borderBottom: '1px solid #ddd',
        },
        input: {
            width: '100%',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            color: Colors.black,
        },
        button: {
            padding: '8px 30px',
            backgroundColor: '#daabff',
            color: Colors.white,
            borderRadius: 6,
            cursor: 'pointer',
        },
    }
}

export default CommentsContainer