
# E-commerce Backend Database

This is a backend database for an e-commerce website built using Node.js, Express.js, Sequelize and MySQL.

## Repository

<https://github.com/Anthony-A-Perez/eCommerceBackEnd>

## Demo

<https://drive.google.com/file/d/1Umx1EZMBXxvfyKkMXYw_hI4A4rFR03Jw/view>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository to your local machine.
2. Install Node.js and MySQL if not already installed.
3. Create a `.env` file in the root directory of the project and add your MySQL credentials. You can use the `.env.example` file as a template.
4. Install the required dependencies using `npm install`.

## Usage

To start the server, run `npm start`.

The server will start on port 3001 by default. You can change this in the `.env` file.

## API Routes

The following API routes are available:

### Categories

- `GET /api/categories`: Get all categories
- `GET /api/categories/:id`: Get a category by ID
- `POST /api/categories`: Create a new category
- `PUT /api/categories/:id`: Update a category by ID
- `DELETE /api/categories/:id`: Delete a category by ID

### Products

- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a product by ID
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update a product by ID
- `DELETE /api/products/:id`: Delete a product by ID

### Tags

- `GET /api/tags`: Get all tags
- `GET /api/tags/:id`: Get a tag by ID
- `POST /api/tags`: Create a new tag
- `PUT /api/tags/:id`: Update a tag by ID
- `DELETE /api/tags/:id`: Delete a tag by ID

## Database Schema

The database schema consists of the following tables:

- `categories`: Stores information about product categories
- `products`: Stores information about products
- `tags`: Stores information about product tags
- `product_tags`: A join table that stores the relationship between products and tags

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
