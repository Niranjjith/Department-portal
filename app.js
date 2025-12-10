// app.js
require('dotenv').config(); // load .env for local dev

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');

const app = express();

// ----------------- Connect MongoDB -----------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err.message));

// ----------------- Middleware ----------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ----------------- Sessions ------------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// ----------------- Routes --------------------------
const authRoutes = require('./routes/auth'); 
app.use('/', authRoutes);

const uploadNoteRoutes = require('./routes/uploadNote');
app.use('/', uploadNoteRoutes);

const studentRoutes = require('./routes/student');
app.use('/student', studentRoutes);

const noticeRoutes = require('./routes/Notice');
app.use('/', noticeRoutes);

const messageRoutes = require('./routes/messages');
app.use('/', messageRoutes);

const guideRoute = require('./routes/guide');
app.use('/guide', guideRoute);

app.get('/guide', (req, res) => res.render('guide'));

// Export for Vercel and server.js
module.exports = app;
