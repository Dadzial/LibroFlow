import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { StatusBar } from 'expo-status-bar';
import { BooksProvider } from './context/BooksContext';

export default function App() {
    return (
        <BooksProvider>
            <NavigationContainer>
                <StatusBar style="dark" />
                <RootNavigator />
            </NavigationContainer>
        </BooksProvider>
    );
}