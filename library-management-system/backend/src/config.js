const config = {
  db: {
    host: 'localhost',
    port: 27017,
    database: 'library_management_system',
    user: 'prajna07up',
    password: 'FDEU4iiAhu9lqTL6',
    databaseUrl: 'mongodb+srv://prajna07up:FDEU4iiAhu9lqTL6@cluster0.ryzow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  },
  server: {
    port: 3000
  },
  jwtSecret: 'your_jwt_secret',
  apiUrl: '/api/v1',
  environment: process.env.NODE_ENV || 'development'
};

module.exports = config;