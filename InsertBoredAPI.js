const axios = require('axios');
const mysql = require('mysql');

// create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
});

// make API request and insert data into MySQL
function insertData() {
  axios.get('http://www.boredapi.com/api/activity')
    .then(response => {
      const activity = response.data.activity;
      const type = response.data.type;
      const participants = response.data.participants;
      const price = response.data.price;
      const link = response.data.link;
      const key = response.data.key;
      const accessibility = response.data.accessibility;
      const create_date = new Date().toISOString().slice(0, 19).replace('T', ' ');

      const sql = 'INSERT INTO activities (activity, type, participants, price, link, key, accessibility, create_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      const values = [activity, type, participants, price, link, key, accessibility, create_date];

      connection.query(sql, values, function (error, results, fields) {
        if (error) throw error;
        console.log(`Inserted activity: ${activity}`);
      });
    })
    .catch(error => {
      console.log(error);
    });
}

// run insertData() every minute
setInterval(insertData, 60 * 1000);
