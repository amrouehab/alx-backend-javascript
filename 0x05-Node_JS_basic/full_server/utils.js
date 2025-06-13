import fs from 'fs';

const readDatabase = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const studentLines = lines.slice(1);

    const studentGroups = {};
    for (const line of studentLines) {
      if (line) {
        const studentData = line.split(',');
        const field = studentData[3];
        const firstname = studentData[0];
        if (field) {
          if (!studentGroups[field]) {
            studentGroups[field] = [];
          }
          studentGroups[field].push(firstname);
        }
      }
    }
    resolve(studentGroups);
  });
});

export default readDatabase;
