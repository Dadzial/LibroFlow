import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import {randomStyles} from "./RandomScreen.styles";

export default function RandomScreen() {
    return (
        <View style={randomStyles.container}>
            <Text>This is Random!</Text>
            <StatusBar style="auto" />
        </View>
    );
}
