const mongoose = require('mongoose');
const mongoDB_Url = process.env.MongoDB_Url;

// Connect to database
mongoose.connect(mongoDB_Url, {
    useNewUrlParser: true,
});

// Ensure connection
mongoose.connection.on('connected', () => {
    console.log('Connected to Database!');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting Database: ' + err);
});