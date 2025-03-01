import mongoose from 'mongoose';

const dbConnect = async () => {
  // get default connection
  const db = mongoose.connection;

  db.on('error', () => {
    console.error(`Error while connecting to Mongo DB ${err.message}`);
  });
  db.once('open', () => {
    console.info('Connected to Mongo DB 👍');
  });

  await mongoose.connect(process.env.MONGO_URI);
};

export default dbConnect;