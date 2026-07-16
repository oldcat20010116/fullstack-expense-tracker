import { useState } from 'react';

const blank = () => ({ description: '', amount: '', type: 'expense', category: 'Food', date: new Date().toISOString().split('T')[0], note: '' });

function initialForm(transaction) {
  if (!transaction) return blank();

  return {
    description: transaction.description,
    amount: transaction.amount,
    type: transaction.type,
    category: transaction.category,
    date: transaction.date.split('T')[0],
    note: transaction.note || '',
  };
}

function TransactionForm({ editingTransaction, isSaving, onSave, onCancel }) {
  const [form, setForm] = useState(() => initialForm(editingTransaction));
  const [formError, setFormError] = useState('');

  function change(event) { setForm((current) => ({ ...current, [event.target.name]: event.target.value })); }
  async function submit(event) {
    event.preventDefault();
    if (!form.description.trim() || Number(form.amount) <= 0) { setFormError('Enter a description and an amount greater than zero.'); return; }
    await onSave({ ...form, description: form.description.trim(), amount: Number(form.amount), note: form.note.trim() });
    if (!editingTransaction) setForm(blank());
    setFormError('');
  }

  return (
    <section className="panel form-panel">
      <p className="eyebrow">{editingTransaction ? 'Edit MongoDB record' : 'New MongoDB record'}</p>
      <h2>{editingTransaction ? 'Edit transaction' : 'Add transaction'}</h2>
      <form onSubmit={submit}>
        <label>Description<input name="description" value={form.description} onChange={change} placeholder="e.g. Grocery shopping" /></label>
        <div className="form-row"><label>Amount (€)<input name="amount" value={form.amount} onChange={change} type="number" min="0.01" step="0.01" /></label><label>Date<input name="date" value={form.date} onChange={change} type="date" /></label></div>
        <div className="form-row"><label>Type<select name="type" value={form.type} onChange={change}><option value="expense">Expense</option><option value="income">Income</option></select></label><label>Category<select name="category" value={form.category} onChange={change}><option>Food</option><option>Transport</option><option>Education</option><option>Salary</option><option>Entertainment</option><option>Housing</option><option>Other</option></select></label></div>
        <label>Note (optional)<textarea name="note" value={form.note} onChange={change} rows="3" placeholder="Add a short note" /></label>
        {formError && <p className="form-error">{formError}</p>}
        <div className="form-actions"><button className="primary-button" disabled={isSaving}>{isSaving ? 'Saving…' : editingTransaction ? 'Save changes' : 'Add transaction'}</button>{editingTransaction && <button className="secondary-button" type="button" onClick={onCancel}>Cancel</button>}</div>
      </form>
    </section>
  );
}
export default TransactionForm;
