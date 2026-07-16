function Summary({ transactions }) {
  const income = transactions
    .filter((item) => item.type === 'income')
    .reduce((total, item) => total + item.amount, 0);
  const expenses = transactions
    .filter((item) => item.type === 'expense')
    .reduce((total, item) => total + item.amount, 0);
  const balance = income - expenses;

  const currency = new Intl.NumberFormat('en-FI', {
    style: 'currency',
    currency: 'EUR',
  });

  return (
    <section className="summary-section">
      <div className="hero-copy">
        <p className="eyebrow">Financial overview</p>
        <h1>Know where your money goes.</h1>
        <p>Record daily income and expenses and keep your balance visible.</p>
      </div>
      <div className="summary-grid">
        <article className="summary-card balance-card">
          <span>Current balance</span>
          <strong>{currency.format(balance)}</strong>
        </article>
        <article className="summary-card">
          <span>Total income</span>
          <strong className="income-text">+{currency.format(income)}</strong>
        </article>
        <article className="summary-card">
          <span>Total expenses</span>
          <strong className="expense-text">−{currency.format(expenses)}</strong>
        </article>
      </div>
    </section>
  );
}

export default Summary;

