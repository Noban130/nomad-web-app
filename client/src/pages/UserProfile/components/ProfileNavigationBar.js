import React from 'react'

let ProfileNavigationBar = (props) => {
    let { Colors, textColor, ActiveBtn, setActiveBtn } = props

    let btns = [
        {
            svg: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={Colors.black}><path d="m437.54-363.23 151.4-97.42q10.79-6.84 10.79-19.32 0-12.47-10.69-19.68l-151.5-97.12q-11.31-7.85-23.5-1.21t-12.19 20.61v194.49q0 14.22 12.19 20.86 12.19 6.64 23.5-1.21Zm42.64 237.08q-73.39 0-138.06-27.89t-112.51-75.69q-47.84-47.81-75.65-112.29-27.81-64.48-27.81-137.8 0-73.39 27.89-138.06t75.69-112.51q47.81-47.84 112.29-75.65 64.48-27.81 137.8-27.81 73.39 0 138.06 27.89t112.51 75.69q47.84 47.8 75.65 112.29 27.81 64.48 27.81 137.8 0 73.39-27.89 138.06t-75.69 112.51q-47.8 47.84-112.29 75.65-64.48 27.81-137.8 27.81Zm-.21-36.93q132.3 0 224.63-92.3 92.32-92.3 92.32-224.59 0-132.3-92.3-224.63-92.3-92.32-224.59-92.32-132.3 0-224.63 92.3-92.32 92.3-92.32 224.59 0 132.3 92.3 224.63 92.3 92.32 224.59 92.32ZM480-480Z"/></svg>,
            name: 'reviews',
        },
        {
            svg: <svg xmlns="http://www.w3.org/2000/svg"  height="24"  width="24"  viewBox="0 0 24 24" fill='none' stroke={Colors.black} ><path d="M13.35 20.13c-.76.69-1.93.69-2.69-.01l-.11-.1C5.3 15.27 1.87 12.16 2 8.28c.06-1.7.93-3.33 2.34-4.29 2.64-1.8 5.9-.96 7.66 1.1 1.76-2.06 5.02-2.91 7.66-1.1 1.41.96 2.28 2.59 2.34 4.29.14 3.88-3.3 6.99-8.55 11.76l-.1.09z"/></svg>,
            name: 'liked',
        },
        {
            svg: <svg xmlns="http://www.w3.org/2000/svg"  height="24"  width="24"  viewBox="0 0 24 24"  fill='none' stroke={Colors.black} ><path fill={Colors} d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" /></svg>,
            name: 'saved',
        }
    ]

    return (
        <div className="navigation-bar">
            {
                btns.map(btn => {
                    return (
                        <div 
                            key={btn.name} 
                            className={`navigation-btn ${ActiveBtn === btn.name ? 'active' : ''}`}
                            onClick={() => setActiveBtn(btn.name)}
                            style={{ borderBottom: `3px solid  ${ActiveBtn === btn.name ? Colors.black : 'transparent'}`}}
                        >
                            { btn.svg }
                            <p style={textColor}>{btn.name}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProfileNavigationBar