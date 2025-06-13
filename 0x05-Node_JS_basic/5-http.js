const http = require('http');
const countStudents = require('./3-read_file_async');

const app = http.createServer((req, res) => {
  const { url } = req;
  res.setHeader('Content-Type', 'text/plain');

  if (url === '/') {
    res.end('Hello ALX!');
  } else if (url === '/students') {
    countStudents(process.argv[2])
      .then(() => {
        res.end();
      })
      .catch((err) => {
        res.statusCode = 500;
        res.end(err.message);
      });
  }
});

app.listen(1245);

module.exports = app;

