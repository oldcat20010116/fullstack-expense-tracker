const express = require('express');
const { body, param, validationResult } = require('express-validator');

const app = express();
const PORT = 4000;

app.use(express.json());

let nextId = 4;
let transactions = [
  {
    id: 1,
    description: 'Lunch',
    amount: 15.5,
    type: 'expense',
    category: 'Food',
    date: '2026-07-16',
  },
  {
    id: 2,
    description: 'Bus ticket',
    amount: 3.2,
    type: 'expense',
    category: 'Transport',
    date: '2026-07-16',
  },
  {
    id: 3,
    description: 'Part-time salary',
    amount: 1200,
    type: 'income',
    category: 'Salary',
    date: '2026-07-15',
  },
];

const transactionValidation = [
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required.')
    .isLength({ max: 100 })
    .withMessage('Description must not exceed 100 characters.'),
  body('amount')
    .isFloat({ gt: 0 })
    .withMessage('Amount must be a number greater than zero.')
    .toFloat(),
  body('type')
    .isIn(['income', 'expense'])
    .withMessage('Type must be income or expense.'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required.'),
  body('date')
    .isISO8601()
    .withMessage('Date must use YYYY-MM-DD format.'),
];

const idValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Transaction ID must be a positive integer.')
    .toInt(),
];

function sendValidationErrors(request, response, next) {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors: errors.array(),
    });
  }

  next();
}

app.get('/', (request, response) => {
  response.json({
    success: true,
    message: 'Personal Expense Tracker Express API',
    endpoints: {
      getAll: 'GET /api/transactions',
      getOne: 'GET /api/transactions/:id',
      create: 'POST /api/transactions',
      update: 'PUT /api/transactions/:id',
      delete: 'DELETE /api/transactions/:id',
    },
  });
});

app.get('/api/transactions', (request, response) => {
  const { type } = request.query;
  const filteredTransactions = type
    ? transactions.filter((transaction) => transaction.type === type)
    : transactions;

  response.json({
    success: true,
    count: filteredTransactions.length,
    data: filteredTransactions,
  });
});

app.get(
  '/api/transactions/:id',
  idValidation,
  sendValidationErrors,
  (request, response) => {
    const transaction = transactions.find((item) => item.id === request.params.id);

    if (!transaction) {
      return response.status(404).json({
        success: false,
        message: 'Transaction not found.',
      });
    }

    response.json({ success: true, data: transaction });
  }
);

app.post(
  '/api/transactions',
  transactionValidation,
  sendValidationErrors,
  (request, response) => {
    const transaction = {
      id: nextId++,
      description: request.body.description,
      amount: request.body.amount,
      type: request.body.type,
      category: request.body.category,
      date: request.body.date,
    };

    transactions.push(transaction);

    response.status(201).json({
      success: true,
      message: 'Transaction created successfully.',
      data: transaction,
    });
  }
);

app.put(
  '/api/transactions/:id',
  idValidation,
  transactionValidation,
  sendValidationErrors,
  (request, response) => {
    const index = transactions.findIndex((item) => item.id === request.params.id);

    if (index === -1) {
      return response.status(404).json({
        success: false,
        message: 'Transaction not found.',
      });
    }

    transactions[index] = {
      id: request.params.id,
      description: request.body.description,
      amount: request.body.amount,
      type: request.body.type,
      category: request.body.category,
      date: request.body.date,
    };

    response.json({
      success: true,
      message: 'Transaction updated successfully.',
      data: transactions[index],
    });
  }
);

app.delete(
  '/api/transactions/:id',
  idValidation,
  sendValidationErrors,
  (request, response) => {
    const index = transactions.findIndex((item) => item.id === request.params.id);

    if (index === -1) {
      return response.status(404).json({
        success: false,
        message: 'Transaction not found.',
      });
    }

    const deletedTransaction = transactions.splice(index, 1)[0];

    response.json({
      success: true,
      message: 'Transaction deleted successfully.',
      data: deletedTransaction,
    });
  }
);

app.use((request, response) => {
  response.status(404).json({
    success: false,
    message: `Route ${request.method} ${request.originalUrl} was not found.`,
  });
});

app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).json({
    success: false,
    message: 'An unexpected server error occurred.',
  });
});

app.listen(PORT, () => {
  console.log('==========================================');
  console.log('Express Expense Tracker API is running');
  console.log(`Home: http://localhost:${PORT}`);
  console.log(`API:  http://localhost:${PORT}/api/transactions`);
  console.log('Press Ctrl + C to stop the server.');
  console.log('==========================================');
});
