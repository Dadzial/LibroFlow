import { View, Image, StyleSheet, Animated, Easing } from 'react-native';
import { useRef } from 'react';

export default function Dice({ animate }: any) {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    const spin = () => {
        rotateAnim.setValue(0);

        Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };

    if (animate) {
        spin();
    }

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.Image
                    source={require('../../../assets/draw.png')}
                style={[
                    styles.image,
                    { transform: [{ rotate }] },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#eee',
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignSelf: 'center',
        elevation: 4,
    },
    image: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },
});