require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const errorHandler = require('./middlewares/error-handler')
const Person = require('./models/person');

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

const getPersonByName = name => {
  return persons.find(p => p.name === name);
};

app.get('/info', (req, res) => {
  const time = new Date().toString();
  Person.estimatedDocumentCount().then(result => {
    res.send(`<p>Phonebook has info for ${result} people</p><p>${time}</p>`);
  })

});

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons);
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
});

app.post('/api/persons', async (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    res.status(400).send({ error: 'Name and number are required!' });
    return;
  }

  const personExists = await Person.exists({ name: body.name })

  if (personExists) {
    res.status(409).send({ error: 'Name must be unique!' });
    return;
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson);
  }).catch(error => next(error))
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findOneAndUpdate({ name: person.name }, person, { new: true, runValidators: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
