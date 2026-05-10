import Book from '../models/books.model'
import { GoogleBooksAPI } from '../utils/google-books-connect'
import logger from "../utils/logger";

export const AllBooksService = {

    seed: async () => {
        const queries = [
            { term: 'subject:fantasy', label: 'Fantasy' },
            { term: 'subject:science fiction', label: 'Sci-Fi' },
            { term: 'subject:classics', label: 'Classics' },
            { term: 'subject:mystery', label: 'Mystery' },
            { term: 'subject:crime', label: 'Criminal' },
            { term: 'subject:horror', label: 'Horror' },
            { term: 'subject:romance', label: 'Romance' },
            { term: 'subject:history', label: 'Historical' }
        ]

        logger.info('Starting database seed with labeled categories...')
        let addedCount = 0;

        for (const q of queries) {
            try {
                const books = await GoogleBooksAPI.search(q.term)
                for (const bookData of books) {
                    // Ensure the label is in the categories array if not already there
                    if (!bookData.categories.map((c: string) => c.toLowerCase()).includes(q.label.toLowerCase())) {
                        bookData.categories.push(q.label);
                    }

                    const exists = await Book.findOne({ 
                        $or: [
                            { googleId: bookData.googleId },
                            { title: bookData.title, author: bookData.author }
                        ]
                    });
                    
                    if (!exists) {
                        await Book.create(bookData);
                        addedCount++;
                    } else {
                        await Book.updateOne(
                            { _id: exists._id },
                            { $addToSet: { categories: q.label } }
                        );
                    }
                }
            } catch (err) {
                logger.error(`Failed to seed query: ${q.term}`, err);
            }
        }

        logger.info(`Database seeding completed. Added ${addedCount} new books.`);
    },

    getAll: (status?: string, category?: string) => {
        let query: any = {};
        if (status && status !== 'none') query.status = status;
        if (category) {
            const categories = category.split(',');
            query.categories = { $in: categories.map(cat => new RegExp(cat, 'i')) };
        }
        return Book.find(query);
    },

    search: (title: string) => Book.find({title: { $regex: title, $options: 'i' }}).limit(20)
}