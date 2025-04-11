import React, { useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppNavigator from './navigation';

import type { ScrollView} from 'react-native';

export const App = () => {
    const [whatsNextYCoord, setWhatsNextYCoord] = useState<number>(0);
    const scrollViewRef = useRef<null | ScrollView>(null);

    return (
        <>
            <GestureHandlerRootView>
                <AppNavigator />
            </GestureHandlerRootView>
        </>
    );
};

export default App;
