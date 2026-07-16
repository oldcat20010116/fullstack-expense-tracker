import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import About from './components/About.jsx';
import Summary from './components/Summary.jsx';
import TransactionForm from './components/TransactionForm.jsx';
import TransactionList from './components/TransactionList.jsx';
import {
  createTransaction,
  deleteTransaction,
  fetchTransactions,
  updateTransaction,
} from './api/transactions.js';
import './App.css';

function TrackerPage() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    fetchTransactions()
      .then((result) => {
        if (!ignore) {
          setTransactions(result.data);
          setError('');
        }
      })
      .catch((requestError) => {
        if (!ignore) setError(requestError.message);
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  async function handleSave(form) {
    try {
      setIsSaving(true);
      setError('');

      if (editingTransaction) {
        const result = await updateTransaction(editingTransaction._id, form);
        setTransactions((current) =>
          current.map((item) => (item._id === result.data._id ? result.data : item))
        );
        setEditingTransaction(null);
        setMessage('Transaction updated and saved to MongoDB.');
      } else {
        const result = await createTransaction(form);
        setTransactions((current) => [result.data, ...current]);
        setMessage('Transaction added and saved to MongoDB.');
      }
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this transaction permanently?')) return;

    try {
      await deleteTransaction(id);
      setTransactions((current) => current.filter((item) => item._id !== id));
      if (editingTransaction?._id === id) setEditingTransaction(null);
      setMessage('Transaction deleted from MongoDB.');
      setError('');
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  const visibleTransactions = transactions.filter(
    (transaction) => filter === 'all' || transaction.type === filter
  );

  return (
    <>
      <Summary transactions={transactions} />
      {(message || error) && (
        <div className={`notice ${error ? 'notice-error' : 'notice-success'}`}>
          <span>{error || message}</span>
          <button onClick={() => { setMessage(''); setError(''); }}>×</button>
        </div>
      )}
      <div className="content-grid">
        <TransactionForm
          key={editingTransaction?._id || 'new-transaction'}
          editingTransaction={editingTransaction}
          isSaving={isSaving}
          onSave={handleSave}
          onCancel={() => setEditingTransaction(null)}
        />
        <section className="panel">
          <div className="list-heading">
            <div><p className="eyebrow">MongoDB records</p><h2>Transactions</h2></div>
            <label className="filter-control">
              <span>Filter</span>
              <select value={filter} onChange={(event) => setFilter(event.target.value)}>
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expense">Expenses</option>
              </select>
            </label>
          </div>
          {isLoading ? <p className="empty-state">Loading from MongoDB…</p> : (
            <TransactionList
              transactions={visibleTransactions}
              onEdit={setEditingTransaction}
              onDelete={handleDelete}
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
          <span><strong>ExpenseFlow</strong><small>MERN expense tracker</small></span>
        </Link>
        <nav><Link to="/">Tracker</Link><Link to="/about">About</Link></nav>
      </header>
      <main><Routes><Route path="/" element={<TrackerPage />} /><Route path="/about" element={<About />} /></Routes></main>
      <footer>Final MERN project · Yu-Chi Huang · 3775879</footer>
    </div>
  );
}

export default App;
