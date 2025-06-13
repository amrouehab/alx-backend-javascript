const http = require('http');
const fs = require('fs');

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

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello ALX!');
  } else if (req.url === '/students') {
    res.statusCode = 200;
    res.write('This is the list of our students\n');
    countStudents(databasePath)
      .then((report) => {
        res.end(report);
      })
      .catch((error) => {
        res.end(error.message);
      });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const PORT = 1245;
app.listen(PORT);

module.exports = app;
