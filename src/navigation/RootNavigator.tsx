import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import Header from '../components/Header';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                header: () => <Header />,
            }}
        >
            <Stack.Screen name="Main" component={BottomTabs} />
        </Stack.Navigator>
    );
}