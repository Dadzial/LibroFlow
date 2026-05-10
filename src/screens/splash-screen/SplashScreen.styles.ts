import { StyleSheet } from 'react-native';
import { getColor } from '../../utils/ColorsParser';

export const splashStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: getColor('secondColor'),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    logo: {
        width: 180,
        height: 180,
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: getColor('accent'),
        letterSpacing: 0.5,
    },
    loader: {
        marginTop: 28,
    },
});
