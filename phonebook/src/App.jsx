import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'
import personsService from './services/persons'
import { Notification } from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterByName, setFilterByName] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    personsService.getAll().then((persons) => setPersons(persons))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const sameName = (person) =>
      person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
    if (persons.some((person) => sameName(person))) {
      const shouldReplace = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
      if (!shouldReplace) return

      const person = persons.find((p) => sameName(p))
      const updatedPerson = {
        ...person,
        number: newNumber,
      }
      personsService
        .updatePerson(updatedPerson)
        .then((person) =>
          setPersons(persons.map((p) => (p.id === person.id ? person : p)))
        )
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      personsService.addPerson({ person: newPerson }).then((person) => {
        setNotification(`Added ${person.name}`)
        setNotificationType('success')
        setPersons(persons.concat(person))
        setTimeout(() => {
          setNotification(null)
          setNotificationType(null)
        }, 3000)
      })
    }
  }

  const handleNewName = (event) => {
    const name = event.target.value
    setNewName(name)
  }

  const handleNewNumber = (event) => {
    const number = event.target.value
    setNewNumber(number)
  }

  const handleDeletePerson = (person) => {
    if (!window.confirm(`Delete ${person.name}?`)) {
      return
    }
    personsService
      .deletePerson(person.id)
      .then(() => setPersons(persons.filter((p) => p.id !== person.id)))
      .catch(() => {
        setNotification(
          `Information of ${person.name} has already been deleted`
        )
        setNotificationType('error')
        setTimeout(() => {
          setNotification(null)
          setNotificationType(null)
        }, 3000)
      })
  }
  const filterPersons = filterByName
    ? persons.filter((person) =>
        person.name
          .toLocaleLowerCase()
          .includes(filterByName.toLocaleLowerCase())
      )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType} />
      <Filter
        filter={filterByName}
        handleFilter={(e) => setFilterByName(e.target.value)}
      />
      <h3>Add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        handleName={handleNewName}
        handleNumber={handleNewNumber}
        handleForm={handleSubmit}
      />
      <h3>Numbers</h3>
      <PersonsList persons={filterPersons} handleDelete={handleDeletePerson} />
    </div>
  )
}

export default App
