import dotenv from 'dotenv';
dotenv.config();


  export const JWT_SECRET = process.env.JWT_SECRET;
  export const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;
  export const DB_URI = 'mongodb+srv://admin-Rishabh:test123@cluster0.jpn1sz9.mongodb.net/courses';
  export const JWT_SECRET_SUPER = 'SuperMac'