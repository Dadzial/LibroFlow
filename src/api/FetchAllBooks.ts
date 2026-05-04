import { API_BASE_URL } from "../utils/Config";

interface Book {
    googleId: string;
    title: string;
    author: string;
    cover: string;
    description: string;
    pageCount: number;
    language : string;
    categories?: string[];
    publishedDate?: string;
    createdAt?: string;
}

export const fetchAllBooks = async (status: string, categories?: string[] | null) => {
    try {
        let url = `${API_BASE_URL}/api/books/all?status=${status}`;
        if (categories && categories.length > 0) {
            url += `&category=${encodeURIComponent(categories.join(','))}`;
        }
        
        const response = await fetch(url);

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
