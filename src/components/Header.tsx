import React from 'react';
import { Text, StyleSheet, Image, Platform, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getIcon } from '../utils/IconParser';
import {getColor} from "../utils/ColorsParser";

export default function Header() {
    return (
        <SafeAreaView style={stylesHeader.container} edges={['top']}>
            <View style={stylesHeader.contentWrapper}>
                <Image source={getIcon('headerIcon')} style={stylesHeader.logo} />
                <Text style={stylesHeader.title}>LibroFlow</Text>
            </View>
        </SafeAreaView>
    );
}

const stylesHeader = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! - 10 : 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: getColor('secondColor'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    contentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginRight: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6A28B0',
    },
});
