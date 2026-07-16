# Project Report: Personal Expense Tracker

## 1. Project Information

- **Student:** Yu-Chi Huang
- **Student number:** 3775879
- **Course:** CT70A9140 Software Development Skills: Full-Stack 2025-26
- **Project:** Personal Expense Tracker

## 2. Introduction

The purpose of this project was to apply the course material in a complete MERN-stack application. The project differs from the tutorial examples by focusing on personal financial management. It allows a user to maintain income and expense records and view an automatically calculated financial summary.

The application was developed after separate coursework exercises in Node.js, MongoDB, Express.js and React. Those exercises were then combined into a single application with persistent storage, a validated REST API and an interactive user interface.

## 3. Objectives

The project objectives were to:

1. Create a React interface from reusable components.
2. Build an Express and Node.js REST API.
3. Use MongoDB and Mongoose for persistent document storage.
4. Implement complete Create, Read, Update and Delete functionality.
5. Validate user input and handle errors clearly.
6. Use Git and GitHub to document development progress.
7. Provide installation instructions, learning reflections and visual evidence.

## 4. System Architecture

The project follows a three-layer structure.

### 4.1 Frontend

The React frontend runs through Vite on port 5173. It displays the form, transaction list, filters and summary values. The API functions are separated into `src/api/transactions.js`, while visual features are divided into reusable components.

### 4.2 Backend

The Express backend runs on port 5000. Routes are separated from controllers, database models and middleware. The API exchanges JSON with the frontend and uses `express-validator` for request validation.

### 4.3 Database

MongoDB runs locally on port 27017. Mongoose connects to the `expense_tracker_project` database. Transaction documents contain the description, amount, type, category, date, optional note and automatic timestamps.

## 5. Main Functionality

### Create

The user enters a description, positive amount, type, category, date and optional note. React sends a POST request to Express. After validation, Mongoose creates a MongoDB document and returns it to the frontend.

### Read

When the application loads, React sends a GET request. Express retrieves the documents from MongoDB and returns them in descending date order. The interface calculates income, expenses and balance from the received data.

### Update

The Edit button loads a transaction into the controlled form. Saving sends a PUT request containing the complete updated record. Mongoose applies schema validation and returns the updated document.

### Delete

The Delete button asks for confirmation before sending a DELETE request. The record is removed from MongoDB and React removes it from the displayed state.

### Filtering and routing

The interface filters records without changing the database. React Router provides separate Tracker and About views without a complete page reload.

## 6. Validation and Error Handling

Validation is applied at several levels:

- React prevents an empty description and a non-positive amount.
- Express validates all request fields and MongoDB identifiers.
- Mongoose applies model-level requirements, enumeration values, lengths and minimum amounts.
- The API returns structured 400, 404 and 500 responses.
- React displays API errors and success messages to the user.

The `.env` files are excluded from Git, while `.env.example` documents the required configuration.

## 7. Testing

The following tests were completed manually:

- MongoDB Windows Service and Compass connection
- Backend health endpoint
- Empty and populated GET responses
- Creating three initial MongoDB documents through the API
- Creating a new transaction through React
- Refreshing the application to confirm persistence
- Editing the transaction and verifying the result in Compass
- Deleting the transaction and verifying permanent removal
- Filtering income and expenses
- React and API input validation
- Unknown-route and missing-resource handling
- Frontend ESLint check
- Vite production build

The evidence directory contains screenshots of every major stage.

## 8. Challenges and Solutions

### Windows PowerShell npm restriction

PowerShell prevented execution of `npm.ps1`. I used `npm.cmd`, which allowed npm commands without reducing the system execution-policy security level.

### MongoDB command path

MongoDB was installed as a Windows Service, but `mongod` was initially unavailable from the command line. Adding the MongoDB `bin` directory to PATH solved the problem.

### Outdated validation tutorial

The course example referred to `app.use(expressValidator())`, which belongs to an older API. I used current validation chains and `validationResult()` instead.

### React Hooks lint rules

The current ESLint configuration rejected synchronous state updates inside Effects. API state was moved to asynchronous Promise callbacks, and the editing form uses a component key to reset local state cleanly.

### Running multiple services

The frontend, backend and database are separate processes. I used different terminals and ports and learned to check each layer independently when diagnosing a connection problem.

## 9. Learning Outcomes

This project improved my understanding of how a modern full-stack application is divided into responsibilities. React controls the browser interface, Express defines the API, Node.js runs the server and MongoDB stores documents. HTTP and JSON connect these layers.

I also learned that reliable development includes validation, status codes, error messages, environment configuration, source control, documentation and repeatable testing. The final project is therefore more than a visual interface; it is a complete data flow from user input to persistent storage and back.

## 10. Conclusion

The Personal Expense Tracker satisfies the course requirement for a MERN-stack project and differs from the example project through its financial domain, summary calculations, filters, responsive interface and layered validation. Future improvements could include user authentication, budgets, charts, monthly reports, automated tests and cloud deployment.

