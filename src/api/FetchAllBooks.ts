import { API_BASE_URL } from "../utils/config";

interface Book {
    googleId: string;
    title: string;
    author: string;
    cover: string;
}

export const fetchAllBooks = async (status: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/books/all?status=${status}`);

        if (!response.ok) {
            throw new Error(`Error fetching books: ${response.statusText}`);
        }

        const data = await response.json();
        return data as Book[];
    } catch (error) {
        console.error("Failed to fetch books:", error);
        throw error;
    }
};
