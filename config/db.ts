import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { sendSlackMessage } from '../utils/slack';

dotenv.config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error('MONGO_URI is not defined in .env file');
        }
        console.log('TRYING TO CONNECT DB .....');

        await mongoose.connect(mongoURI);
        
        console.log('MongoDB connected successfully');
        
        await sendSlackMessage('UMIT DB BAGLANDI');
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('MongoDB connection failed:', error.message);
            try {
                await sendSlackMessage(`MongoDB connection failed: ${error.message}`);
            } catch (slackError) {
                console.error('Failed to send Slack message:', slackError);
            }
        } else {
            console.error('MongoDB connection failed with an unknown error:', error);
        }
    }
};

export default connectDB;
