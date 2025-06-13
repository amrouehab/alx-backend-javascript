const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello ALX!');
});

app.get('/students', async (req, res) => {
  try {
    await countStudents(process.argv[2]);
    res.end();
  } catch (err) {
    res.status(500).send('Cannot load the database');
  }
});

app.listen(1245);

module.exports = app;

