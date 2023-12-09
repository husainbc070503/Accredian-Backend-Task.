require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectToDB = require('./conn');
const ErrorMiddleware = require('./middleware/ErrorMiddleware');
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send("Hello World"));
app.use('/api/auth', require('./routes/Auth'));

app.use(ErrorMiddleware);
app.listen(port, () => console.log(`Server running on port ${port}`));
