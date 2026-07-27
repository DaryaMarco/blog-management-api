# Blog Management REST API

![Node.js](https://img.shields.io/badge/Node.js-24.x-green)
![Express](https://img.shields.io/badge/Express-5.x-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Jest](https://img.shields.io/badge/Test-Jest-red)
![Swagger](https://img.shields.io/badge/API-Swagger-brightgreen)
![Render](https://img.shields.io/badge/Deploy-Render-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

A production-ready Blog Management REST API built with Node.js, Express.js, MongoDB, JWT authentication, Swagger documentation, automated testing, and scalable backend architecture.

---

# Live Demo

## Production API

https://blog-management-api-s7dj.onrender.com

## Swagger Documentation

https://blog-management-api-s7dj.onrender.com/api-docs

---

# Overview

Blog Management API is a production-ready backend application designed to manage users, blog posts, and comments through a secure and scalable RESTful API.

The project demonstrates professional backend development practices including:

- Layered architecture
- Separation of concerns
- Repository pattern
- Service layer architecture
- Centralized error handling
- Secure authentication
- API documentation
- Automated testing

This project represents a real-world backend system with authentication, authorization, validation, security practices, and production deployment.

---

# Features

## Authentication & Authorization

- User registration
- User login
- Password hashing with bcrypt
- JWT-based authentication
- Protected routes
- User ownership validation

---

## Posts Management

- Create posts
- Get all posts
- Get single post
- Update posts
- Delete posts
- Search posts
- Pagination
- Sorting
- Ownership-based permissions

---

## Comments System

- Create comments
- Get comments by post
- Update comments
- Delete comments
- Comment ownership validation

---

## Validation & Error Handling

- Joi request validation
- Centralized error handling middleware
- Custom AppError class
- Proper HTTP status codes
- Structured API responses

---

## Security

Implemented security practices:

- JWT authentication
- Password hashing
- Helmet security headers
- Express Rate Limit
- MongoDB injection protection
- Input sanitization

---

# Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Authentication

- JSON Web Token (JWT)
- bcrypt

## Validation

- Joi

## Testing

- Jest
- Supertest

## Documentation

- Swagger OpenAPI

## Logging

- Morgan
- Winston

## Deployment

- Render
- MongoDB Atlas
---

# Architecture

The application follows a layered backend architecture:

```
Request
   |
   ↓
Route
   |
   ↓
Controller
   |
   ↓
Service
   |
   ↓
Repository
   |
   ↓
Model
   |
   ↓
MongoDB
```

---

# Authentication Flow

The authentication system is implemented using JWT-based authentication.

```
User
 |
 ↓
Register / Login Request
 |
 ↓
Auth Controller
 |
 ↓
Auth Service
 |
 ↓
Password Hashing (bcrypt)
 |
 ↓
JWT Token Generation
 |
 ↓
Client Receives Token
 |
 ↓
Protected API Request
 |
 ↓
Authentication Middleware
 |
 ↓
Controller Access
```

## Login Process

1. User sends email and password.
2. Server validates user credentials.
3. Password is compared using bcrypt.
4. JWT token is generated.
5. Token is returned to the client.
6. Client sends the token for protected requests.

Protected routes require:

```
Authorization: Bearer <token>
```

---

# Project Structure

```
server
|
├── src
|   |
|   ├── config
|   |   ├── db.js
|   |   ├── env.js
|   |   ├── logger.js
|   |   └── swagger.js
|   |
|   ├── controllers
|   |
|   ├── middleware
|   |
|   ├── models
|   |
|   ├── repositories
|   |
|   ├── routes
|   |
|   ├── services
|   |
|   ├── validations
|   |
|   └── utils
|
├── tests
|
├── app.js
├── server.js
├── package.json
└── .env.example
```

---

# Database Design

The project uses MongoDB with Mongoose ODM for database modeling.

Main collections:

- Users
- Posts
- Comments

---

# User Collection

Stores registered user information.

```
User
 |
 ├── _id
 ├── name
 ├── email
 ├── password
 ├── createdAt
 └── updatedAt
```

## User Model

| Field | Type | Description |
|---|---|---|
| _id | ObjectId | Unique identifier |
| name | String | User full name |
| email | String | Unique email |
| password | String | Hashed password |
| createdAt | Date | Account creation date |
| updatedAt | Date | Last update date |

---

# Post Collection

Stores blog posts created by users.

```
Post
 |
 ├── _id
 ├── title
 ├── content
 ├── author
 ├── createdAt
 └── updatedAt
```

## Post Model

| Field | Type | Description |
|---|---|---|
| _id | ObjectId | Unique identifier |
| title | String | Post title |
| content | String | Post content |
| author | ObjectId | Reference to User |
| createdAt | Date | Post creation date |
| updatedAt | Date | Last update date |

---

# Database Relationship

```
User
 |
 | 1 : Many
 |
 ↓
Posts
 |
 | 1 : Many
 |
 ↓
Comments
```

A single user can create multiple posts, and each post can contain multiple comments.

The relationships are implemented using MongoDB ObjectId references with Mongoose.

---
# Installation

## Clone Repository

```bash
git clone https://github.com/DaryaMarco/blog-management-api.git
```

---

## Go To Project Directory

```bash
cd blog-management-api/server
```

---

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file inside the server directory.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d

NODE_ENV=development
```

For production deployment, environment variables are configured in Render.

Required production variables:

```
MONGO_URI
JWT_SECRET
JWT_EXPIRES_IN
NODE_ENV
```

---

# Running The Project

## Development Mode

```bash
npm run dev
```

---

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
- User registration
- User login
- Protected routes
- CRUD operations
- Authorization checks
- Validation errors
- Invalid ObjectId handling
- Edge cases

---

# Deployment

The API is deployed using Render.

## Production API

```
https://blog-management-api-s7dj.onrender.com
```

## Database

MongoDB Atlas is used as the production database.

---

# API Documentation

Swagger documentation:

```
https://blog-management-api-s7dj.onrender.com/api-docs
```

Swagger provides interactive API documentation and allows testing endpoints directly from the browser.

---

# API Endpoints

## Authentication

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

---

# Posts

## Get All Posts

```
GET /api/posts
```

## Create Post

```
POST /api/posts
```

Authentication required:

```
Authorization: Bearer <token>
```

## Update Post

```
PUT /api/posts/:id
```

Authentication required.

## Delete Post

```
DELETE /api/posts/:id
```

Authentication required.

---

# Comments

## Create Comment

```
POST /api/posts/:postId/comments
```

Authentication required.

---

## Get Comments

```
GET /api/posts/:postId/comments
```

---

## Update Comment

```
PUT /api/posts/:postId/comments/:commentId
```

Authentication required.

---

## Delete Comment

```
DELETE /api/posts/:postId/comments/:commentId
```

Authentication required.

---

# Error Handling

The API uses centralized error handling with:

- Custom error classes
- Middleware-based error processing
- Structured error responses
- Proper HTTP status codes
- Winston logging

---

# Security Practices

Implemented security measures:

- JWT authentication
- Password hashing with bcrypt
- Request validation
- Rate limiting
- Secure HTTP headers
- MongoDB injection protection
- Input sanitization

---

# Future Improvements

Possible future enhancements:

- CI/CD pipeline with GitHub Actions
- AWS deployment
- React frontend application
- File upload system
- Advanced role-based access control

---

# License

This project is created for learning purposes and portfolio demonstration.

Licensed under the MIT License.