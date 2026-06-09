import React from 'react';
import { Text, StyleSheet, Image, Platform, StatusBar, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getIcon } from '../../utils/IconParser';
import { Colors } from '../../utils/ColorsParser';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
    const { isDark, toggleTheme, themeColors } = useTheme();

    return (
        <SafeAreaView style={[stylesHeader.container, { backgroundColor: themeColors.secondColor }]} edges={['top']}>
            <View style={stylesHeader.contentWrapper}>
                <View style={stylesHeader.leftSection}>
                    <Image source={getIcon('headerIcon')} style={stylesHeader.logo} />
                    <Text style={[stylesHeader.title, { color: themeColors.accent }]}>My Reading Journal</Text>
                </View>
                <TouchableOpacity onPress={toggleTheme} style={stylesHeader.themeButton}>
                    <Ionicons
                        name={isDark ? "sunny" : "moon"}
                        size={24}
                        color={themeColors.accent}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const stylesHeader = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! - 10 : 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    contentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
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
    },
    themeButton: {
        padding: 8,
    },
});
