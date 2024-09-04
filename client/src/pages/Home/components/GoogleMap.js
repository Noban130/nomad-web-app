// import React, { useState } from "react";
// import {
//     APIProvider,
//     Map,
//     AdvancedMarker,
//     Pin,
//     InfoWindow,
// } from "@vis.gl/react-google-maps";

// const GoogleMap = ({ Long, Lat, zoom }) => {
//     const position = { lat: Lat, lng: Long };
//     const [open, setOpen] = useState(false);

//     return (
//         <APIProvider apiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY}>
//             <div style={{ height: "100%", width: "100%" }}>
//                 <Map center={position} mapId={'1fce8fcbf5824bf6'}
//                     defaultZoom={zoom ? zoom : 19}
//                     gestureHandling={'greedy'}
//                     disableDefaultUI={true}
//                 >
//                     <AdvancedMarker position={position} onClick={() => setOpen(true)}>
//                         <Pin
//                             background={"#d5a9ef"}
//                             borderColor={"#9a62bb"}
//                             glyphColor={"#9a62bb"}
//                         />
//                     </AdvancedMarker>

//                     { open && (
//                         <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
//                             <p>I'm in Hamburg</p>
//                         </InfoWindow>
//                     )}
//                 </Map>
//             </div>
//         </APIProvider>
//     );
// }

// export default GoogleMap



// import React, { useState, useEffect } from "react";
// import {
//     APIProvider,
//     Map,
//     AdvancedMarker,
//     Pin,
//     InfoWindow,
// } from "@vis.gl/react-google-maps";

// const GoogleMap = ({ Long, Lat, zoom }) => {
//     const position = { lat: Lat, lng: Long };
//     const [open, setOpen] = useState(false);

//     useEffect(() => {
//         console.log(process.env)
//     }, [])

//     return (
//         <APIProvider apiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY}>
//             <div style={{ height: "100%", width: "100%" }}>
//                 <Map 
//                     center={position} 
//                     mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
//                     defaultZoom={zoom ? zoom : 19}
//                     gestureHandling={'greedy'}
//                     disableDefaultUI={true}
//                 >
//                     <AdvancedMarker position={position} onClick={() => setOpen(true)}>
//                         <Pin
//                             background={"#d5a9ef"}
//                             borderColor={"#9a62bb"}
//                             glyphColor={"#9a62bb"}
//                         />
//                     </AdvancedMarker>

//                     { open && (
//                         <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
//                             <p>I'm in Hamburg</p>
//                         </InfoWindow>
//                     )}
//                 </Map>
//             </div>
//         </APIProvider>
//     );
// }

// export default GoogleMap;

import React, { useState } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from "@vis.gl/react-google-maps";

const GoogleMap = ({ Long, Lat, zoom }) => {
    const position = { lat: Lat, lng: Long };
    const [open, setOpen] = useState(false);

    return (
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY}>
            <div style={{ height: "100%", width: "100%" }}>
                <Map 
                    center={position} 
                    mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
                    zoom={zoom ? zoom : 19}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                >
                    <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                        <Pin
                            background={"#d5a9ef"}
                            borderColor={"#9a62bb"}
                            glyphColor={"#9a62bb"}
                        />
                    </AdvancedMarker>

                    {open && (
                        <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                            <p>I'm in Hamburg</p>
                        </InfoWindow>
                    )}
                </Map>
            </div>
        </APIProvider>
    );
}

export default GoogleMap;
