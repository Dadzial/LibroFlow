import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import Header from '../components/core/Header';
import BookDisplayScreen from "../screens/books-display/BookDisplayScreen";
import SplashScreen from '../screens/splash-screen/SplashScreen';

export type RootStackParamList = {
    Splash: undefined;
    Main: undefined;
    BookDisplay: { bookId: string };
    RateBook: { book: Book };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
                header: () => <Header />,
            }}
        >
            <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Main" component={BottomTabs} />
            <Stack.Screen name="BookDisplay" component={BookDisplayScreen} />
            <Stack.Screen name="RateBook" component={RateBookScreen} />
        </Stack.Navigator>
    );
}
