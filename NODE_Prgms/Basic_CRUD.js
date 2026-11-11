const express = require('express');
const app = express();

app.use(express.json());           // parse JSON bodies

let todos = [{ id: 1, title: 'Learn Node', done: false }];

app.get('/', (req, res) => {
    res.send("Welcome to Basic CRUD Application!");
});

// READ all
app.get('/api/todos', (req, res) => res.json(todos));

// READ one
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Not found' });
  res.json(todo);
});

// CREATE
app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const todo = { id: Date.now(), title, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

// UPDATE
app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Not found' });
  Object.assign(todo, req.body);
  res.json(todo);
});

// DELETE
app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id !== Number(req.params.id));
  res.sendStatus(204);
});

// 404 + error handler (must be last)
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(3000, () => console.log('API on http://localhost:3000'));