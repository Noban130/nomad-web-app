import React from 'react'
import { ContextProvider } from './api/ContextApi';
import Routers from './Routers';

const App = () => {
    return (
        <ContextProvider>
            <Routers />
        </ContextProvider>
    )
}

export default App