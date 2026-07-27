# Blog Management REST API

![Node.js](https://img.shields.io/badge/Node.js-24.x-green)
![Express](https://img.shields.io/badge/Express-5.x-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Jest](https://img.shields.io/badge/Test-Jest-red)
![Swagger](https://img.shields.io/badge/API-Swagger-brightgreen)
![Render](https://img.shields.io/badge/Deploy-Render-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

A production-ready Blog Management REST API built with Node.js, Express, MongoDB, JWT Authentication, Swagger documentation, automated testing, and scalable backend architecture.

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

- Clean architecture principles
- Separation of concerns
- Repository pattern
- Service layer architecture
- Centralized error handling
- Secure authentication
- API documentation
- Automated integration testing

The system provides complete functionality for creating, managing, and organizing blog content with authentication, authorization, validation, and ownership-based access control.

---

# Features

## Authentication & Authorization

- User registration
- User login
- Secure password hashing with bcrypt
- JWT-based authentication
- Protected routes
- User ownership validation
- Authorization middleware

---

## Posts Management

- Create posts
- Get all posts
- Get single post
- Update posts
- Delete posts
- Search posts
- Pagination
- Sorting (newest / oldest)
- Owner permission checking

---

## Comments System

- Create comments
- Get comments by post
- Update comments
- Delete comments
- Comment ownership validation

---

## Validation & Error Handling

- Request validation using Joi
- Centralized error handling middleware
- Custom AppError class
- Proper HTTP status codes
- Structured API error responses

---

## Security

Implemented security practices:

- JWT authentication
- Password hashing
- Helmet security headers
- Express Rate Limiting
- MongoDB injection protection
- Input sanitization

---

## Logging

Application logging includes:

- HTTP request logging with Morgan
- Application logging with Winston

---

## Documentation & Testing

- Swagger OpenAPI documentation
- Jest testing framework
- Supertest API testing
- Authentication tests
- Authorization tests
- Validation tests
- Edge case testing
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

- Swagger (OpenAPI)

## Security

- Helmet
- Express Rate Limit
- express-mongo-sanitize
- xss-clean

## Logging

- Morgan
- Winston

## Development Tools

- Git
- GitHub
- Postman
- Render
- MongoDB Atlas

---

# Architecture

The application follows a layered backend architecture:


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


## Authentication Flow


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
Protected Requests
|
↓
Authentication Middleware
|
↓
Controller Access


### Login Process

1. User sends email and password.
2. Server validates user credentials.
3. Password is compared using bcrypt.
4. JWT token is generated.
5. Token is returned to the client.
6. Protected routes require:


Authorization: Bearer <token>


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
│   ├── repositories
│   │
│   ├── routes
│   │
│   ├── services
│   │
│   ├── validations
│   │
│   └── utils
│
├── tests
│
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
---

User
|
├── _id
├── name
├── email
├── password
├── createdAt
└── updatedAt
---

## User Model
---
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

---
Post
|
├── _id
├── title
├── content
├── author
├── createdAt
└── updatedAt
---
---
## Post Model
---
| Field | Type | Description |
|---|---|---|
| _id | ObjectId | Unique identifier |
| title | String | Post title |
| content | String | Post content |
| author | ObjectId | Reference to User |
| createdAt | Date | Creation date |
| updatedAt | Date | Last update date |

---

# Database Relationship


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


A user can create multiple posts, and each post can contain multiple comments.

Relationships are implemented using MongoDB ObjectId references with Mongoose.

---

# Installation

## Clone Repository

```bash
git clone https://github.com/DaryaMarco/blog-management-api.git
Go to Project Directory
cd blog-management-api/server
Install Dependencies
npm install
Environment Variables

Create a .env file inside the server directory.

Example:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d

NODE_ENV=development

For production deployment, environment variables are configured in Render.

Required production variables:

MONGO_URI
JWT_SECRET
JWT_EXPIRES_IN
NODE_ENV=production
Running The Project
Development Mode
npm run dev
Production Mode
npm start
Running Tests

Run all tests:

npm test

Testing covers:

Authentication flow
User registration
User login
Protected routes
CRUD operations
Authorization checks
Validation errors
Invalid ObjectId handling
Edge cases
Deployment

The API is deployed using Render.

Production API
https://blog-management-api-s7dj.onrender.com
Database

MongoDB Atlas is used as the production database.

API Documentation

Swagger OpenAPI documentation:

https://blog-management-api-s7dj.onrender.com/api-docs

Swagger provides interactive API documentation and allows testing endpoints directly from the browser.

API Endpoints
Authentication
Register
POST /api/auth/register
Login
POST /api/auth/login
Posts
Get All Posts
GET /api/posts
Create Post
POST /api/posts

Authentication required.

Header:

Authorization: Bearer <token>
Update Post
PUT /api/posts/:id

Authentication required.

Delete Post
DELETE /api/posts/:id

Authentication required.

Comments
Create Comment
POST /api/posts/:postId/comments

Authentication required.

Get Comments
GET /api/posts/:postId/comments
Update Comment
PUT /api/posts/:postId/comments/:commentId

Authentication required.

Delete Comment
DELETE /api/posts/:postId/comments/:commentId

Authentication required.

Error Handling

The API implements centralized error handling:

Custom error classes
Middleware-based error processing
Structured error responses
Proper HTTP status codes
Winston logging
Security Practices

Implemented security features:

JWT authentication
Password hashing with bcrypt
Request validation
Rate limiting
Secure HTTP headers
MongoDB injection protection
Input sanitization
Future Improvements

Possible future enhancements:

CI/CD pipeline with GitHub Actions
Cloud deployment with AWS
User profile management
File upload system
React frontend application
Advanced role-based access control
Screenshots
Swagger Documentation

Live API on Render

Postman API Testing

License

This project is created for learning purposes and portfolio demonstration.

Licensed under the MIT License.