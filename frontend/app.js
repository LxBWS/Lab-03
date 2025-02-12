const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();
const port = 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


