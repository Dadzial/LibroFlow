import mongoose from 'mongoose';
import { config } from './config';
import  logger  from './utils/logger';

export const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(config.databaseUrl);
        console.log('Connection with database established');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }

    mongoose.connection.on('error', (error) => {
        console.error('MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
    });

    process.on('SIGINT', async () => {
        await mongoose.connection.close();
        console.log('MongoDB connection closed due to app termination');
        process.exit(0);
    });

    process.on('SIGTERM', async () => {
        await mongoose.connection.close();
        console.log('MongoDB connection closed due to app termination');
        process.exit(0);
    });
};