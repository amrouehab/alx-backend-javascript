const readDatabase = require('../utils/readDatabase');

class StudentsController {
  static getAllStudents(req, res) {
    const path = process.argv[2];
    readDatabase(path)
      .then((fields) => {
        let response = 'This is the list of our students\n';
        for (const [field, students] of Object.entries(fields).sort()) {
          response += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
        }
        res.status(200).send(response.trim());
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(req, res) {
    const path = process.argv[2];
    const { major } = req.params;

    if (!['CS', 'SWE'].includes(major)) {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    readDatabase(path)
      .then((fields) => {
        const students = fields[major];
        res.status(200).send(`List: ${students.join(', ')}`);
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }
}

module.exports = StudentsController;

