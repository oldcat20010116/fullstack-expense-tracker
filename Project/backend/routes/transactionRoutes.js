const express = require('express');
const {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactionController');
const {
  transactionValidation,
  mongoIdValidation,
  validateRequest,
} = require('../middleware/validationMiddleware');

const router = express.Router();

router
  .route('/')
  .get(getTransactions)
  .post(transactionValidation, validateRequest, createTransaction);

router
  .route('/:id')
  .get(mongoIdValidation, validateRequest, getTransactionById)
  .put(
    mongoIdValidation,
    transactionValidation,
    validateRequest,
    updateTransaction
  )
  .delete(mongoIdValidation, validateRequest, deleteTransaction);

module.exports = router;

