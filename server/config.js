import dotenv from 'dotenv';
dotenv.config();


  export const JWT_SECRET = process.env.JWT_SECRET;
  export const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;
  export const DB_URI = 'mongodb://localhost:27017/courses';
  export const JWT_SECRET_SUPER = 'SuperMac'
  