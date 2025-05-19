import React from 'react';

const AppContext = React.createContext({});
const AppConsumer = AppContext.Consumer;

const AppProvider = props => {
    const globalFunctions = {
        // NOTE: add global functions
    };

    return (
        <AppContext.Provider value={{ ...globalFunctions }}>
            {props.children}
            {/* NOTE: add other global component  */}
        </AppContext.Provider>
    );
};

export { AppConsumer, AppProvider };
