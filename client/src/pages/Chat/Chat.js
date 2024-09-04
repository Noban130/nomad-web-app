import React from 'react'
import ChatRoom from './components/ChatRoom'

function Chat() {
    let styles = style()

    return (
        <div style={styles.container}>
            <ChatRoom />
        </div>
    )
}

let style = () => {
    return {
        container: {
            width: '100%',
            height: '100vh',

            display: 'flex',
        },
    }
}

export default Chat