import mongoose from 'mongoose';
import { config } from './config';
import  logger  from './utils/logger';
import {AllBooksService} from "./services/books.services";

export const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(config.databaseUrl);
        logger.info('Connection with database established')
        await AllBooksService.seed()
    } catch (error) {
        logger.error('Error connecting to MongoDB:', error);
    }

    mongoose.connection.on('error', (error) => {
        logger.info('MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
        logger.info('MongoDB disconnected');
    });

    process.on('SIGINT', async () => {
        await mongoose.connection.close();
        logger.info('MongoDB connection closed due to app termination');
        process.exit(0);
    });

    process.on('SIGTERM', async () => {
        await mongoose.connection.close();
        logger.info('MongoDB connection closed due to app termination');
        process.exit(0);
    });
};