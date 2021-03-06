const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/key');
const app = express();
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 以毫秒为单位
        keys: [keys.cookieKey]
    })
)
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoUri);

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
