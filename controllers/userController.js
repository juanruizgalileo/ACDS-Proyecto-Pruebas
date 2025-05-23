const users = [];
let idCounter = 1;

exports.getAllUsers = (req, res) => {
  res.json(users);
};

exports.getUserById = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.json(user);
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;
  console.log(req.body);
  if (!name || !email) 
    return res.status(400).send('Missing fields');
  const newUser = { id: idCounter++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};

exports.updateUser = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  res.json(user);
};

exports.deleteUser = (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('User not found');
  users.splice(index, 1);
  res.status(204).send();
};