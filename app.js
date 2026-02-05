// Import the express module
import express from 'express';

// Create an instance of an Express application
const app = express();

// Define the port number where our server will listen
const PORT = 3000;

// Enable static file serving
app.use(express.static('public'));

//Allow express to read form data
app.use(express.urlencoded({ extended: true }));


// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/home.html`);
});

// Contact route
app.get('/contact-us', (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/contact.html`);
});

// Thank you route
app.get('/thank-you', (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

// Submit order route
app.post('/submit-order', (req, res) => {
  
  // Create JSON object to store order data
  const order = {
    fname: req.query.fname,
    lname: req.query.lname,
    emaiL: req.query.email,
    method: req.query.method,
    size: req.query.size,
    toppings: req.query.toppings,
    comment: req.query.comment,
    timestamp: new Date()
  };
  res.send(order);
  

});

// Start the server and listen on the specified port 
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}); 
