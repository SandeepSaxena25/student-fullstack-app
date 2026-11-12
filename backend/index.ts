import { Hono } from 'hono';
import { connectDB } from './db';
import { tasks } from './db/schema';

// Cloudflare को बताते हैं कि हमारे पास DATABASE_URL नाम का एक गुप्त पासवर्ड है
type Env = { Bindings: { DATABASE_URL: string } };

const app = new Hono<Env>();

// 1. जब कोई '/api/tasks' पर डेटा मांगेगा (GET)
app.get('/api/tasks', async (c) => {
  const db = connectDB(c.env.DATABASE_URL);
  const allTasks = await db.select().from(tasks); // डेटाबेस से सारे काम निकालो
  return c.json(allTasks); // JSON बनाकर वापस भेजो
});

// 2. जब कोई '/api/tasks' पर नया डेटा भेजेगा (POST)
app.post('/api/tasks', async (c) => {
  const db = connectDB(c.env.DATABASE_URL);
  const body = await c.req.json(); // Frontend से भेजा गया डेटा पढ़ो
  
  await db.insert(tasks).values({
    title: body.title,
    extraInfo: { priority: body.priority || 'Normal' }, // NoSQL JSON डेटा
  });

  return c.json({ message: 'डेटा सेव हो गया!' });
});

export default app;
