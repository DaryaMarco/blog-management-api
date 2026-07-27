# Blog Management REST API

![Node.js](https://img.shields.io/badge/Node.js-24.x-green)
![Express](https://img.shields.io/badge/Express-5.x-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Jest](https://img.shields.io/badge/Test-Jest-red)
![Swagger](https://img.shields.io/badge/API-Swagger-brightgreen)
![Docker](https://img.shields.io/badge/Docker-Compose-blue)
![Render](https://img.shields.io/badge/Deploy-Render-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

A production-ready Blog Management REST API built with Node.js, Express.js, MongoDB, JWT authentication, Swagger documentation, automated testing, Docker containerization, and scalable backend architecture.

---

# Overview

Blog Management API is a backend application designed to manage users, blog posts, and comments through a secure and scalable RESTful API.

The project demonstrates professional backend development practices including:

- Layered architecture
- Separation of concerns
- Repository Pattern
- Service Layer Architecture
- Centralized Error Handling
- JWT Authentication
- Request Validation
- Security Practices
- Automated Testing
- API Documentation
- Docker Deployment

This project represents a real-world backend system suitable for portfolio demonstration.

---

# Features

## Authentication & Authorization

- User registration
- User login
- Password hashing using bcrypt
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
- Sorting
- Ownership-based permissions

---

## Comments Management

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
- Password hashing with bcrypt
- Helmet security headers
- Express Rate Limit
- MongoDB injection protection
- Input sanitization
- Request validation

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

## DevOps

- Docker
- Docker Compose

## Deployment

- Render
- MongoDB Atlas

---

# Architecture

The application follows a layered backend architecture:

```text
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

The authentication system is implemented using JWT.

```text
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

Protected routes require:

```http
Authorization: Bearer <token>
```

---

# Project Structure

```text
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
├── Dockerfile
├── docker-compose.yml
├── app.js
├── server.js
├── package.json
└── .env.example
```

---

# Database Design

MongoDB is used with Mongoose ODM.

Main collections:

- Users
- Posts
- Comments

---

# Database Relationship

```text
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

A user can create multiple posts, and every post can contain multiple comments.

Relationships are implemented using MongoDB ObjectId references.

---

# User Model

```text
User

_id
name
email
password
createdAt
updatedAt
```

| Field | Type | Description |
|---|---|---|
| _id | ObjectId | Unique identifier |
| name | String | User name |
| email | String | Unique email |
| password | String | Hashed password |
| createdAt | Date | Creation date |
| updatedAt | Date | Update date |

---

# Post Model

```text
Post

_id
title
content
author
createdAt
updatedAt
```

| Field | Type | Description |
|---|---|---|
| _id | ObjectId | Unique identifier |
| title | String | Post title |
| content | String | Post content |
| author | ObjectId | User reference |
| createdAt | Date | Creation date |
| updatedAt | Date | Update date |

---

# Installation

## Clone Repository

```bash
git clone https://github.com/DaryaMarco/blog-management-api.git
```

---

## Enter Project Directory

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

Create `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d

NODE_ENV=development
```

Production variables:

```text
MONGO_URI
JWT_SECRET
JWT_EXPIRES_IN
NODE_ENV
```

---

# Running Project

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

# Docker Deployment

The application is fully containerized using Docker Compose.

Services:

```text
API Container
     |
     |
MongoDB Container
```

Run:

```bash
docker compose up --build
```

Stop containers:

```bash
docker compose down
```

Check running containers:

```bash
docker ps
```

View logs:

```bash
docker logs blog-api
```

---

# Testing

Run tests:

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

# Logging

The application uses:

- Morgan for HTTP request logging
- Winston for application logs

Logs help with:

- Debugging
- Error tracking
- Production monitoring

---

# API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

---

# Posts

### Get All Posts

```http
GET /api/posts
```

### Create Post

```http
POST /api/posts
```

Authentication:

```http
Authorization: Bearer <token>
```

### Update Post

```http
PUT /api/posts/:id
```

Authentication required.

### Delete Post

```http
DELETE /api/posts/:id
```

Authentication required.

---

# Comments

### Create Comment

```http
POST /api/posts/:postId/comments
```

Authentication required.

---

### Get Comments

```http
GET /api/posts/:postId/comments
```

---

### Update Comment

```http
PUT /api/posts/:postId/comments/:commentId
```

Authentication required.

---

### Delete Comment

```http
DELETE /api/posts/:postId/comments/:commentId
```

Authentication required.

---

# API Response Example

Successful response:

```json
{
  "success": true,
  "data": {
    "title": "My First Post",
    "content": "Hello World"
  }
}
```

Error response:

```json
{
  "success": false,
  "message": "Resource not found"
}
```

---

# Error Handling

The API uses centralized error handling with:

- Custom error classes
- Middleware-based processing
- Structured responses
- Winston logging
- HTTP status management

---

# Security Practices

Implemented:

- JWT authentication
- Password hashing
- Input validation
- Rate limiting
- Secure HTTP headers
- MongoDB injection protection
- Sanitization middleware

---

# Deployment

Production deployment:

```text
Render
+
MongoDB Atlas
```

Environment variables are configured securely in production.

---

# Health Check

Example server health endpoint:

```http
GET /health
```

Used for:

- Monitoring
- Deployment verification
- Server availability checks

---

# Future Improvements

Possible improvements:

- GitHub Actions CI/CD pipeline
- AWS deployment
- React frontend application
- File upload system
- Advanced Role Based Access Control
- Redis caching
- Background jobs
- Monitoring with Prometheus/Grafana

---

# Author

Created by Darya

Backend Developer Portfolio Project

---

# License

This project is created for learning purposes and portfolio demonstration.

Licensed under the MIT License.