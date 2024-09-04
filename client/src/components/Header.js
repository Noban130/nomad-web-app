import { useEffect, useState } from 'react'
import { useContextApi } from '../api/ContextApi'
import { MoonIcon } from '../api/Icons'

export default function Header() {
    const state = useContextApi()
    const [Colors] = state.Colors
    const [DarkMode, setDarkMode] = state.DarkMode

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const style = Style({ windowWidth })

    useEffect(() => {
        const handleResize = () => {
        setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div style={style.container}>
            <div onClick={() => setDarkMode(!DarkMode)} style={style.button}>
                <MoonIcon width={32} height={32} Colors={Colors} />
            </div>
        </div>
    )
}

const Style = ({ windowWidth }) => ({
    container: {
        display: windowWidth >= 970 ? 'none' : 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '20px',
        width: '100%',
        zIndex: 10,
    },
    button: {
        cursor: 'pointer',
    },
})