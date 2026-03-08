import React from 'react';
import { Text, StyleSheet, Image, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getIcon } from '../utils/IconParser';

export default function Header() {
    return (
        <SafeAreaView style={stylesHeader.container} edges={['top']}>
            <Image source={getIcon('headerIcon')} style={stylesHeader.logo} />
            <Text style={stylesHeader.title}>LibroFlow</Text>
        </SafeAreaView>
    );
}

const stylesHeader = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! -10 : 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginBottom: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6A28B0',
    },
});