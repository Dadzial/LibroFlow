import { View, Text, Image, ViewStyle } from "react-native";

type BookPreviewProps = {
    style?: ViewStyle;
};

export default function BookPreview({ style }: BookPreviewProps = {}) {
    return (
        <View style={[{ marginRight: 15 }, style]}>
            <Image
                source={{ uri: 'https://ecsmedia.pl/cdn-cgi/image/format=webp,/c/metro-2033-b-iext199579459.jpg' }}
                style={{
                    width: 100,
                    height: 150,
                    borderRadius: 10,
                }}
            />
            <Text numberOfLines={1} style={{ width: 100 }}>
                Metro 2033
            </Text>
            <Text style={{ fontSize: 12, color: 'gray' }}>
                Dmitri Glukhovski
            </Text>
        </View>
    );
}
