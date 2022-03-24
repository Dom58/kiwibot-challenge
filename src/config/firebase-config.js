import dotenv from 'dotenv';
import  assert from 'assert';

dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  DATABASE_URL,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID
} = process.env

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

export default {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  firebaseConfig: {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    databaseURL: DATABASE_URL,
    storageBucket:STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
  }
}
