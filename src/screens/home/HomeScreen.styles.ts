import { StyleSheet } from "react-native";
import {getColor} from "../../utils/ColorsParser";

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 16,
        paddingTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: getColor('textPrimaryColor'),
    },
});
