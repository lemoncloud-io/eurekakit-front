import React from 'react';
import { AppRegistry } from 'react-native';

import App from './app/App';

const HeadlessCheck = props => {
    if (Object.prototype.hasOwnProperty.call(props, 'isHeadless') && props.isHeadless) {
        return null;
    }

    return <App />;
};

AppRegistry.registerComponent('EurekaKit', () => HeadlessCheck);
