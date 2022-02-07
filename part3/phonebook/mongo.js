const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://rui:${password}@cluster0.t3m2k.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

// Get persons
if (process.argv.length === 3) {
  console.log('Phonebook:');
  Person.find({})
    .then(persons => {
      persons.forEach(p => console.log(p));
    })
    .then(() => {
      mongoose.connection.close();
    });
} else {
  const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  newPerson.save().then(result => {
    console.log(
      `Added ${newPerson.name} number ${newPerson.number} to phonebook`
    );
    mongoose.connection.close();
  });
}
