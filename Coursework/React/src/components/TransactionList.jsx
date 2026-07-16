function TransactionList({ transactions, onDeleteTransaction }) {
  if (transactions.length === 0) {
    return <p className="empty-state">No transactions match this filter.</p>;
  }

  return (
    <div className="transaction-list">
      {transactions.map((transaction) => (
        <article className="transaction-item" key={transaction.id}>
          <div className={`type-icon ${transaction.type}`}>
            {transaction.type === 'income' ? '↗' : '↘'}
          </div>
          <div className="transaction-copy">
            <strong>{transaction.description}</strong>
            <span>{transaction.category}</span>
          </div>
          <strong className={transaction.type === 'income' ? 'income-text' : 'expense-text'}>
            {transaction.type === 'income' ? '+' : '−'}€{transaction.amount.toFixed(2)}
          </strong>
          <button
            className="delete-button"
            type="button"
            onClick={() => onDeleteTransaction(transaction.id)}
            aria-label={`Delete ${transaction.description}`}
          >
            Delete
          </button>
        </article>
      ))}
    </div>
  );
}

export default TransactionList;

