import dotenv from 'dotenv';
dotenv.config();

export const config =  {
    PORT: 3000,
    databaseUrl: process.env.DATABASE_URL as string
}