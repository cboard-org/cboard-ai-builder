import _mongoose, { connect } from 'mongoose';

declare global {
  // This must be a var and not a let / const
  //eslint-disable-next-line
  var mongoose: {
    promise: ReturnType<typeof connect> | null;
    conn: typeof _mongoose | null;
  };
}

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL || MONGO_URL.length === 0) {
  //TODO commented line to prevent build error
  //throw new Error('Please add your MongoDB URI to .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log('🚀 Using cached connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = connect(MONGO_URL!, opts)
      .then((mongoose) => {
        console.log('✅ New connection established');
        return mongoose;
      })
      .catch((error) => {
        console.error('❌ Connection to database failed');
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
