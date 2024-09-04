import React, { useEffect, useState } from 'react'
import { useContextApi } from '../../api/ContextApi'
import { FriendsData } from '../../api/FriendsData'
import FriendsContainer from '../Friends/components/FriendsContainer'
import axios from 'axios'
import { SearchIcon } from '../../api/Icons'

function Inbox() {
    let state = useContextApi()
    let [Colors] = state.Colors
    let [BackendUrl] = state.BackendUrl
    let [UserToken] = state.UserToken
    let [UserData] = state.UserData
    const [Connections, setConnections] = useState([])
    const [FiltredConnections, setFiltredConnections] = useState([])
    const [SearchValue, setSearchValue] = useState('')
    
    const [WindowWidth, setWindowWidth] = useState(500)
    let styles = style(Colors, WindowWidth)
    
    let windowSize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', windowSize)

    useEffect(() => {
        windowSize()

        if(UserToken && UserData) {
            let getInbox = async () => {
                if(UserToken) {
                    try {
                        let res = await axios.get(`${BackendUrl}/user/inbox`, {
                            headers: {
                                'Authorization': UserToken
                            }
                        })
                        if(res.data.success) {
                            setConnections(res.data.data.inbox)
                            setFiltredConnections(res.data.data.inbox)
                        }
                    } catch(error) {
                        console.log(error.response.data.message)
                    }
                }
            }
            getInbox()
        }
    }, [UserToken, UserData, BackendUrl])

    useEffect(() => {
        let filtred = Connections.filter(con => con?.username?.toLowerCase().includes(SearchValue.toLowerCase()))
        setFiltredConnections(filtred)
    }, [SearchValue])

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <p style={styles.headerText}>inbox</p>
                <div style={styles.headerImagesContainer}>
                    {
                        FriendsData.map((friend, i)=> {
                            return (
                                <img key={i} src={friend.img} style={styles.headerImg} alt='' />
                            )
                        })
                    }
                </div>
            </div>

            <form style={styles.searchContainer} onSubmit={e => e.preventDefault()}>
                <input style={styles.input} type='text' placeholder='search...' value={SearchValue} onChange={e => setSearchValue(e.target.value)} />
                <button style={styles.searchBtn} type={'submit'}>
                    <SearchIcon Colors={Colors.black} />
                </button>
            </form>

            <FriendsContainer Connection={FiltredConnections.reverse() || []} />
            
        </div>
    )
}

let style = (Colors, WindowWidth) => {
    return {
        container: {
            paddingLeft: WindowWidth >= 970 ? 270 : 0,
            paddingRight: WindowWidth >= 1300 ? 370 : 0,
            paddingBottom: WindowWidth >= 970 ? 0 : 40,

            position: 'relative',
            width: '100vw',
            height: '100vh',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',

            backgroundColor: Colors.white,
        },

        header: {
            padding: 20,
            width: '100%',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 20,
        },
        headerText: {
            fontSize: 27,
            fontFamily: 'Poppins',
            fontWeight: 600,
            color: Colors.black
        },
        headerImagesContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        headerImg: {
            marginLeft: -8,
            width: 24,
            height: 24,
            objectFit: 'cover',
            borderRadius: 24,
        },

        searchContainer: {
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: 8,
            paddingRight: 8,
            
            width: '100%',
            maxWidth: 500,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 10,
            
            border: '.5px solid #333333',
            borderRadius: 30,
        },
        input: {
            width: '100%',
            paddingTop: 6,
            paddingBottom: 6,
            paddingLeft: 10,
            paddingRight: 10,

            backgroundColor: 'transparent',
            color: Colors.black,
        },
        searchBtn: {
            padding: 10,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',

            cursor: 'pointer',
        },

        navigationBar: {
            width: '100%',
            maxWidth: 300,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',            
        },
        btn: {
            paddingBottom: 6,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 10,
            
            cursor: 'pointer',
        },
        btnIcon: {},
        btnText: {
            fontSize: 15,
            fontFamily: 'Poppins',
            fontWeight: 300,
            color: '#666666',
        },
        btnActivated: {
            paddingBottom: 6,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 10,

            borderBottom: `2px solid ${Colors.black}`,
            cursor: 'pointer',
        },
        btnIconActivated: {},
        btnTextActivated: {
            
            fontSize: 15,
            fontFamily: 'Poppins',
            fontWeight: 600,
            color: Colors.black,
        },
    }
}

export default Inbox