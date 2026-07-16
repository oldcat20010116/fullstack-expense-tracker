const API_URL = `${import.meta.env.VITE_API_URL}/transactions`;

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const result = await response.json();

  if (!response.ok) {
    const validationMessage = result.errors?.map((error) => error.msg).join(' ');
    throw new Error(validationMessage || result.message || 'The API request failed.');
  }

  return result;
}

export function fetchTransactions() {
  return request(API_URL);
}

export function createTransaction(transaction) {
  return request(API_URL, { method: 'POST', body: JSON.stringify(transaction) });
}

export function updateTransaction(id, transaction) {
  return request(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(transaction),
  });
}

export function deleteTransaction(id) {
  return request(`${API_URL}/${id}`, { method: 'DELETE' });
}

