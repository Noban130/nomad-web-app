import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useContextApi } from '../../../api/ContextApi';
import { InboxIcon, InfoIcon, LeftArrowIcon } from '../../../api/Icons';
import { Link, useParams } from 'react-router-dom';
import chatBg from '../../../assets/imgs/chatBg.webp';
import logo from '../../../assets/imgs/coin-logo.png'
import { CommonStyles } from '../../../CommonStyles';
import axios from 'axios';
import io from 'socket.io-client';

function ChatRoom() {
    let state = useContextApi();
    let [WindowWidth] = state.WindowWidth;
    let [Colors] = state.Colors;
    let [BackendUrl] = state.BackendUrl;
    let [UserToken] = state.UserToken;
    let [UserData] = state.UserData;

    let styles = style(Colors, WindowWidth);
    let params = useParams();
    let commonStyles = CommonStyles(WindowWidth, Colors);

    const [Friend, setFriend] = useState({});
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const messageEndRef = useRef(null);

    let getFriendInfo = useCallback(async () => {
        setFriend({});
        if(UserToken && BackendUrl && params) {
            try {
                let res = await axios.get(`${BackendUrl}/user/account/${params.id}`, {
                    headers: {
                        'Authorization': UserToken
                    }
                });
                setFriend(res.data.data);
            } catch (error) {
                console.log(error?.response?.data?.message);
            }
        }
    }, [UserToken, BackendUrl, params]);

    useEffect(() => {
        getFriendInfo();
    }, [params, getFriendInfo]);

    useEffect(() => {
        if (UserData && UserData._id) {
            const newSocket = io('http://localhost:7000', {
                query: { userId: UserData._id }
            });
            setSocket(newSocket);

            newSocket.on('newMessage', (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            return () => {
                newSocket.disconnect();
            };
        }
    }, [UserData]);

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`https://nomadworld-chat-eebfb52d5dd5.herokuapp.com/api/v0/messages/send/${params.id}`, {
                message: currentMessage
            }, {
                headers: {
                    'Authorization': UserToken,
                    'Content-Type': 'application/json',
                }
            });
            socket.emit('sendMessage', currentMessage);
            setMessages([...messages, res.data.data]);
            setCurrentMessage('')
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (UserData && UserToken && params) {
            const getMessages = async () => {
                try {
                    const res = await axios.get(`https://nomadworld-chat-eebfb52d5dd5.herokuapp.com/api/v0/messages/${params.id}`, {
                        headers: {
                            'Authorization': UserToken,
                            'Content-Type': 'application/json',
                        }
                    });
                    setMessages(res.data.data);
                } catch (error) {
                    console.log(error);
                }
            };
            getMessages()
        }
        
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [UserData, params, UserToken]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    let lastMessageDate = null;

    if (Object.keys(Friend).length === 0) return null;

    return (
        <div style={commonStyles.bigContainer}>
            <div style={styles.chatImg}></div>
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <Link style={styles.link} to={'/inbox'}>
                        <LeftArrowIcon Colors={Colors.black} />
                    </Link>
                    <Link style={styles.userProfileLink} to={`/account-profile/${Friend?.account?._id}`} >
                        <img src={Friend?.account?.profile_img?.url ? Friend?.account?.profile_img?.url : logo} style={styles.headerLeftImg} alt='' />
                        <div style={styles.headerLeftInfo}>
                            <p style={styles.headerLeftName}>{Friend?.account?.firstname} {Friend?.account?.lastname}</p>
                            <p style={styles.headerLeftsecondText}>{Friend?.account?.username} - {Friend?.account?.country}</p>
                        </div>
                    </Link>
                </div>
                <Link style={styles.link} to={`/account-profile/${Friend?.account?._id}`}>
                    <InfoIcon Colors={Colors.black} />
                </Link>
            </div>
            <div style={styles.chatContainer}>
                {messages.map(message => {
                    const messageDate = formatDate(message.createdAt);
                    const showDate = lastMessageDate !== messageDate;
                    lastMessageDate = messageDate;

                    return (
                        <React.Fragment key={message._id}>
                            {showDate && <div style={styles.dateHeader}>{messageDate}</div>}
                            <div style={message?.senderId === UserData._id ? styles.userMessageContainer : styles.senderMessageContainer}>
                                <div style={styles.senderMessage}>
                                    <p style={styles.senderMessageText}>{message?.message}</p>
                                </div>
                                <p style={styles.senderMessageTime}>{message?.createdAt?.slice(11, 16)}</p>
                            </div>
                        </React.Fragment>
                    );
                })}
                <div ref={messageEndRef} />
            </div>
            <form style={styles.bottomTextInputContainer} onSubmit={sendMessage} >
                <div style={styles.inputAndSendBtn}>
                    <input
                        type='text'
                        autoFocus
                        style={styles.bottomTextInput}
                        placeholder='message'
                        onChange={e => setCurrentMessage(e.target.value)}
                        value={currentMessage}
                    />
                    <button style={styles.sendBtn} onClick={sendMessage}>
                        <InboxIcon Colors={Colors.black} />
                    </button>
                </div>
            </form>
        </div>
    );
}

let style = (Colors, WindowWidth) => {
    return {
        container: {
            paddingLeft: WindowWidth >= 970 ? 270 : 0,
            paddingRight: WindowWidth >= 1300 ? 370 : 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: Colors.white,
        },
        chatImg: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url("${chatBg}")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            opacity: .1,
            zIndex: 0,
        },
        header: {
            position: 'fixed',
            padding: 20,
            width: WindowWidth >= 1300 ? 'calc(100% - 640px)' : (WindowWidth >= 970 && WindowWidth < 1300) ? 'calc(100% - 270px)' : '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1000,
        },
        headerLeft: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 15,
        },
        link: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
        },
        userProfileLink: {
            display: 'flex',
            alignItems: 'center',
            gap: 14,
        },
        headerLeftImg: {
            width: 50,
            height: 50,
            objectFit: 'cover',
            borderRadius: 50,
        },
        headerLeftInfo: {
            display: 'flex',
            flexDirection: 'column',
        },
        headerLeftName: {
            fontFamily: 'Poppins',
            fontWeight: 700,
            fontSize: 17,
            color: Colors.black,
        },
        headerLeftsecondText: {
            marginTop: -5,
            fontFamily: 'Poppins',
            fontWeight: 400,
            fontSize: 13,
            color: '#666666',
        },
        chatContainer: {
            position: 'relative',
            paddingLeft: WindowWidth >= 970 ? 20 : 10,
            paddingRight: WindowWidth >= 970 ? 20 : 10,
            marginTop: 90,

            width: '100%',
            height: 'calc(100vh - 140px)',
            maxHeight: '100vh',
            flex: 1,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            gap: WindowWidth >= 970 ? 36 : 36,
            overflowY: 'auto',
            zIndex: 1,
        },
        senderMessageContainer: {
            position: 'relative',
            padding: 10,
            paddingLeft: 15,
            paddingRight: 15,
            maxWidth: WindowWidth >= 970 ? 300 : '70%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: Colors.transparentBlack,
            borderRadius: 20,
            zIndex: 2,
        },
        senderMessage: {
            fontFamily: 'Poppins',
            fontWeight: 400,
            fontSize: 14,
            color: Colors.black,
        },
        senderMessageText: {
            wordBreak: 'break-all',
        },
        senderMessageTime: {
            position: 'absolute',
            bottom: -24,
            right: 4,

            marginLeft: 'auto',
            marginTop: -2,
            fontFamily: 'Poppins',
            fontWeight: 300,
            fontSize: 14,
            color: Colors.black,
        },
        dateHeader: {
            width: '100%',
            padding: '6px 10px',
            
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,

            color: Colors.black,
            fontSize: 14,
        },
        userMessageContainer: {
            position: 'relative',
            marginLeft: 'auto',
            padding: 10,
            paddingLeft: 15,
            paddingRight: 15,
            maxWidth: WindowWidth >= 970 ? 300 : '70%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: Colors.transparentBlack,
            borderRadius: 20,
            zIndex: 2,
        },

        bottomTextInputContainer: {
            position: "fixed",
            bottom: 0,
            width: '100%',
            padding: 0,
            paddingTop: 0,
            paddingRight: WindowWidth >= 1300 ? 640 : (WindowWidth >= 970 && WindowWidth <= 1300) ? 270 : 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1,
        },
        inputAndSendBtn: {
            width: '100%',
            padding: '8px 8px',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',

            backgroundColor: Colors.transparentBlack,
        },
        bottomTextInput: {
            paddingLeft: 10,
            paddingRight: 10,
            width: '100%',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            color: Colors.black,
        },
        sendBtn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            outline: 'none',
            background: 'none',
        },
    };
};

export default ChatRoom;