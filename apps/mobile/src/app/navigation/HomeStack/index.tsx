import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { EurekaPageWebViewScreen } from '../../screens';

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator initialRouteName="Home" screenOptions={{ headerMode: 'screen' }}>
            <HomeStack.Screen name="Home" component={EurekaPageWebViewScreen} options={{ headerShown: false }} />
        </HomeStack.Navigator>
    );
};

export default HomeStackNavigator;
