require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts')

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static('public')); // CSS / Images / JS

// Template Engine
app.use(expressLayout);
app.set('layout', './layouts/main'); // Common interface for all pages in the app
app.set('view engine', 'ejs');


app.use('/', require('./server/routes/main'))

app.listen(PORT, () => {
    console.log(`App listen on PORT ${PORT}`)
})