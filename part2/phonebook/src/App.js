import React, { useEffect, useState } from 'react'
import personService from './services/person'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
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
    filter === ''
      ? persons
      : persons.filter(
          person => person.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0
        )

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification(null)
    }, 5000)

    return () => {
      clearTimeout(timeout)
    }
  }, [notification])

  const addNewPerson = e => {
    e.preventDefault()

    const existingPerson = contactExists(newName)

    if (!existingPerson) {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      personService.create(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')

        setNotification({
          type: 'success',
          message: `Added ${returnedPerson.name}`,
        })
      }).catch(error =>  {
        setNotification({
          type: 'error',
          message: error.message
        })
        console.log(error);

      })
    } else {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if (confirm) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        const id = existingPerson.id
        personService
          .update(id, updatedPerson)
          .then(returnedPerson => {
            setPersons(prevState => {
              return prevState.map(person =>
                person.id !== id ? person : returnedPerson
              )
            })
            setNotification({
              type: 'success',
              message: `Edited ${newName}'s number`,
            })
          })
          .catch(error => {
            setNotification({
              type: 'error',
              message: `Information of ${newName} has already been deleted from server`,
            })
            setPersons(prevState => {
              return prevState.filter(person => person.id !== id)
            })
          })
          .finally(() => {
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }

  const deletePersonHandler = person => {
    const confirm = window.confirm(`Delete ${person.name} ?`)

    if (confirm) {
      personService.delete(person.id).then(() => {
        setPersons(prevState => {
          return prevState.filter(p => p.id !== person.id)
        })
      })
    }
  }

  const contactExists = name => {
    return persons.find(person => person.name === name)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      {notification !== null && <Notification notification={notification} />}
      <Filter onChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addNewPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h1>Numbers</h1>
      <Persons persons={personsToShow} onDelete={deletePersonHandler} />
    </div>
  )
}

export default App
