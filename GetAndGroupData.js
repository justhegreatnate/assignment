const mysql = require('mysql');
const fs = require('fs');
const util = require('util');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

// Output to CSV file
const csvWriter = createCsvWriter({
  path: 'report.csv',
  header: [
    {id: 'type', title: 'Type'},
    {id: 'max_price', title: 'Max Price'},
    {id: 'avg_price', title: 'Average Price'},
    {id: 'total_participants', title: 'Total Participants'}
  ]
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Run MySQL query to group data by type and calculate max price, average price, and total participants
const query = 'SELECT type, MAX(price) AS max_price, AVG(price) AS avg_price, SUM(participants) AS total_participants FROM activities GROUP BY type';

connection.query(query, (err, results) => {
  if (err) throw err;

  console.log('Report:', results);

  // Write the report to the output CSV file
  csvWriter.writeRecords(results)
    .then(() => {
      console.log('Report exported to CSV file!');
    })
    .catch((err) => {
      console.error('Error exporting report to CSV file:', err);
    });

  // Close the MySQL connection
  connection.end((err) => {
    if (err) throw err;
    console.log('MySQL connection closed!');
  });
});
