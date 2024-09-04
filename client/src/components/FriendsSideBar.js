import { useCallback, useEffect, useState } from "react"
import FriendsContainer from "../pages/Friends/components/FriendsContainer"
import PeopleContainer from "../pages/Friends/components/PeopleContainer"
import { useContextApi } from "../api/ContextApi"
import { FriendsData } from "../api/FriendsData"
import { FindPerson, FriendsIcon, PersonIcon } from "../api/Icons"
import axios from 'axios'
import RequestsContainer from "../pages/Friends/components/RequestsContainer"

function FriendsSideBar() {
    let state = useContextApi()
    let [Colors] = state.Colors
    let [BackendUrl] = state.BackendUrl
    let [UserToken] = state.UserToken
    let [UserData] = state.UserData

    const [WindowWidth, setWindowWidth] = useState(500)
    const [CurrentTab, setCurrentTab] = useState('friends')
    const [Connection, setConnection] = useState([])
    const [People, setPeople] = useState([])
    const [SearchValue, setSearchValue] = useState('')
    const [Requests, setRequests] = useState([])
    
    let getRequests = useCallback(async () => {
        if(UserToken) {
            try {
                let res = await axios.get(`${BackendUrl}/user/connection-requests`, {
                    headers: {
                        'Authorization': UserToken
                    }
                })
                
                if(res.data.success) setRequests(res.data.data.connections_requests)
            } catch(error) {
                console.log(error.response.data.message)
            }
        }
    }, [UserToken, BackendUrl])

    let styles = style(Colors, WindowWidth)

    let getFriends = useCallback(async () => {
        if(UserToken) {
            try {
                let res = await axios.get(`${BackendUrl}/user/connections`, {
                    headers: {
                        'Authorization': UserToken
                    }
                })

                if(res.data.success) setConnection(res.data.data)
            } catch(error) {
                console.log(error.response.data.message)
            }
        }
    }, [UserToken, BackendUrl])

    let getAllPeople = useCallback(async () => {
        if(UserToken) {
            try {
                let res = await axios.get(`${BackendUrl}/user/all?page=1&limit=20`, {
                    headers: {
                        'Authorization': UserToken
                    }
                })
    
                if(res.data.success) setPeople(res.data.data)
            } catch(error) {
                console.log(error.response.data.message)
            }
        }
    }, [UserToken, BackendUrl])

    let searchForUser = useCallback(async () => {
        if(UserToken) {
            try {
                let res = await axios.get(`${BackendUrl}/user/search?search=${SearchValue}`, {
                    headers: {
                        'Authorization': UserToken
                    }
                })
    
                if(res.data.success) setPeople(res.data.data)
            } catch(error) {
                console.log(error.response.data.message)
            }
        }
    }, [SearchValue, BackendUrl, UserToken])
    
    let windowSize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', windowSize)
    
    useEffect(() => {
        searchForUser()
    }, [SearchValue, searchForUser])

    useEffect(() => {
        windowSize()
        getRequests()
        getFriends()
        getAllPeople()
    }, [getRequests, getFriends, getAllPeople])

    if(WindowWidth < 1300) return null
    if(Object.keys(UserData).length === 0) return null

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <p style={styles.headerText}>friends</p>
                <div style={styles.headerImagesContainer}>
                    {
                        FriendsData.map((friend, i) => {
                            return (
                                <img key={i} src={friend.img} style={styles.headerImg} alt='' />
                            )
                        })
                    }
                </div>
            </div>

            <div style={styles.navigationBar}>
                <div style={CurrentTab === 'requests' ? styles.btnActivated : styles.btn} onClick={() => setCurrentTab('requests')}>
                    <PersonIcon Colors={CurrentTab === 'requests' ? Colors.black : '#666666'} />
                    <div style={CurrentTab === 'requests' ? styles.btnTextActivated : styles.btnText}>requests</div>
                </div>
                <div style={CurrentTab === 'friends' ? styles.btnActivated : styles.btn} onClick={() => setCurrentTab('friends')}>
                    <FriendsIcon Colors={CurrentTab === 'friends' ? Colors.black : '#666666'} />
                    <div style={CurrentTab === 'friends' ? styles.btnTextActivated : styles.btnText}>friends</div>
                </div>
                <div style={CurrentTab === 'find_friends' ? styles.btnActivated : styles.btn} onClick={() => setCurrentTab('find_friends')}>
                    <FindPerson Colors={CurrentTab === 'find_friends' ? Colors.black : '#666666'} />
                    <div style={CurrentTab === 'find_friends' ? styles.btnTextActivated : styles.btnText}>find friends</div>
                </div>
            </div>

            {                
                CurrentTab === 'friends' ? 
                <FriendsContainer Connection={Connection} /> : 
                CurrentTab === 'find_friends' ? 
                <PeopleContainer People={People} SearchValue={SearchValue} setSearchValue={setSearchValue} /> : 
                <RequestsContainer Requests={Requests} getRequests={getRequests} getFriends={getFriends} sidebar={true} />
            }
            
        </div>
    )
}

let style = (Colors, WindowWidth) => {
    return {
        container: {
            position: 'fixed',
            top: 0,
            right: 0,

            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 0,
            paddingRight: 0,

            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: 370,
            width: '100%',
            height: '100vh',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            gap: 20,

            borderLeft: `.5px solid ${Colors.sidebarBorder}`,
            backgroundColor: Colors.white,
        },

        header: {
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

        navigationBar: {
            width: '100%',
            maxWidth: 400,

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
            gap: 2,
            
            cursor: 'pointer',
        },
        btnIcon: {},
        btnText: {
            fontSize: 13,
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
            
            fontSize: 13,
            fontFamily: 'Poppins',
            fontWeight: 600,
            color: Colors.black,
        },
    }
}

export default FriendsSideBar