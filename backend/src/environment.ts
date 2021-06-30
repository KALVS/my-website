/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
 import dotenv from 'dotenv';
 dotenv.config();

 
 export const PORT = process.env.PORT;

 // COMPUTED VALUES
 export const NODE_ENV = process.env.NODE_ENV;
 export const IS_PROD = NODE_ENV === 'production';