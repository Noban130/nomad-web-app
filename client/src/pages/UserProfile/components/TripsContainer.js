import React from 'react'
import AddCountry from "./AddCountry"
import CountriesList from "./CountriesList"
import Maps from "./Maps"

let TripsContainer = (props) => {
    let { Colors, textColor, TripsActiveItem, setTripsActiveItem, ProfileData = {}, BackendUrl, UserToken, Callback, setCallback, UserData, params } = props
    
    let btns = [
        {
            svg: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={Colors.black}><path d="M261.23-422.46v298.27q0 7.77-5.48 13.21-5.48 5.44-12.82 5.44-7.78 0-13.2-5.44-5.42-5.44-5.42-13.21v-713.23q0-7.33 5.45-12.8 5.45-5.47 13.04-5.47 7.58 0 13.01 5.47 5.42 5.47 5.42 12.8v61.11h500.02q16.08 0 25.11 13.41 9.02 13.4 3.06 28.48l-54.04 135.04 54.04 134.65q5.96 15.42-3.06 28.85-9.03 13.42-25.11 13.42H261.23Zm0-316.92v280-280Zm239.32 198.15q24.52 0 41.37-16.79 16.85-16.78 16.85-41.3 0-24.52-16.79-41.37-16.78-16.85-41.3-16.85-24.52 0-41.37 16.79-16.85 16.78-16.85 41.3 0 24.52 16.79 41.37 16.78 16.85 41.3 16.85Zm-239.32 81.85h490l-55.56-140 55.56-140h-490v280Z"/></svg>,
            name: 'visited',
        },
        {
            svg: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={Colors.black}><path d="M326.77-591.08q-7.77 0-13.02-5.53-5.25-5.54-5.25-12.96 0-7.42 5.25-12.92Q319-628 326.77-628h448.81q7.32 0 12.8 5.48 5.47 5.48 5.47 12.82 0 7.78-5.47 13.2-5.48 5.42-12.8 5.42H326.77Zm0 129.23q-7.77 0-13.02-5.53t-5.25-12.95q0-7.42 5.25-12.93t13.02-5.51h448.81q7.32 0 12.8 5.48 5.47 5.48 5.47 12.82 0 7.78-5.47 13.2-5.48 5.42-12.8 5.42H326.77Zm0 129.23q-7.77 0-13.02-5.53t-5.25-12.95q0-7.42 5.25-12.93t13.02-5.51h448.81q7.32 0 12.8 5.48 5.47 5.48 5.47 12.82 0 7.78-5.47 13.2-5.48 5.42-12.8 5.42H326.77ZM189.5-586.46q-9.31 0-16.33-6.99-7.02-6.99-7.02-16.86 0-9.71 7.06-16.01 7.06-6.3 16.37-6.3 9.8 0 16.57 6.33t6.77 15.79q0 10.06-6.81 17.05t-16.61 6.99Zm0 128.46q-9.31 0-16.33-6.83-7.02-6.82-7.02-16.29 0-10.61 7.06-17.13t16.37-6.52q9.8 0 16.57 6.52t6.77 17.33q0 9.32-6.81 16.12-6.81 6.8-16.61 6.8Zm.04 130.12q-9.29 0-16.34-6.8-7.05-6.8-7.05-16.67 0-10.21 7.06-16.76 7.06-6.54 16.37-6.54 9.8 0 16.57 6.57 6.77 6.58 6.77 16.54 0 10.06-6.8 16.86-6.79 6.8-16.58 6.8Z"/></svg>,
            name: 'bucket',
        },
        // {
        //     svg: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={Colors.black}><path d="m579.38-176.58-218.26-76.04-153 59.23q-7.77 3.24-15.39 2.08-7.61-1.17-13.58-5.23-6.34-3.67-9.73-10.16-3.38-6.5-3.38-15.42v-477.5q0-11.06 4.94-19.74 4.94-8.68 14.75-12.02l154.73-53.04q4.59-1.62 9.81-2.81 5.22-1.19 10.85-1.19 5.48 0 10.58 1.19t9.68 2.81L599.27-708l152.89-59.57q7.49-2.89 15.11-1.73 7.61 1.16 13.96 4.84 5.96 4.06 9.54 10.59 3.58 6.53 3.58 14.99v481.91q0 11.16-6.29 19.62-6.29 8.47-16.48 11.2l-152.87 50.32q-4.96 2.01-9.68 2.63-4.73.62-9.82.62-5.21 0-9.98-1-4.78-1-9.85-3Zm1.12-37.73V-678l-200.62-69.85v463.7l200.62 69.84Zm36.92 0 140-46.15v-469.69l-140 52.15v463.69Zm-414.46-16.15 140-53.69v-463.7l-140 47.7v469.69ZM617.42-678v463.69V-678Zm-274.46-69.85v463.7-463.7Z"/></svg>,
        //     name: 'map',
        // },
        {
            svg: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={Colors.black}><path d="M461.85-461.23v139.5q0 7.77 5.45 13.21 5.45 5.44 13.03 5.44 7.59 0 13.02-5.44 5.42-5.44 5.42-13.21v-139.5h139.88q7.33 0 12.8-5.45 5.47-5.45 5.47-13.04 0-7.59-5.47-13.01t-12.8-5.42H498.77v-140.5q0-7.33-5.48-12.8-5.48-5.47-12.82-5.47-7.78 0-13.2 5.47-5.42 5.47-5.42 12.8v140.5H321.73q-7.77 0-13.21 5.48-5.44 5.47-5.44 12.81 0 7.78 5.44 13.21 5.44 5.42 13.21 5.42h140.12Zm18.33 335.08q-73.39 0-138.06-27.89t-112.51-75.69q-47.84-47.81-75.65-112.29-27.81-64.48-27.81-137.8 0-73.39 27.89-138.06t75.69-112.51q47.81-47.84 112.29-75.65 64.48-27.81 137.8-27.81 73.39 0 138.06 27.89t112.51 75.69q47.84 47.8 75.65 112.29 27.81 64.48 27.81 137.8 0 73.39-27.89 138.06t-75.69 112.51q-47.8 47.84-112.29 75.65-64.48 27.81-137.8 27.81Zm-.21-36.93q132.3 0 224.63-92.3 92.32-92.3 92.32-224.59 0-132.3-92.3-224.63-92.3-92.32-224.59-92.32-132.3 0-224.63 92.3-92.32 92.3-92.32 224.59 0 132.3 92.3 224.63 92.3 92.32 224.59 92.32ZM480-480Z"/></svg>,
            name: 'add',
        },
    ]

    if(Object.keys(ProfileData).length === 0) return null

    return (
        <div className="trips-container">
            <div className="trips-nav-bar">
                {
                    btns.slice(0, UserData?._id === params.id ? 3 : 2).map(btn => {
                        return (
                            <div 
                                key={btn.name}
                                className={`trip-nav-btn ${TripsActiveItem === btn.name ? 'active' : ''}`} 
                                style={{ borderBottom: `2px solid ${TripsActiveItem === btn.name ? Colors.black : 'transparent' }` }}
                                onClick={() => setTripsActiveItem(btn.name)}
                            >
                                { btn.svg }
                                <p className="label" style={textColor}>{btn.name} </p>
                            </div>
                        )
                    })
                }
            </div>

            <div className="trpis-content">
                {
                    TripsActiveItem === 'visited' ?
                    <CountriesList 
                        type={'visited'} 
                        name={'visited_countries'} 
                        textColor={textColor} 
                        ProfileData={ProfileData} 
                        UserData={UserData} 
                        Callback={Callback} 
                        setCallback={setCallback} 
                        UserToken={UserToken} 
                        BackendUrl={BackendUrl}
                    /> :

                    TripsActiveItem === 'bucket' ?
                    <CountriesList 
                        type={'bucket'} 
                        name={'bucket_list'} 
                        textColor={textColor} 
                        ProfileData={ProfileData} 
                        UserData={UserData} 
                        Callback={Callback}
                        setCallback={setCallback} 
                        UserToken={UserToken} 
                        BackendUrl={BackendUrl}
                    /> :

                    TripsActiveItem === 'map' ?
                    <Maps /> : 

                    TripsActiveItem === 'add' ?
                    (UserData?._id === params.id ? 
                        <AddCountry 
                            textColor={textColor} 
                            Colors={Colors} 
                            ProfileData={ProfileData} 
                            BackendUrl={BackendUrl} 
                            UserToken={UserToken}
                            Callback={Callback}
                            setCallback={setCallback}
                            setTripsActiveItem={setTripsActiveItem}
                        /> : 
                        null
                    ) :
                    null
                }
            </div>
        </div>
    )
}

export default TripsContainer