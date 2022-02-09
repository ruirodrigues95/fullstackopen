const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(result => {
    console.log('connected to mongoDB');
  })
  .catch(error => {
    console.log('error connecting to mongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name must have at least 3 characters.'],
  },
  number: {
    type: String,
    minLength: [8, 'Phone number must have at least 8 digits.'],
    validate: {
      validator: (v) => /\d{2,3}-\d/.test(v),
    },
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
