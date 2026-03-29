import express from 'express'
import cors from 'cors'
import { connectToDatabase } from './db-adapter';
import logger from './utils/logger';
import {getAllBooks} from "./routes/all-books.routes";

const app = express();
app.use(cors());
app.use(express.json());

//Here will be routes
app.get('/api/books/all', getAllBooks)

connectToDatabase().then(() => {
    app.listen(3000, () => {
        logger.info('Server is running on port 3000')
    })
})