# Job Portal API

This is a Node.js API backend for a Job Portal application.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Job Portal API is designed to manage job listings, user profiles, and authentication for a job portal application. It provides endpoints for creating, updating, and deleting jobs, as well as managing user profiles through authentication.

## Features

- User registration and authentication with JWT tokens
- CRUD operations for job listings
- User profile management
- Swagger API documentation for easy testing and integration

## Technologies Used

- **Node.js** - JavaScript runtime environment
- **Express** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT** - JSON Web Tokens for authentication
- **Swagger** - API documentation tool
- **Helmet** - Security middleware for Express
- **Cors** - CORS middleware for Express
- **Express Rate Limit** - Rate limiting middleware for Express
- **Express Validator** - Validator middleware for Express
- **XSS Clean** - Middleware to sanitize user input

## Installation

1. Clone the repository:
   ```bash
   git clone [<repository_url>](https://github.com/jhantu626/Job-Portal-Api-s.git)
   cd job-portal-api
   ```
2. Install dependencies
  ```bash
  npm install
```
3.Set environment variables
- Create a .env file in the root directory and add the following:
- .env
```bash PORT=8000
  MONGO_URI=<your-mongodb-uri>
  JWT_SECRET=<your-jwt-secret>
```
- Replace <your-mongodb-uri> and <your-jwt-secret> with your MongoDB connection URI and JWT secret respectively.

4.Start the server
  ```bash
      nodemon server.js
  ```
- The server will start running on http://localhost:8000 (or another port if specified).

## Usage
- Register a new user, login, and obtain a JWT token.
- Use Swagger UI to test API endpoints (http://localhost:8000/api-doc).
- Create, update, and delete job listings.
- Manage user profiles.


## API Documentation
- Explore the Swagger API documentation for detailed information on available endpoints, request/response formats, and authentication requirements.

