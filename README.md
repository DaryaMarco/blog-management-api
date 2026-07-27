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

- Clean architecture
- Separation of concerns
- Repository pattern
- Service layer architecture
- Centralized error handling
- Secure authentication
- API documentation
- Automated testing

---

# Features

## Authentication & Authorization

- User registration
- User login
- Password hashing with bcrypt
- JWT authentication
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

- Joi request validation
- Centralized error handling middleware
- Custom AppError class
- Proper HTTP status codes
- Structured API responses

---

## Security

Implemented security practices:

- JWT authentication
- bcrypt password hashing
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

- JWT
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


---

# Authentication Flow


User
|
↓
Register / Login
|
↓
Auth Controller
|
↓
Auth Service
|
↓
bcrypt Password Hashing
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


Protected routes require:


Authorization: Bearer <token>


---

# Project Structure


server
|
├── src
| |
| ├── config
| | ├── db.js
| | ├── env.js
| | ├── logger.js
| | └── swagger.js
| |
| ├── controllers
| |
| ├── middleware
| |
| ├── models
| |
| ├── repositories
| |
| ├── routes
| |
| ├── services
| |
| ├── validations
| |
| └── utils
|
├── tests
|
├── app.js
├── server.js
├── package.json
└── .env.example


---

# Database Design

MongoDB with Mongoose is used for database modeling.

Main collections:

- Users
- Posts
- Comments

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


A user can create multiple posts and each post can contain multiple comments.

---

# Installation

## Clone Repository

```bash
git clone https://github.com/DaryaMarco/blog-management-api.git
Go To Project Directory
cd blog-management-api/server
Install Dependencies
npm install
Environment Variables

Create a .env file:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d

NODE_ENV=development

Production environment variables are configured in Render.

Running The Project
Development
npm run dev
Production
npm start
Testing

Run tests:

npm test

Tests include:

Authentication tests
Authorization tests
CRUD operations
Validation errors
Invalid IDs
Permission checks
Edge cases
Deployment

The API is deployed using Render.

Production URL:

https://blog-management-api-s7dj.onrender.com

Database:

MongoDB Atlas
API Documentation

Swagger:

https://blog-management-api-s7dj.onrender.com/api-docs
API Endpoints
Authentication

Register:

POST /api/auth/register

Login:

POST /api/auth/login
Posts

Get Posts:

GET /api/posts

Create Post:

POST /api/posts

Update Post:

PUT /api/posts/:id

Delete Post:

DELETE /api/posts/:id
Comments

Create Comment:

POST /api/posts/:postId/comments

Get Comments:

GET /api/posts/:postId/comments

Update Comment:

PUT /api/posts/:postId/comments/:commentId

Delete Comment:

DELETE /api/posts/:postId/comments/:commentId
Security Practices

Implemented:

JWT authentication
Password hashing
Request validation
Rate limiting
Secure headers
MongoDB sanitization
Future Improvements
CI/CD with GitHub Actions
AWS deployment
React frontend
File upload system
Advanced role management
License

This project is created for learning purposes and portfolio demonstration.

Licensed under the MIT License.

---