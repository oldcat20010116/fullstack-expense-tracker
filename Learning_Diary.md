# Learning Diary

## Student Information

- **Student:** Yu-Chi Huang
- **Student number:** 3775879
- **Course:** CT70A9140 Software Development Skills: Full-Stack 2025-26
- **Project:** Personal Expense Tracker
- **Technology stack:** MongoDB, Express.js, React and Node.js

## Introduction

The purpose of this learning diary is to document my progress, challenges and reflections during the Full-Stack course. My final project is a personal expense tracker built with the MERN stack. The application will allow users to create, read, update and delete income and expense records.

Instead of only copying tutorial code, I will apply the concepts to financial records so that the final application differs from the tutorial projects and represents my own work.

---

## 1. Development Environment and Git

**Date:** 16 July 2026

### Topics studied

- Installing and verifying Node.js and npm
- Verifying Git and Visual Studio Code
- Installing MongoDB Community Server
- Running MongoDB as a Windows Service
- Creating a public GitHub repository
- Cloning a repository to the local computer
- Organizing coursework separately from the final project

### Work completed

I verified the development tools using the command line. Node.js, npm, Git and Visual Studio Code were already installed. MongoDB was not initially installed, so I installed MongoDB Community Server 8.3.4.

During installation, I selected the option to install MongoDB as a Windows Service. After installation, the MongoDB service was running, but the `mongod` command was not recognized. I solved this problem by adding the MongoDB `bin` directory to the Windows PATH environment variable.

I then created a public GitHub repository called `fullstack-expense-tracker` and cloned it to my course directory. I created separate `Coursework` and `Project` directories as recommended by the course instructions.

### Reflection

This setup taught me that installing a program and making it available from the command line are two different things. A Windows Service can be running even when the executable is not included in PATH. I also learned why coursework and the final project should be placed in separate directories.

---

## 2. Node.js Fundamentals

**Date:** 16 July 2026

### Topics studied

- The Node.js runtime
- CommonJS modules and `require`
- The `path`, `url`, `fs` and `events` modules
- Creating an HTTP server without Express
- Returning HTML and JSON responses
- HTTP methods, routes and status codes

### Work completed

I created a Node.js module demonstration related to my expense tracker project. The program uses the `path` module to construct a platform-independent file path and the `url` module to parse an expense API URL and its query parameters.

I used the `fs` module to create a directory, write sample financial records to a text file and read the records back. I also created a custom `ExpenseEmitter` class using `EventEmitter`. It emits an event when a new expense is added.

Next, I created an HTTP server from scratch using Node.js without Express. The server provides two GET routes. The `/` route returns an HTML introduction page, while `/api/expenses` returns sample expense data in JSON format. Unknown routes return HTTP status code 404.

### Challenges and solutions

When I ran `npm init -y` in the VS Code PowerShell terminal, Windows blocked the `npm.ps1` script because script execution was disabled. I learned that npm also provides a Windows command file, so I used `npm.cmd init -y`. This solved the problem without changing the system-wide PowerShell security policy.

### Reflection

Before this exercise, I mainly understood a server as a tool provided by a framework. Creating a server directly with Node.js helped me understand what Express simplifies. The server must inspect the request method and URL, set response headers, select an HTTP status code and end every response.

I also learned that JSON is a convenient format for transferring structured data between a back end and a front end. This will be important when the React client communicates with the Express API in my final MERN project.

---

## 3. MongoDB Fundamentals and CRUD

**Date:** 16 July 2026

### Topics studied

- NoSQL and document databases
- Databases, collections and BSON documents
- Connecting MongoDB Compass to a local database server
- Creating a database and collection
- MongoDB Create, Read, Update and Delete operations
- Filtering documents by field values
- Using the `$set` update operator
- Verifying database changes in MongoDB Compass

### Work completed

I connected MongoDB Compass to the local MongoDB server at `mongodb://localhost:27017`. I created the `expense_tracker_coursework` database and a `transactions` collection.

I used the MongoDB shell included with Compass to insert three transaction documents with `insertMany()`. Each document contains a description, amount, transaction type, category, date and note. I used `find()` to display all transactions and filtered the results with `{ type: "expense" }`.

For the Update operation, I used `updateOne()` and `$set` to change the Lunch amount from 12.50 to 15.50 and update its note. For the Delete operation, I used `deleteOne()` to remove the Bus ticket transaction. I refreshed the Documents view in Compass and confirmed that the updated Lunch transaction and Part-time salary remained.

### Challenges and solutions

MongoDB Community Server was installed successfully, but the standalone `mongosh` command was unavailable. MongoDB Compass could still connect to the database and included an `Open MongoDB shell` feature. I used this built-in shell instead of changing the installation or installing an unnecessary additional tool.

### Reflection

The exercise helped me understand that MongoDB stores JSON-like documents rather than rows in fixed relational tables. Documents in the same collection can be flexible, although consistent fields are still important for application code.

CRUD operations form the basis of the final expense tracker. Adding a transaction corresponds to Create, showing transactions corresponds to Read, editing an incorrect amount corresponds to Update, and removing an unwanted record corresponds to Delete. Using Compass alongside shell commands was useful because I could connect the commands to visible changes in the database.

I also learned that database tools have different roles: `mongod` runs the database server, MongoDB Compass provides a graphical interface, and the MongoDB shell executes database commands.

