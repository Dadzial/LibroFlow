import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Book {
    id: string | number;
    title: string;
    author: string;
    cover: string;
    pageCount?: number;
    language?: string;
    description?: string;
    progress?: number;
    rating?: number;
    note?: string;
    updatedAt?: string;
}

export interface BookReview {
    book: Book;
    rating: number;
    note: string;
    updatedAt: string;
}

export interface BooksContextType {
    libraryBooks: Book[];
    favoriteBooks: Book[];
    toReadBooks: Book[];
    trashBooks: Book[];
    ratedBooks: Book[];
    currentlyReadingBook: Book | null;
    readingTime: number;
    isReading: boolean;
    addBookToLibrary: (book: Book) => void;
    removeBookFromLibrary: (bookId: string | number) => void;
    toggleFavorite: (bookId: string | number) => void;
    toggleToRead: (bookId: string | number) => void;
    restoreFromTrash: (bookId: string | number) => void;
    permanentDeleteFromTrash: (bookId: string | number) => void;
    clearTrash: () => void;
    setCurrentlyReadingBook: (book: Book | null) => void;
    setIsReading: (isReading: boolean) => void;
    getBookReview: (bookId: string | number) => BookReview | null;
    saveBookReview: (book: Book, rating: number, note: string) => void;
    clearBookReview: (bookId: string | number) => void;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export function BooksProvider({ children }: { children: ReactNode }) {
    const [libraryBooks, setLibraryBooks] = useState<Book[]>([]);
    const [trashBooks, setTrashBooks] = useState<Book[]>([]);
    const [favoriteIds, setFavoriteIds] = useState<(string | number)[]>([]);
    const [toReadIds, setToReadIds] = useState<(string | number)[]>([]);
    const [bookReviewsById, setBookReviewsById] = useState<Record<string, BookReview>>({});
    const [currentlyReadingBook, setCurrentlyReadingBook] = useState<Book | null>(null);
    const [readingTime, setReadingTime] = useState(0);
    const [isReading, setIsReading] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isReading) {
            interval = setInterval(() => {
                setReadingTime((prev) => prev + 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isReading]);

    const addBookToLibrary = (book: Book) => {
        setLibraryBooks((prev) => {
            const exists = prev.find((b) => b.id === book.id || b.title === book.title);
            if (exists) return prev;
            return [...prev, book];
        });
    };

    const removeBookFromLibrary = (bookId: string | number) => {
        const bookToRemove = libraryBooks.find(b => b.id === bookId);
        if (bookToRemove) {
            setLibraryBooks((prev) => prev.filter((b) => b.id !== bookId));
            setFavoriteIds((prev) => prev.filter((id) => id !== bookId));
            setToReadIds((prev) => prev.filter((id) => id !== bookId));
            if (currentlyReadingBook?.id === bookId) {
                setCurrentlyReadingBook(null);
                setIsReading(false);
            }
            setTrashBooks((prev) => [...prev, bookToRemove]);
        }
    };

    const restoreFromTrash = (bookId: string | number) => {
        const bookToRestore = trashBooks.find(b => b.id === bookId);
        if (bookToRestore) {
            setTrashBooks((prev) => prev.filter(b => b.id !== bookId));
            setLibraryBooks((prev) => [...prev, bookToRestore]);
        }
    };

    const permanentDeleteFromTrash = (bookId: string | number) => {
        setTrashBooks((prev) => prev.filter(b => b.id !== bookId));
    };

    const clearTrash = () => {
        setTrashBooks([]);
    };

    const toggleFavorite = (bookId: string | number) => {
        setFavoriteIds((prev) => 
            prev.includes(bookId) 
                ? prev.filter(id => id !== bookId) 
                : [...prev, bookId]
        );
    };

    const toggleToRead = (bookId: string | number) => {
        setToReadIds((prev) => 
            prev.includes(bookId) 
                ? prev.filter(id => id !== bookId) 
                : [...prev, bookId]
        );
    };

    const saveBookReview = (book: Book, rating: number, note: string) => {
        const updatedAt = new Date().toISOString();

        setBookReviewsById((prev) => ({
            ...prev,
            [String(book.id)]: {
                book: {
                    ...book,
                    rating,
                    note,
                    updatedAt,
                },
                rating,
                note,
                updatedAt,
            },
        }));
    };

    const getBookReview = (bookId: string | number) => bookReviewsById[String(bookId)] ?? null;

    const clearBookReview = (bookId: string | number) => {
        setBookReviewsById((prev) => {
            const updated = { ...prev };
            delete updated[String(bookId)];
            return updated;
        });
    };

    const favoriteBooks = libraryBooks.filter(book => {
        const isFavorite = favoriteIds.includes(book.id);
        const hasRating5 = Object.values(bookReviewsById).some(review => review.book.id === book.id && review.rating === 5);
        return isFavorite || hasRating5;
    });
    const toReadBooks = libraryBooks.filter(book => toReadIds.includes(book.id));
    const ratedBooks = Object.values(bookReviewsById)
        .map((review) => review.book)
        .sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));

    return (
        <BooksContext.Provider value={{ 
             libraryBooks,
             favoriteBooks,
             toReadBooks,
             trashBooks,
             ratedBooks,
             currentlyReadingBook,
             readingTime,
             isReading,
             addBookToLibrary,
             removeBookFromLibrary,
             toggleFavorite,
             toggleToRead,
             restoreFromTrash,
             permanentDeleteFromTrash,
             clearTrash,
             setCurrentlyReadingBook,
             setIsReading,
             getBookReview,
             saveBookReview,
             clearBookReview,
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
