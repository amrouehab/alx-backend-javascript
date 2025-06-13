const fs = require('fs');

function countStudents(path) {
  try {
    const content = fs.readFileSync(path, 'utf-8').trim().split('\n').filter(line => line);
    const students = content.slice(1).map(line => line.split(','));

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
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;

