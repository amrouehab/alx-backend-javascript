const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;
const databasePath = process.argv[2];

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const studentLines = lines.slice(1);

      const reportParts = [];
      reportParts.push(`Number of students: ${studentLines.length}`);

      const fields = {};
      for (const line of studentLines) {
        if (line) {
          const student = line.split(',');
          const field = student[3];
          const firstname = student[0];
          if (!fields[field]) {
            fields[field] = [];
          }
          fields[field].push(firstname);
        }
      }

      for (const field in fields) {
        if (Object.prototype.hasOwnProperty.call(fields, field)) {
          const list = fields[field].join(', ');
          reportParts.push(`Number of students in ${field}: ${fields[field].length}. List: ${list}`);
        }
      }
      resolve(reportParts.join('\n'));
    });
  });
}

app.get('/', (req, res) => {
  res.send('Hello ALX!');
});

app.get('/students', (req, res) => {
  countStudents(databasePath)
    .then((report) => {
      res.status(200).type('text/plain').send(`This is the list of our students\n${report}`);
    })
    .catch((error) => {
      res.status(200).type('text/plain').send(`This is the list of our students\n${error.message}`);
    });
});

app.listen(port);

module.exports = app;
