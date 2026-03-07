import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import {lottoStyles} from "./LottoScreen.styles";

export default function LottoScreen() {
    return (
        <View style={lottoStyles.container}>
            <Text>This is lotto!</Text>
            <StatusBar style="auto" />
        </View>
    );
}
