import React, { useEffect, useState } from 'react'
import { useContextApi } from '../../../api/ContextApi'
import { Link } from 'react-router-dom'
import { SearchIcon } from '../../../api/Icons'
import logo from '../../../assets/imgs/coin-logo.png'

const PeopleContainer = ({ People, SearchValue, setSearchValue }) => {
    let state = useContextApi()
    let [Colors] = state.Colors
    let styles = style(Colors)

    const [Data, setData] = useState([])

    useEffect(() => {
        setData(People)
    }, [People])

    if(Data.length === 0) return (
        <div style={styles.container}>
            <form style={styles.searchContainer} onSubmit={e => e.preventDefault()}>
                <input style={styles.input} type='text' placeholder='search...' value={SearchValue} onChange={e => setSearchValue(e.target.value)} />
                <button style={styles.searchBtn} type={'submit'}>
                    <SearchIcon Colors={Colors.black} />
                </button>
            </form>
        </div>
    )
    
    return (
        <div style={styles.container}>
            <form style={styles.searchContainer} onSubmit={e => e.preventDefault()}>
                <input style={styles.input} type='text' placeholder='search...' value={SearchValue} onChange={e => setSearchValue(e.target.value)} />
                <button style={styles.searchBtn} type={'submit'}>
                    <SearchIcon Colors={Colors.black} />
                </button>
            </form>
            <div style={styles.friendsContainer}>
                {
                    Data.map(friend => {
                        return (
                            <Link to={`/account-profile/${friend?._id}`} style={styles.friend} key={friend?._id}>
                                <img src={friend?.profile_img?.url ? friend?.profile_img?.url : logo} style={styles.friendImg} alt='' />
                                <div style={styles.friendNameContainer}>
                                    <div style={styles.friendName}>{friend?.firstname} {friend?.lastname}</div>
                                    <div style={styles.friendSpan}>{friend.username}</div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

let style = (Colors) => {
    return {
        container: {
            padding: 20,

            width: '100%',
            maxWidth: 500,
            height: 'calc(100% - 112px)',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            gap: 20,

            backgroundColor: Colors.white,
        },

        searchContainer: {
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: 8,
            paddingRight: 8,
            
            width: '100%',

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

        friendsContainer: {
            width: '100%',
            height: '100%',
            maxHeight: '100vh',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',

            overflowY: 'auto',
        },
        friend: {
            paddingTop: 10,
            paddingBottom: 10,
            width: '100%',
            
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 20,

            cursor: 'pointer',
        },
        friendImg: {
            width: 50,
            height: 50,
            objectFit: 'cover',
            borderRadius: 50,
        },
        
        friendNameContainer: {
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        friendName: {
            fontSize: 17,
            fontFamily: 'Poppins',
            fontWeight: 500,
            color: Colors.black,
        },
        friendSpan: {
            marginTop: -5,
            fontSize: 13,
            fontFamily: 'Poppins',
            fontWeight: 300,
            color: '#666666',
        },
    }
}

export default PeopleContainer