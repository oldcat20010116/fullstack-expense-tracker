function TransactionList({ transactions, onEdit, onDelete }) {
  if (!transactions.length) return <p className="empty-state">No transactions match this filter.</p>;
  return <div className="transaction-list">{transactions.map((item) => (
    <article className="transaction-item" key={item._id}>
      <div className={`type-icon ${item.type}`}>{item.type === 'income' ? '↗' : '↘'}</div>
      <div className="transaction-copy"><strong>{item.description}</strong><span>{item.category} · {new Date(item.date).toLocaleDateString('en-GB')}</span>{item.note && <small>{item.note}</small>}</div>
      <strong className={item.type === 'income' ? 'income-text' : 'expense-text'}>{item.type === 'income' ? '+' : '−'}€{item.amount.toFixed(2)}</strong>
      <div className="item-actions"><button className="edit-button" onClick={() => onEdit(item)}>Edit</button><button className="delete-button" onClick={() => onDelete(item._id)}>Delete</button></div>
    </article>
  ))}</div>;
}
export default TransactionList;

