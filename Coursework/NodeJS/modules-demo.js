const path = require('path');
const fs = require('fs');
const { URL } = require('url');
const EventEmitter = require('events');

console.log('=== Node.js Modules Demo ===');

// 1. Path module
const examplePath = path.join(__dirname, 'data', 'expenses.txt');

console.log('\n1. Path module');
console.log('Created path:', examplePath);
console.log('File name:', path.basename(examplePath));
console.log('Extension:', path.extname(examplePath));

// 2. URL module
const expenseUrl = new URL(
  'http://localhost:5000/expenses?category=food&month=July'
);

console.log('\n2. URL module');
console.log('Host:', expenseUrl.host);
console.log('Path:', expenseUrl.pathname);
console.log('Category:', expenseUrl.searchParams.get('category'));
console.log('Month:', expenseUrl.searchParams.get('month'));

// 3. File System module
const dataDirectory = path.join(__dirname, 'data');
const expenseFile = path.join(dataDirectory, 'expenses.txt');

if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory);
}

const expenseData =
  'Lunch,Food,12.50\nBus ticket,Transport,3.20\nSalary,Income,1200.00';

fs.writeFileSync(expenseFile, expenseData);

console.log('\n3. File System module');
console.log('Expense file created successfully.');
console.log(fs.readFileSync(expenseFile, 'utf8'));

// 4. Events module
class ExpenseEmitter extends EventEmitter {}

const expenseEmitter = new ExpenseEmitter();

expenseEmitter.on('expenseAdded', (description, amount) => {
  console.log(`New expense event: ${description} - €${amount.toFixed(2)}`);
});

console.log('\n4. Events module');
expenseEmitter.emit('expenseAdded', 'Coffee', 4.5);