const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');

const morgan = require('morgan');

morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
});

app.use(cors());

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.use(express.static('build'));

app.use(express.json());

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const getPersonById = id => {
  return persons.find(p => p.id === Number(id));
};

const getPersonByName = name => {
  return persons.find(p => p.name === name);
};

const generateId = () => {
  return Math.floor(Math.random() * 1000);
};

app.get('/info', (req, res) => {
  const time = new Date().toString();
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${time}</p>`
  );
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const person = getPersonById(req.params.id);

  if (!person) {
    res.status(404).json({ message: 'No person found with the given id!' });
  } else {
    res.json(person);
  }
});

app.post('/api/persons', (req, res) => {
  const person = req.body;

  if (!person.name || !person.number) {
    res.status(400).send({ error: 'Name and number are required!' });
    return;
  }

  if (getPersonByName(person.name)) {
    res.status(409).send({ error: 'Name must be unique!' });
    return;
  }

  person.id = generateId();

  persons = persons.concat(person);

  res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const person = getPersonById(req.params.id);

  if (!person) {
    res.status(404).json({ message: 'No person found with the given id!' });
  } else {
    persons = persons.filter(p => p.id !== person.id);
    res.status(204).end();
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
