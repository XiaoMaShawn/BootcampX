SELECT name,email,id,cohort_id
FROM students
WHERE phone IS NULL AND email != '*@gmail.com';