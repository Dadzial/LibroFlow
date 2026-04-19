import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Book {
    id: string | number;
    title: string;
    author: string;
    cover: string;
    pageCount?: number;
    language?: string;
    description?: string;
}

export interface BooksContextType {
    libraryBooks: Book[];
    favoriteBooks: Book[];
    addBookToLibrary: (book: Book) => void;
    removeBookFromLibrary: (bookId: string | number) => void;
    toggleFavorite: (bookId: string | number) => void;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export function BooksProvider({ children }: { children: ReactNode }) {
    const [libraryBooks, setLibraryBooks] = useState<Book[]>([]);
    const [favoriteIds, setFavoriteIds] = useState<(string | number)[]>([]);

    const addBookToLibrary = (book: Book) => {
        setLibraryBooks((prev) => {
            const exists = prev.find((b) => b.id === book.id || b.title === book.title);
            if (exists) return prev;
            return [...prev, book];
        });
    };

    const removeBookFromLibrary = (bookId: string | number) => {
        setLibraryBooks((prev) => prev.filter((b) => b.id !== bookId));
        setFavoriteIds((prev) => prev.filter((id) => id !== bookId));
    };

    const toggleFavorite = (bookId: string | number) => {
        setFavoriteIds((prev) => 
            prev.includes(bookId) 
                ? prev.filter(id => id !== bookId) 
                : [...prev, bookId]
        );
    };

    const favoriteBooks = libraryBooks.filter(book => favoriteIds.includes(book.id));

    return (
        <BooksContext.Provider value={{ 
            libraryBooks, 
            favoriteBooks, 
            addBookToLibrary, 
            removeBookFromLibrary, 
            toggleFavorite 
        }}>
            {children}
        </BooksContext.Provider>
    );
}

export function useBooks(): BooksContextType {
    const context = useContext(BooksContext);
    if (context === undefined) {
        throw new Error('useBooks must be used within a BooksProvider');
    }
    return context;
}
