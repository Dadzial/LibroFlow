import { FlatList ,View} from "react-native";
import BookPreview from "./BookPreview";

const data = Array(6).fill({});

export default function AllBooks() {
    return (
        <View style={{ alignItems: 'center', width: '100%' }}>
            <FlatList
                data={data}
                numColumns={3}
                scrollEnabled={false}
                keyExtractor={(_, i) => i.toString()}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 10,
                    marginBottom: 25
                }}
                contentContainerStyle={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                }}
                renderItem={() => <BookPreview />}
            />
        </View>
    );
}