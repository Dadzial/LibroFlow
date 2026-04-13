import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import Header from '../components/core/Header';
import BookDisplayScreen from "../screens/books-display/BookDisplayScreen";

export type RootStackParamList = {
    Main:undefined;
    BookDisplay: { bookId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                header: () => <Header />,
            }}
        >
            <Stack.Screen name="Main" component={BottomTabs} />
            <Stack.Screen name="BookDisplay" component={BookDisplayScreen} />
        </Stack.Navigator>
    );
}