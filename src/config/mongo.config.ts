export default {
  uri: `mongodb://${process.env.MONGO_HOST || 'localhost'}:${process.env.MONGO_PORT || '27017'}`,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
  db_name: process.env.MONGO_DB_NAME,
};
