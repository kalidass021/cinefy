import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI);
    console.info(`MongoDB connected 👍: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error while connecting to MongoDB ${error.message}`);
    process.exit(1); // exit process with failure (1), 0 for success
  }
};

export default connectDB;
