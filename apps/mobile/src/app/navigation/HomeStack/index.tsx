import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { EurekaWebViewScreen } from '../../screens';

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator initialRouteName="Home" screenOptions={{ headerMode: 'screen' }}>
            <HomeStack.Screen name="Home" component={EurekaWebViewScreen} options={{ headerShown: false }} />
        </HomeStack.Navigator>
    );
};

export default HomeStackNavigator;
