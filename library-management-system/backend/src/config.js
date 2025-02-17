const config = {
  db: {
    host: 'localhost',
    port: 27017,
    database: 'library_management_system',
    user: 'your_username',
    password: 'your_password'
  },
  server: {
    port: 3000
  },
  jwtSecret: 'your_jwt_secret',
  apiUrl: '/api/v1',
  environment: process.env.NODE_ENV || 'development'
};

module.exports = config;