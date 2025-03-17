const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const config = require('./config');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
};
app.use(cors(corsOptions));
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(config.db.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

app.use('/', routes); 

app.listen(port, () => {
  console.log(`Library Management System backend listening on port ${port}`);
});