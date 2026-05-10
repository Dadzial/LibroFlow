import React, { useEffect } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { splashStyles } from './SplashScreen.styles';

type SplashNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

export default function SplashScreen() {
    const navigation = useNavigation<SplashNavigationProp>();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Main');
        }, 4000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={splashStyles.container}>
            <Image
                source={require('../../../assets/splash-icon.png')}
                style={splashStyles.logo}
                resizeMode="contain"
            />
            <Text style={splashStyles.title}>Reading Journal</Text>
            <ActivityIndicator
                size="large"
                color="#6A28B0"
                style={splashStyles.loader}
            />
        </View>
    );
}
