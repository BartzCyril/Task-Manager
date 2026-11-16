function createServer () {
    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const session = require('express-session');
    const dotenv = require('dotenv');
    const cookieParser = require('cookie-parser');
    const cors = require('cors');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors({credentials: true, origin: process.env.FRONT_ORIGIN || "http://localhost:5173"}));
    dotenv.config();
    app.use(session({
        secret: process.env.SESSION_SECRET,
        name: "session",
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        }
    }));
    app.use(cookieParser(process.env.COOKIE_SECRET));

    // Routes
    const authRoutes = require('./routes/auth');
    const taskRoutes = require('./routes/tasks');
    const adminRoutes = require('./routes/admin');

    app.use('/api/auth', authRoutes);
    app.use('/api/todos', taskRoutes);
    app.use('/api/admin', adminRoutes)

    // Serve the built front (front/dist) when present; SPA fallback for client routes
    const path = require('path');
    const dist = path.join(__dirname, 'front', 'dist');
    app.use(express.static(dist));
    app.get('*', (req, res, next) => process.env.NODE_ENV === 'test' ? next() : res.sendFile(path.join(dist, 'index.html')));

    return app;
}

module.exports = { createServer };