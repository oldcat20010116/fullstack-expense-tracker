# Personal Expense Tracker

A full-stack personal finance application created for **CT70A9140 Software Development Skills: Full-Stack 2025-26**. The application uses the MERN stack to help users record, manage and review their income and expenses.

## Student Information

- **Student:** Yu-Chi Huang
- **Student number:** 3775879
- **Course:** CT70A9140 Software Development Skills: Full-Stack 2025-26

## Project Overview

The Personal Expense Tracker allows users to manage financial transactions through a simple web interface. The final application will connect a React front end to an Express and Node.js REST API, with MongoDB used for persistent data storage.

The project differs from the course tutorial examples because it applies the MERN concepts to personal financial management and includes transaction summaries and filtering features.

## Planned Features

- Add income and expense records
- Display all transactions
- Edit existing transactions
- Delete transactions
- Calculate total income
- Calculate total expenses
- Calculate the current balance
- Filter transactions by type and category
- Validate user input and display error messages
- Store data persistently in MongoDB

## Technologies

- **MongoDB:** Database for transaction records
- **Express.js:** REST API and server-side routing
- **React:** User interface and application state
- **Node.js:** Back-end JavaScript runtime
- **Mongoose:** MongoDB object modelling
- **CSS:** Responsive interface styling
- **Git and GitHub:** Version control and coursework submission

## Repository Structure

```text
fullstack-expense-tracker/
├── Coursework/
│   ├── NodeJS/
│   ├── MongoDB/
│   ├── ExpressJS/
│   └── React/
├── Project/
│   ├── backend/
│   └── frontend/
├── Learning_Diary.md
├── README.md
└── VIDEO_LINK.md
```

`Coursework` contains exercises completed while following the course material. `Project` contains the final Personal Expense Tracker application.

## Completed Coursework

### Development environment

- Verified Node.js, npm, Git and Visual Studio Code
- Installed MongoDB Community Server 8.3.4
- Configured MongoDB as a Windows Service
- Added MongoDB to the Windows PATH
- Created and cloned a public GitHub repository

### Node.js

- Used the `path`, `url`, `fs` and `events` modules
- Created and read an expense data file
- Created a custom expense event with `EventEmitter`
- Built an HTTP server from scratch without Express
- Returned an HTML page from the server
- Created a JSON expense API endpoint
- Handled an unknown route with HTTP status code 404

## Current Project Status

The development environment and Node.js coursework are complete. MongoDB, Express.js, React and the final MERN application will be added during the following stages of the course.

## Running the Node.js Coursework

### Requirements

- Node.js 24 or a compatible recent version
- npm

### Modules demonstration

From the repository root, run:

```bash
cd Coursework/NodeJS
node modules-demo.js
```

The program demonstrates Node.js modules and creates `data/expenses.txt`.

### Native HTTP server

From `Coursework/NodeJS`, run:

```bash
node server.js
```

Open these addresses in a browser:

- Home page: <http://localhost:3000>
- JSON API: <http://localhost:3000/api/expenses>

Stop the server by pressing `Ctrl + C` in the terminal.

## Running the Final MERN Project

The final installation and execution instructions will be added after the back end and front end are completed. The finished project will include separate commands for installing dependencies and running both development servers.

## Learning Diary

Development progress, encountered problems, solutions and personal reflections are documented in [`Learning_Diary.md`](Learning_Diary.md).

## Demonstration Video

The final project video will be linked in [`VIDEO_LINK.md`](VIDEO_LINK.md).

## Author

Yu-Chi Huang — Student number 3775879
