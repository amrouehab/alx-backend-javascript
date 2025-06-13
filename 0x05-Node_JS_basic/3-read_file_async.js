const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n').filter(line => line);
      const students = lines.slice(1).map(line => line.split(','));

      console.log(`Number of students: ${students.length}`);

      const fields = {};
      for (const student of students) {
        const field = student[3];
        if (!fields[field]) fields[field] = [];
        fields[field].push(student[0]);
      }

      for (const field in fields) {
        const list = fields[field];
        console.log(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
      }
      resolve();
    });
  });
}

module.exports = countStudents;

