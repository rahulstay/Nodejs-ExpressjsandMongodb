const express = require('express');
const app = express();

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(express.urlencoded({ extended: false }));

// GET route - load form
app.get('/', (req, res) => {
    res.render('form', { data: null });
});

// POST route - handle form submit
app.post('/submit', (req, res) => {
    const data = req.body;  // received form data
    res.render('form', { data });
    console.log(data)
});

// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
