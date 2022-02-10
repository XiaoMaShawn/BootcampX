const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.connect(() => {
  console.log('Connected to the database!');
});

const queryString = `
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers 
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = $1
ORDER BY teacher;
`
const value = [process.argv[2]]

pool.query(queryString, value).then(res => {
  res.rows.forEach(teacher => {
    console.log(`${teacher.cohort}:${teacher.teacher}`);
  })
}).catch(e => {
  console.log('error', e);
});