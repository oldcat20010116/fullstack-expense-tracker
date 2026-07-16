import { useState } from 'react';

const emptyForm = {
  description: '',
  amount: '',
  type: 'expense',
  category: 'Food',
};

function TransactionForm({ onAddTransaction }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const numericAmount = Number(form.amount);

    if (!form.description.trim() || numericAmount <= 0) {
      setError('Enter a description and an amount greater than zero.');
      return;
    }

    onAddTransaction({
      ...form,
      description: form.description.trim(),
      amount: numericAmount,
    });
    setForm(emptyForm);
    setError('');
  }

  return (
    <section className="panel form-panel">
      <p className="eyebrow">New record</p>
      <h2>Add transaction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Description
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="e.g. Grocery shopping"
          />
        </label>
        <label>
          Amount (€)
          <input
            name="amount"
            value={form.amount}
            onChange={handleChange}
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.00"
          />
        </label>
        <div className="form-row">
          <label>
            Type
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>
          <label>
            Category
            <select name="category" value={form.category} onChange={handleChange}>
              <option>Food</option>
              <option>Transport</option>
              <option>Education</option>
              <option>Salary</option>
              <option>Entertainment</option>
              <option>Other</option>
            </select>
          </label>
        </div>
        {error && <p className="form-error">{error}</p>}
        <button className="primary-button" type="submit">Add transaction</button>
      </form>
    </section>
  );
}

export default TransactionForm;

