import Book from '../models/books.model.js'
import { GoogleBooksAPI } from '../utils/google-books-connect.js'
import logger from "../utils/logger.js";

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

    getAll: (status?: string) => Book.find(status ? { status } : {}),
    search: (title: string) => Book.find({title: { $regex: title, $options: 'i' }}).limit(20)
}