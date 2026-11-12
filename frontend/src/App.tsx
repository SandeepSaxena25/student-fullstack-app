import { useState, useEffect } from 'react';

export default function App() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState('');

  // Backend (Hono) से डेटा लाने का फंक्शन
  async function loadTasks() {
    const res = await fetch('/api/tasks');
    const data = await res.json();
    setTasks(data);
  }

  // पेज खुलते ही डेटा लाओ
  useEffect(() => {
    loadTasks();
  }, []);

  // फॉर्म सबमिट होने पर Backend को डेटा भेजने का फंक्शन
  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, priority: 'High' }),
    });
    setTitle('');
    loadTasks(); // लिस्ट को दोबारा ताज़ा करो
  }

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>मेरा साफ़-सुथरा Full-Stack App</h2>
      
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '8px' }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="नया काम लिखें..."
          required
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>जोड़ें</button>
      </form>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title} — <b>({t.extraInfo?.priority})</b>
          </li>
        ))}
      </ul>
    </div>
  );
}
