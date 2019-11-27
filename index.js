const express = require('express');
const mongoose = require('mongoose');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/key');
const app = express();

mongoose.connect(keys.mongoUri);

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