### Evidence

- Local MongoDB connection in Compass
- `expense_tracker_coursework` database and `transactions` collection
- Three inserted transaction documents
- Filtered expense query
- Updated Lunch transaction
- Deleted Bus ticket transaction
- Final two-document result in Compass

---

## 4. Express.js and REST API

**Date:** 16 July 2026

### Topics studied

- Installing Express and third-party npm packages
- Express applications and middleware
- REST API route design
- Route parameters and query strings
- GET, POST, PUT and DELETE methods
- Parsing JSON request bodies
- HTTP response status codes
- Input validation with `express-validator`
- 404 and error-handling middleware

### Work completed

I created a separate Express.js coursework application for the Personal Expense Tracker. The API initially uses an in-memory array so that I could concentrate on Express routing before integrating MongoDB.

The API implements routes for listing every transaction, retrieving a transaction by ID, creating a transaction, replacing an existing transaction and deleting a transaction. I also added a query string filter so that `/api/transactions?type=expense` returns only expense records.

I tested GET routes in the browser and used PowerShell `Invoke-RestMethod` to send POST, PUT and DELETE requests. A Programming book transaction was created, updated to a Full-Stack programming book and retained in the final result. The Bus ticket transaction was removed with a DELETE request.

The course material referred to the legacy `app.use(expressValidator())` syntax. The installed `express-validator` version uses validation chains as route middleware instead. I validated the description, amount, type, category and date fields and used `validationResult()` to return structured validation errors.

I also created middleware for unknown routes and tested a missing transaction ID. Both situations return status code 404 with a meaningful JSON message.

### Challenges and solutions

The tutorial validation example was based on an outdated API. Instead of installing an obsolete package version, I checked the current approach and used `body()`, `param()` and `validationResult()`. This preserved the learning objective while keeping the code compatible with the installed packages.

The running Express server occupied the first terminal. I opened a second terminal to send requests while the server continued listening on port 4000. This helped me understand that the server and the API client are separate processes.

### Reflection

Express reduced much of the manual work required by the native Node.js HTTP server. Routes can be associated directly with methods and URL patterns, JSON bodies can be parsed by middleware and responses can be sent with appropriate status codes.

I learned that a successful API is more than a collection of CRUD routes. It must validate incoming data, return consistent JSON, distinguish client errors from server errors and respond clearly when a resource or route does not exist.

The in-memory transaction array resets whenever the server restarts. This demonstrates why the final MERN application must connect Express to MongoDB for persistent storage.

### Evidence

- Express.js and express-validator installation
- API endpoint overview
- GET all transactions and query filtering
- POST transaction creation
- PUT transaction update
- DELETE transaction removal
- Input validation errors
- Unknown-route middleware
- Missing-transaction response

---

## 5. React Fundamentals, Routing and JSON Server

**Date:** 16 July 2026

### Topics studied

- Creating a React project with Vite
- JSX and reusable components
- Passing data and callbacks through props
- Managing state with `useState`
- Performing side effects with `useEffect`
- Controlled form inputs and event handlers
- Rendering lists with stable keys
- Conditional rendering and filtering
- Client-side routing with React Router
- Reading and changing REST API data with `fetch()`
- Using JSON Server as a development API

### Work completed

I created a Vite project with React 19 and divided the interface into `Summary`, `TransactionForm`, `TransactionList` and `About` components. The design presents total income, total expenses, the current balance, an input form and a filterable transaction list.

The main component owns the transaction state and passes data and callback functions to child components through props. Adding or deleting a transaction updates the state and automatically recalculates the summary values. The form uses controlled inputs and prevents invalid descriptions or non-positive amounts.

I added React Router with separate Tracker and About routes. Navigation changes the displayed component and URL without a full page reload.

The first version stored transactions in localStorage with `useEffect`. I then installed JSON Server and created a `db.json` file. I updated the React application to fetch transactions from `http://localhost:3001/transactions`. The form sends a POST request and the Delete button sends a DELETE request. I verified both operations by refreshing the JSON API directly in the browser.

### Challenges and solutions

Vite requested a valid npm package name because the `React` directory contained an uppercase letter. I used `react-coursework` as the lowercase package name while keeping the coursework directory name unchanged.

The React development server and JSON Server both need to run continuously. I used separate terminals and different ports: 5173 for Vite and 3001 for JSON Server. This made the separation between the front-end application and the REST API clear.

### Reflection

React components make it easier to divide an interface into focused and reusable pieces. State describes changing application data, while props connect parent and child components. I found that updating state immutably with `map`, `filter` and spread syntax creates predictable UI updates.

The JSON Server exercise demonstrated asynchronous client-server communication. The browser interface does not directly change the database file. It sends an HTTP request, waits for the response and then updates the visible state. This prepares the same React interface to communicate with the Express and MongoDB back end in the final MERN project.

### Evidence

- Vite and React project setup
- Interactive expense tracker interface
- State and calculated financial totals
- Transaction filtering and form validation
- React Router About page
- JSON Server API
- React POST request and persistent API result
- React DELETE request and API verification

---

## Current Progress

- [x] Development environment and Git
- [x] Node.js fundamentals
- [x] MongoDB fundamentals and CRUD
- [x] Express.js
- [x] React
- [ ] MERN integration
- [ ] Final testing and demonstration video
