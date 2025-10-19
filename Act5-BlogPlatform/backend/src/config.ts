// backend/src/config.ts
export const config = {
  PORT: 3000,
  MONGO_URI: 'mongodb://localhost:27017/blogdb',
  JWT_SECRET: 'supersecretkey123',
  JWT_EXPIRES_IN: '3600s',
};
