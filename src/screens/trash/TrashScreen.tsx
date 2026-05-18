import { Text, View } from 'react-native';
import {trashStyles} from "./TrashScreen.styles";
import TrashList from "../../components/trash/TrashList";
import { useTheme } from '../../context/ThemeContext';

export default function TrashScreen() {
    const { themeColors } = useTheme();
    return (
        <View style={[trashStyles.container, { backgroundColor: themeColors.primaryColor }]}>
            <View style={trashStyles.screenTitleContainer}>
                <Text style={[trashStyles.screenTitle, { color: themeColors.textPrimaryColor }]}>Book Cemetery</Text>
                <Text style={[trashStyles.screenDescription, { color: themeColors.textPrimaryColor }]}>
                    Items in the Book Cemetery will be permanently deleted after 30 days.
                    You can restore them or delete them manually now.
                </Text>
            </View>
            <View style={trashStyles.trashListContainer}>
                <TrashList />
            </View>
        </View>
    );
}
