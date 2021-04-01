import mongoose from 'mongoose';

export default async () => {
  const url = process.env.DB_URL || '';

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    const db = mongoose.connection;

    db.once('open', () => {
      console.log('⚡️[db]: mongodb connected successfully');
    });
  } catch (e) {
    console.error(`Couldn't connect to the database: ${e}`);
    process.exit(1);
  }
};
