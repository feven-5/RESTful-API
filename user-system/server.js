const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let users = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
];
app.get('/', (req,res) => { 
  res.send('Welcome to the User Management API')
});

// GET /users - Retrieve a list of all users
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// POST /users - Add a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// DELETE /users/:id - Delete a user by their unique ID
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(user => user.id === parseInt(id, 10));
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(200).json({ message: `User with ID ${id} deleted successfully` });
  } else {
    res.status(404).json({ message: `User with ID ${id} not found` });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
