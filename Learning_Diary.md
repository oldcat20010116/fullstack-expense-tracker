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
- The `path` module
- The `url` module
- The `fs` module
- The `events` module
- Creating an HTTP server without Express
- Returning HTML and JSON responses
- HTTP methods, routes and status codes

### Work completed

I created a Node.js module demonstration related to my expense tracker project. The program uses the `path` module to construct a platform-independent file path and the `url` module to parse an expense API URL and its query parameters.

I used the `fs` module to create a directory, write sample financial records to a text file and read the records back. I also created a custom `ExpenseEmitter` class using `EventEmitter`. It emits an event when a new expense is added.

Next, I created an HTTP server from scratch using Node.js without Express. The server provides two GET routes:

- `/` returns an HTML introduction page.
- `/api/expenses` returns sample expense data in JSON format.

Unknown routes return the HTTP status code 404.

### Challenges and solutions

When I ran `npm init -y` in the VS Code PowerShell terminal, Windows blocked the `npm.ps1` script because script execution was disabled. I learned that npm also provides a Windows command file, so I used `npm.cmd init -y`. This solved the problem without changing the system-wide PowerShell security policy.

### Reflection

Before this exercise, I mainly understood a server as a tool provided by a framework. Creating a server directly with Node.js helped me understand what Express simplifies. The server must inspect the request method and URL, set response headers, select an HTTP status code and end every response.

I also learned that JSON is a convenient format for transferring structured data between a back end and a front end. This will be important when the React client communicates with the Express API in my final MERN project.

### Evidence

- Node.js modules demonstration
- File creation and reading
- Custom expense event
- Native HTTP server home page
- JSON expense API