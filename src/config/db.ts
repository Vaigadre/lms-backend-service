import * as mongoose from 'mongoose';
import { config } from './config';

export async function connectToDB() {
    console.log('Connecting to DB.');
    await mongoose.connect(config.mongoDBURI);
    console.log('Connected to DB.');
}



