// Import the express module
import express from 'express';

// Import MySQL
import mysql2 from 'mysql2';


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

const orders = []; // Array to store orders in memory

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
app.get('/admin', (req, res) => {
  res.send(orders);
});

// Submit order route
app.post('/submit-order', (req, res) => {
  
  // Create JSON object to store order data
  const order = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    method: req.body.method,
    size: req.body.size,
    toppings: req.body.toppings ? req.body.toppings : "none",
    comment: req.body.comment ? req.body.comment : "none",
    timestamp: new Date()
  };
  orders.push(order);

  res.render('confirmation', { order: order });
});

// Create a pool (bucket) of database connections
const pool = mysql2.createPool({
    host: '***',
    user: '***',
    password: '***',
    database: 'pizza_db',
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
