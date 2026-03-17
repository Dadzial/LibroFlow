import dotenv from 'dotenv';
dotenv.config();

export const config =  {
    PORT: 3000,
    databaseUrl: process.env.DATABASE_URL as string,
    googlApiKey: process.env.GOOGLE_BOOKS_API_KEY as string,
    googleBooksUrl:process.env.GOOGLE_BOOKS_URL as string
}