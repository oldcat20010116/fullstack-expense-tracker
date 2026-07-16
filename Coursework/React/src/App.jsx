import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Summary from './components/Summary.jsx';
import TransactionForm from './components/TransactionForm.jsx';
import TransactionList from './components/TransactionList.jsx';
import About from './components/About.jsx';
import './App.css';

const API_URL = 'http://localhost:3001/transactions';

function ExpenseTracker() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    async function loadTransactions() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error('The transaction API returned an error.');
        }

        setTransactions(await response.json());
      } catch (error) {
        setApiError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadTransactions();
  }, []);

  async function addTransaction(transaction) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        throw new Error('The transaction could not be created.');
      }

      const createdTransaction = await response.json();
      setTransactions((current) => [...current, createdTransaction]);
      setApiError('');
    } catch (error) {
      setApiError(error.message);
    }
  }

  async function deleteTransaction(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error('The transaction could not be deleted.');
      }

      setTransactions((current) => current.filter((item) => item.id !== id));
      setApiError('');
    } catch (error) {
      setApiError(error.message);
    }
  }

  const visibleTransactions = transactions.filter(
    (transaction) => filter === 'all' || transaction.type === filter
  );

  return (
    <>
      <Summary transactions={transactions} />
      <div className="content-grid">
        <TransactionForm onAddTransaction={addTransaction} />
        <section className="panel">
          <div className="list-heading">
            <div>
              <p className="eyebrow">Recent activity</p>
              <h2>Transactions</h2>
            </div>
            <label className="filter-control">
              <span>Filter</span>
              <select value={filter} onChange={(event) => setFilter(event.target.value)}>
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expense">Expenses</option>
              </select>
            </label>
          </div>
          {apiError && <p className="form-error">{apiError}</p>}
          {isLoading ? (
            <p className="empty-state">Loading transactions from JSON Server…</p>
          ) : (
            <TransactionList
              transactions={visibleTransactions}
              onDeleteTransaction={deleteTransaction}
            />
          )}
        </section>
      </div>
    </>
  );
}

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">
          <span className="brand-mark">€</span>
          <span>
            <strong>ExpenseFlow</strong>
            <small>Personal money tracker</small>
          </span>
        </Link>
        <nav>
          <Link to="/">Tracker</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<ExpenseTracker />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <footer>React coursework · Yu-Chi Huang · 3775879</footer>
    </div>
  );
}

export default App;
