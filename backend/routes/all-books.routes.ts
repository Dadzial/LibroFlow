import logger from '../utils/logger'
import {AllBooksService} from "../services/all-books.services";

export const getAllBooks = async (req: any, res: any) => {
    try {
        const { status } = req.query
        const books = await AllBooksService.getAll(status)
        logger.info('Books fetched successfully')
        res.json(books)
    } catch (err) {
        logger.error('Failed to fetch books', err)
        res.status(500).json({ error: 'Failed to fetch books' })
    }
}