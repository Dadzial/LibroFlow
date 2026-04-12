import { FlatList } from "react-native";
import BookPreview from "./BookPreview";

const data = Array(12).fill({});

export default function AllBooks() {
    return (
        <FlatList
            data={data}
            numColumns={3}
            scrollEnabled={false}
            keyExtractor={(_, i) => i.toString()}
            columnWrapperStyle={{
                justifyContent: 'space-between',
                gap: 15,
                marginBottom: 25
            }}
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingVertical: 10,
            }}
            renderItem={() => <BookPreview style={{ marginRight: 0 }} />}
        />
    );
}