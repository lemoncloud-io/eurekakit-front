import React, { useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { PRODUCTION } from '../../envs/env.json';
import { ModalWebViewScreen } from '../screens';
import HomeStackNavigator from './HomeStack';

const RootStack = createStackNavigator();

const AppNavigator = () => {
    const navigationRef: any = useRef();
    const routeNameRef: any = useRef();

    return (
        <SafeAreaProvider>
            <NavigationContainer
                ref={navigationRef}
                onReady={() => (routeNameRef.current = navigationRef.current?.getCurrentRoute().name)}
                onStateChange={async () => {
                    const previousRouteName = routeNameRef.current;
                    const currentRouteName = navigationRef.current.getCurrentRoute().name;
                    routeNameRef.current = currentRouteName;
                    if (PRODUCTION) {
                        return;
                    }
                    console.log(`ROUTE CHANGED: ${previousRouteName} -> ${currentRouteName}`);
                }}
            >
                <RootStack.Navigator screenOptions={{ presentation: 'modal', headerShown: false }}>
                    <RootStack.Screen name="HomeStack" component={HomeStackNavigator} />
                    {/* TODO: add below more screens for Modal Screens */}
                    <RootStack.Screen name="ModalWebView" component={ModalWebViewScreen} />
                </RootStack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default AppNavigator;
