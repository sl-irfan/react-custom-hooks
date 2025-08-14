import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useFetch } from './hooks/useFetch';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [name, setName] = useLocalStorage('name', '');
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>useLocalStorage</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>Hello, {name}!</p>

      <h2>useFetch</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {data?.slice(0, 5).map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <h2>useDebounce</h2>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <p>Debounced: {debouncedSearch}</p>
    </div>
  );
}

export default App;