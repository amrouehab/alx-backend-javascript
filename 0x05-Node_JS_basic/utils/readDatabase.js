const fs = require('fs');

function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n').filter(Boolean);
      const students = lines.slice(1).map(line => line.split(','));

      const fields = {};
      for (const student of students) {
        const field = student[3];
        if (!fields[field]) fields[field] = [];
        fields[field].push(student[0]);
      }

      resolve(fields);
    });
  });
}

module.exports = readDatabase;

