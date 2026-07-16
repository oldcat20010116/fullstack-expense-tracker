function Summary({ transactions }) {
  const income = transactions.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0);
  const expenses = transactions.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0);
  const format = new Intl.NumberFormat('en-FI', { style: 'currency', currency: 'EUR' });

  return (
    <section className="summary-section">
      <div className="hero-copy"><p className="eyebrow">Your financial overview</p><h1>Make every euro visible.</h1><p>A full-stack tracker powered by React, Express, Node.js and MongoDB.</p></div>
      <div className="summary-grid">
        <article className="summary-card balance-card"><span>Current balance</span><strong>{format.format(income - expenses)}</strong></article>
        <article className="summary-card"><span>Total income</span><strong className="income-text">+{format.format(income)}</strong></article>
        <article className="summary-card"><span>Total expenses</span><strong className="expense-text">−{format.format(expenses)}</strong></article>
      </div>
    </section>
  );
}
export default Summary;

