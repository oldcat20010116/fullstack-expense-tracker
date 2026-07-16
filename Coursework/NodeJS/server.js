const http = require('http');

const PORT = 3000;

const expenses = [
  {
    id: 1,
    description: 'Lunch',
    category: 'Food',
    type: 'expense',
    amount: 12.5,
  },
  {
    id: 2,
    description: 'Bus ticket',
    category: 'Transport',
    type: 'expense',
    amount: 3.2,
  },
  {
    id: 3,
    description: 'Salary',
    category: 'Income',
    type: 'income',
    amount: 1200,
  },
];

const server = http.createServer((request, response) => {
  console.log(`${request.method} ${request.url}`);

  if (request.url === '/' && request.method === 'GET') {
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
    });

    response.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Expense Tracker Node.js Demo</title>
          <style>
            body {
              max-width: 700px;
              margin: 50px auto;
              font-family: Arial, sans-serif;
              background: #f4f7fb;
              color: #24324a;
            }

            main {
              padding: 32px;
              background: white;
              border-radius: 12px;
              box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
            }

            a {
              color: #2563eb;
            }
          </style>
        </head>

        <body>
          <main>
            <h1>Personal Expense Tracker</h1>
            <p>This page is served by a native Node.js HTTP server.</p>
            <p>No Express framework is used in this coursework exercise.</p>
            <a href="/api/expenses">View sample expense data</a>
          </main>
        </body>
      </html>
    `);

    return;
  }

  if (request.url === '/api/expenses' && request.method === 'GET') {
    response.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
    });

    response.end(
      JSON.stringify(
        {
          success: true,
          count: expenses.length,
          data: expenses,
        },
        null,
        2
      )
    );

    return;
  }

  response.writeHead(404, {
    'Content-Type': 'application/json; charset=utf-8',
  });

  response.end(
    JSON.stringify({
      success: false,
      message: 'Route not found',
    })
  );
});

server.listen(PORT, () => {
  console.log('======================================');
  console.log('Native Node.js HTTP server is running');
  console.log(`Home: http://localhost:${PORT}`);
  console.log(`API:  http://localhost:${PORT}/api/expenses`);
  console.log('Press Ctrl + C to stop the server.');
  console.log('======================================');
});