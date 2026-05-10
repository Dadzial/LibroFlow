import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { StatusBar } from 'expo-status-bar';
import { BooksProvider } from './context/BooksContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
    const { isDark } = useTheme();
    return (
        <BooksProvider>
            <NavigationContainer>
                <StatusBar style={isDark ? "light" : "dark"} />
                <RootNavigator />
            </NavigationContainer>
        </BooksProvider>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}