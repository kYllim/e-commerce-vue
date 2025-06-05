// Fichier: src/config/database.js
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // Ne pas se connecter si déjà connecté ou en mode test
    if (mongoose.connection.readyState !== 0 || process.env.NODE_ENV === 'test') {
      console.log('MongoDB déjà connecté ou en mode test');
      return;
    }

<<<<<<< HEAD
    const conn = await mongoose.connect(process.env.MONGODB_URI_PRODUCT);
=======
    const conn = await mongoose.connect(process.env.MONGODB_URI);
>>>>>>> c9b522fbc5c7659e2358b72894c70c3a0983b72c
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Ne pas quitter le processus, mais réessayer
    setTimeout(connectDB, 5000);
  }
};
