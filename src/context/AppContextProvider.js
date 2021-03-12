import React, { useReducer } from 'react';

import {AppContext, initialState} from './AppContext';

import appReducer from './AppReducer';

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider