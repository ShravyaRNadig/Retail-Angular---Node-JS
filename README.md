# Retail Project

This is a simple retail application built using Node.js, Express, and a JSON file (`products.json`) for data storage. It includes basic CRUD operations for managing products.

## Features

- Get a list of all products
- Add new products

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. The server will be running on `http://localhost:5000`

## API Endpoints

- `GET /api/products`: Get all products
- `POST /api/products`: Add a new product (requires JSON body with `name`, `description`, `price`, `stock`, and `image`)
