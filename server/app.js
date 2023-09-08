const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api.routes');

// environment setting
require('dotenv').config();

// Database setting
require('./config/database');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', apiRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});