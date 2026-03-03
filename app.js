// Import the express module
import express from 'express';

// Import MySQL
import mysql2 from 'mysql2';

// Import dotenv
import dotenv from 'dotenv';

// Configuring dotenv to load .env variables
dotenv.config();


// Create an instance of an Express application
const app = express();

// Define the port number where our server will listen
const PORT = 3000;

// Enable static file serving
app.use(express.static('public'));

//Allow express to read form data
app.use(express.urlencoded({ extended: true }));

// EJS view engine
app.set('view engine', 'ejs');

// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {
  res.render('home');
});

// Contact route
app.get('/contact-us', (req, res) => {
  res.render('contact');
});


// Admin route
app.get('/admin', async(req, res) => {

  //Read all orders from the database
  // Newest first
  const orders = await pool.query('SELECT * FROM orders ORDER BY timestamp DESC');
  res.render('admin', { orders: orders[0] });
});

// Submit order route
app.post('/submit-order', async (req, res) => {
  
  const order = req.body;
  // Create an array to store order data
  const params = [
    order.fname,
    order.lname,
    order.email,
    order.method,
    order.size,
    Array.isArray(order.toppings) ? order.toppings.join(', ') : "none"
];
  const sql = `INSERT INTO  orders (fname, lname, email, method, size, toppings) VALUES (?, ?, ?, ?, ?, ?)`;
  const result = await pool.execute(sql, params);

  res.render('confirmation', { order });

});

// Create a pool (bucket) of database connections
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306
}).promise();

// Database test route
app.get('/db-test', async(req, res) => {

    try {
        const pizza_orders = await pool.query('SELECT * FROM orders');
        res.send(pizza_orders[0]);
    } catch(err) {
        console.error('Database error: ', err);
    }
});

// Start the server and listen on the specified port 
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}); 
