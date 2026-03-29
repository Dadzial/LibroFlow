import Book from '../models/all-books.model'
import { GoogleBooksAPI } from '../utils/google-books-connect'
import logger from "../utils/logger";

export const AllBooksService = {

    seed: async () => {
        const existing = await Book.countDocuments()
        if (existing > 0) return

        const queries = ['bestsellers', 'fiction', 'science', 'history', 'fantasy', 'biography']

        for (const query of queries) {
            const books = await GoogleBooksAPI.search(query)
            await Book.insertMany(books)
        }

        logger.info('Database seeded successfully')
    },

    getAll: (status?: string) => Book.find(status ? { status } : {})
}