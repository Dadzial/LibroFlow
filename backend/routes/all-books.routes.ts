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
export const search = async (req: any, res: any) => {
    try {
        const {title} = req.query
        if (!title) {
            return res.status(400).json({ error: 'No title found' })
        }
        const books = await AllBooksService.search(title);
        logger.info('Books fetched successfully')
        res.json(books)
    }catch(err) {
        logger.error('Failed to fetch books', err)
        res.status(500).json({ error: 'Failed to fetch books' })
    }
}