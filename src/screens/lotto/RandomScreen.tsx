import { Text, View } from 'react-native';
import {randomStyles} from "./RandomScreen.styles";


export default function RandomScreen() {
    return (
        <View style={randomStyles.container}>
            <View style={randomStyles.screenTitleContainer}>
                <Text style={randomStyles.screenTitle}>The Book Lottery</Text>
                <Text style={randomStyles.screenDescription}>
                    Can't decide what to read next? Let destiny choose your next grand adventure.
                </Text>
            </View>
        </View>
    );
}
