const express = require('express');
const authRoute = require('./routes/auth.route')
const mongoDB = require('./db/db')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoute)
mongoDB();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))





module.exports = app;