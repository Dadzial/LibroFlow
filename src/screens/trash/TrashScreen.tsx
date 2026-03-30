import { Text, View } from 'react-native';
import {trashStyles} from "./TrashScreen.styles";
import TrashList from "../../components/TrashList";

export default function TrashScreen() {
    return (
        <View style={trashStyles.container}>
            <View style={trashStyles.screenTitleContainer}>
                <Text style={trashStyles.screenTitle}>Trash</Text>
                <Text style={trashStyles.screenDescription}>
                    Items in the trash will be permanently deleted after 30 days.
                    You can restore them or delete them manually now.
                </Text>
            </View>
            <View style={trashStyles.trashListContainer}>
                <TrashList />
            </View>
        </View>
    );
}
