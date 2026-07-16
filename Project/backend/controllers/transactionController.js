const Transaction = require('../models/Transaction');

async function getTransactions(request, response, next) {
  try {
    const filter = {};

    if (request.query.type && ['income', 'expense'].includes(request.query.type)) {
      filter.type = request.query.type;
    }

    if (request.query.category) {
      filter.category = request.query.category;
    }

    const transactions = await Transaction.find(filter).sort({ date: -1, createdAt: -1 });

    response.json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
}

async function getTransactionById(request, response, next) {
  try {
    const transaction = await Transaction.findById(request.params.id);

    if (!transaction) {
      return response.status(404).json({
        success: false,
        message: 'Transaction not found.',
      });
    }

    response.json({ success: true, data: transaction });
  } catch (error) {
    next(error);
  }
}

async function createTransaction(request, response, next) {
  try {
    const transaction = await Transaction.create(request.body);

    response.status(201).json({
      success: true,
      message: 'Transaction created successfully.',
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
}

async function updateTransaction(request, response, next) {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    );

    if (!transaction) {
      return response.status(404).json({
        success: false,
        message: 'Transaction not found.',
      });
    }

    response.json({
      success: true,
      message: 'Transaction updated successfully.',
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteTransaction(request, response, next) {
  try {
    const transaction = await Transaction.findByIdAndDelete(request.params.id);

    if (!transaction) {
      return response.status(404).json({
        success: false,
        message: 'Transaction not found.',
      });
    }

    response.json({
      success: true,
      message: 'Transaction deleted successfully.',
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};

