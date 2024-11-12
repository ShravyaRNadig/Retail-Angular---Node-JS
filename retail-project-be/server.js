const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Endpoint to get all products (GET request)
app.get('/products', (req, res) => {
  fs.readFile(path.join(__dirname, 'products.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading products data');
    } else {
      res.json(JSON.parse(data));  // Send the products as a JSON response
    }
  });
});

// Endpoint to add a new product (POST request)
app.post('/products', (req, res) => {
  fs.readFile(path.join(__dirname, 'products.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading products data');
    } else {
      const products = JSON.parse(data);
      const newProduct = req.body;
      newProduct.id = products.length + 1;
      products.push(newProduct);

      // Save the updated products array back to the file
      fs.writeFile(path.join(__dirname, 'products.json'), JSON.stringify(products, null, 2), (err) => {
        if (err) {
          res.status(500).send('Error saving product');
        } else {
          res.status(201).json(newProduct);  // Return the added product as the response
        }
      });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
