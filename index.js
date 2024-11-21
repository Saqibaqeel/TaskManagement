const express = require('express');
const Task = require('./models/Task');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utility/wrapAsync');
const taskValidationSchema=require('./schema')

const app = express();
const PORT = 3000;

const URL = 'mongodb://127.0.0.1:27017/Task';
main()
  .then(() => {
    console.log('connection success');
  })
  .catch((e) => {
    console.log(e);
  });

async function main() {
  await mongoose.connect(URL);
}

const validate = (req, res, next) => {
  const { error } = taskValidationSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ error: `Validation error: ${error.details[0].message}` });
  }
  
  next();
};

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', wrapAsync(async (req, res) => {
  const tasks = await Task.find({});
  res.render('index.ejs', { tasks });
}));

app.get('/tasks/new', (req, res) => {
  res.render('new-task.ejs');
});

app.post('/tasks/new', wrapAsync(async (req, res) => {
  const { title, description, dueDate, status } = req.body.Task;
  const newTask = new Task({ title, description, dueDate, status: status || 'pending' });
  await newTask.save();
  res.redirect('/');
}));

app.get('/tasks/:id', wrapAsync(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).send('Task not found');
  }
  res.render('show.ejs', { task });
}));

app.get('/tasks/:id/edit', wrapAsync(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).send('Task not found');
  }
  res.render('edit.ejs', { task });
}));

app.put('/tasks/:id/edit',validate, wrapAsync(async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, status } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { title, description, dueDate, status },
    { new: true }
  );
  
  if (!updatedTask) {
    return res.status(404).send('Task not found');
  }

  res.redirect('/');
}));

app.delete('/tasks/:id/delete', wrapAsync(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return res.status(404).send('Task not found');
  }
  res.redirect('/');
}));

app.patch('/tasks/:id/complete', wrapAsync(async (req, res) => {
  const { id } = req.params;
  const updatedTask = await Task.findByIdAndUpdate(id, { status: 'completed' }, { new: true });

  if (!updatedTask) {
    return res.status(404).send('Task not found');
  }

  res.redirect(`/tasks/${id}`);
}));

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
