# Gym Management System

![Node.js](https://img.shields.io/badge/Node.js-24.x-green)
![Express](https://img.shields.io/badge/Express-5.x-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Jest](https://img.shields.io/badge/Test-Jest-red)
![Swagger](https://img.shields.io/badge/API-Swagger-brightgreen)
![Render](https://img.shields.io/badge/Deploy-Render-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

# Gym Management API

A RESTful API for a Gym Management System built with Node.js, Express.js, MongoDB, and modern backend practices.

This project demonstrates authentication, authorization, CRUD operations, validation, error handling, logging, API documentation, and automated testing.

---

# Features

## Authentication & Authorization
- User registration
- User login
- JWT based authentication
- Role-based authorization
- Protected routes

## Posts Management
- Create post
- Get all posts
- Search posts
- Pagination
- Sorting (newest / oldest)
- Update post
- Delete post
- Owner permission checking

## Comments System
- Create comments
- Get comments by post
- Update comments
- Delete comments
- Comment ownership validation

## Validation & Error Handling
- Request validation using Joi
- Centralized error handling middleware
- Custom AppError class
- Proper HTTP status codes

## Security
- Helmet security headers
- Express Rate Limit
- Mongo Sanitize
- Password hashing with bcrypt

## Logging
- HTTP request logging with Morgan
- Application logging with Winston

## Documentation & Testing
- Swagger API Documentation
- Integration testing with Jest
- API testing with Supertest
- Authentication tests
- Authorization tests
- Edge case testing

---

# Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Authentication

- JWT
- bcrypt

## Validation

- Joi

## Testing

- Jest
- Supertest

## Documentation

- Swagger (OpenAPI)

## Development Tools

- Git
- GitHub
- Postman

---

# Project Structure

```
server
│
├── src
│   │
│   ├── config
│   │   ├── db.js
│   │   ├── env.js
│   │   ├── logger.js
│   │   └── swagger.js
│   │
│   ├── controllers
│   │
│   ├── middleware
│   │
│   ├── models
│   │
│   ├── routes
│   │
│   ├── validations
│   │
│   ├── utils
│
├── tests
│
├── app.js
├── server.js
├── package.json
└── .env.example
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/DaryaMarco/gym-management-system.git
```

## Go to Project Directory

```bash
cd gym-management-system/server
```

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the server directory.

Example:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/gym

JWT_SECRET=your_secret_key

NODE_ENV=development
```

You can check `.env.example` for required variables.

---

# Running The Project

## Development Mode

```bash
npm run dev
```

## Production Mode

```bash
npm start
```

---

# Running Tests

Run all tests:

```bash
npm test
```

Test coverage includes:

- Authentication flow
- Protected routes
- CRUD operations
- Validation errors
- Invalid IDs
- Permission checks
- Edge cases

---

# API Documentation

Swagger documentation is available at:

```
https://gym-management-system-htx3.onrender.com/api-docs

---

## Live Demo

API:

https://gym-management-system-htx3.onrender.com

Swagger:

https://gym-management-system-htx3.onrender.com/api-docs

---

## Screenshots

### Swagger Documentation

![Swagger](assets/images/swagger-ui.png)

---

### Live API on Render

![Render](assets/images/live-api.png)

---

### Postman API Testing

![Postman](assets/images/postman-login.png)

---

# API Endpoints

## Authentication

Register:

```
POST /api/auth/register
```

Login:

```
POST /api/auth/login
```

---

# Posts

Get Posts:

```
GET /api/posts
```

Create Post:

```
POST /api/posts
```

Update Post:

```
PUT /api/posts/:id
```

Delete Post:

```
DELETE /api/posts/:id
```

---

# Comments

Create Comment:

```
POST /api/posts/:postId/comments
```

Get Comments:

```
GET /api/posts/:postId/comments
```

Update Comment:

```
PUT /api/posts/:postId/comments/:commentId
```

Delete Comment:

```
DELETE /api/posts/:postId/comments/:commentId
```

---

# Error Handling

The API uses centralized error handling with:

- Custom error classes
- Middleware based error processing
- Structured error responses
- Winston logging

---

# Testing Strategy

Tests are written using:

- Jest
- Supertest

Implemented scenarios:

- Successful requests
- Unauthorized requests
- Forbidden access
- Invalid ObjectId handling
- Validation failures
- Resource not found cases

---

# Security Practices

Implemented security measures:

- JWT authentication
- Password hashing
- Request validation
- Rate limiting
- Secure HTTP headers
- MongoDB injection protection

---

# Future Improvements

Possible future enhancements:

- Docker containerization
- CI/CD pipeline
- AWS deployment
- User profile management
- File upload system
- Frontend application with React

---

# License

This project is created for learning purposes and portfolio demonstration.