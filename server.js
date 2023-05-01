const express = require('express');
const path = require('path');
const api = require('./api/index.js');

const PORT = process.env.port || 3001;

const app = express();

// code to receive data
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api", api);


// code for static files & assets; goes into the 'public' folder
app.use(express.static('public'));

// GET Route for homepage; any "invalid" query also goes to homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route to notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route - any "invalid" query also goes to homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


// LISTEN - makes the website go live at PORT
app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);