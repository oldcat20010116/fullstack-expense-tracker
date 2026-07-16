const { body, param, validationResult } = require('express-validator');

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
    .withMessage('Category is required.')
    .isLength({ max: 50 })
    .withMessage('Category must not exceed 50 characters.'),
  body('date')
    .isISO8601()
    .withMessage('Date must use a valid ISO date format.')
    .toDate(),
  body('note')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 250 })
    .withMessage('Note must not exceed 250 characters.'),
];

const mongoIdValidation = [
  param('id').isMongoId().withMessage('A valid MongoDB transaction ID is required.'),
];

function validateRequest(request, response, next) {
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

module.exports = { transactionValidation, mongoIdValidation, validateRequest };

