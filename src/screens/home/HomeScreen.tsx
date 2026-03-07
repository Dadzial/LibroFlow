import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import {homeStyles} from './HomeScreen.styles'

export default function HomeScreen() {
    return (
        <View style={homeStyles.container}>
            <Text>This is home!</Text>
            <StatusBar style="auto" />
        </View>
    );
}
