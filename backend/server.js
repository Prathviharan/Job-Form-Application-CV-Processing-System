const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const applicationRoutes = require('./routes/applicationRoutes');
const cors = require('cors');

require('dotenv').config();
//console.log(process.env.AZURE_STORAGE_CONNECTION_STRING); // Check the output

connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', applicationRoutes);


app.listen(5000, () => console.log('Server running on port 5000'));
