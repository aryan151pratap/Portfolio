const express = require('express');
const cors = require('cors');
const connectDB = require('./db.js');
const cookieParser = require('cookie-parser');
const Sign_up = require('./routes/login.js');
const Remember = require('./routes/remember.js');
const Project = require('./routes/project.js');
const Certificate = require('./routes/certificate_save.js');
const Wallet = require('./routes/skill.js');
const Mail = require('./routes/email.js');
const audio = require('./routes/audio.js');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const app = express();

connectDB();
console.log(FRONTEND_URL);

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/auth', Sign_up);
app.use('/remember', Remember);
app.use('/projects', Project);
app.use('/certificate', Certificate);
app.use('/wallet', Wallet);
app.use('/password', Mail);
app.use('/audio', audio);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
