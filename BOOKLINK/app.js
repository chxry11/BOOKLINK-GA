const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
 
// Database connection
const db = mysql.createConnection({
  host: 'localhost',          // Your MySQL server host (usually 'localhost' for local development)
  user: 'root',                // Your MySQL username
  password: 'Republic_C207',// Your MySQL password
  database: 'c372_gradedassignment'// Your database name
});
 
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});
 
// Route to show item reviews
app.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, products) => {
      if (err) throw err;
      db.query('SELECT * FROM reviews', (err, reviews) => {
        if (err) throw err;
        res.render('cart', { products, reviews });
      });
    });
  });
  

app.get('/cart', (req, res) => {
    db.query('SELECT * FROM products', (err, products) => {
      if (err) {
        console.error('Error fetching products:', err.message);
        return res.status(500).send('Internal Server Error');
      }
      res.render('cart', { products }); // Pass `items` data to `scart.ejs` if needed
    });
  });

  
  
 
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});