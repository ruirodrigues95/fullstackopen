import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }

  const handleSearchChange = e => {
    setFilter(e.target.value)
  }

  const personsToShow =
    filter === '' ? persons : persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0)

  const addNewPerson = e => {
    e.preventDefault()

    if (!contactExists(newName)) {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const contactExists = name => {
    return persons.find(person => person.name === name)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addNewPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
