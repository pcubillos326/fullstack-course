import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterByName, setFilterByName] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const sameName = (person) => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
    if(persons.some(person => sameName(person))){
      const shouldReplace = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(!shouldReplace) return

      const person = persons.find(p => sameName(p))
      const updatedPerson = {
        ...person,
        number: newNumber
      }
      personsService
        .updatePerson(updatedPerson)
        .then(person => setPersons(persons.map(p => p.id === person.id ? person : p)))
    }else{
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personsService
        .addPerson({person: newPerson})
        .then(person => setPersons(persons.concat(person)))
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
    if(!window.confirm(`Delete ${person.name}?`)){
      return
    }
    personsService.deletePerson(person.id).then(_person => setPersons(persons.filter(p => p.id !== _person.id)))
  }
  const filterPersons = filterByName 
    ? persons.filter(person => person.name.toLocaleLowerCase().includes(filterByName.toLocaleLowerCase())) 
    : persons


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filterByName} handleFilter={(e) => setFilterByName(e.target.value)} />
      <h3>Add a new</h3>
      <PersonForm 
        name={newName} 
        number={newNumber} 
        handleName={handleNewName} 
        handleNumber={handleNewNumber} 
        handleForm={handleSubmit} 
      />
      <h3>Numbers</h3>
      <PersonsList persons={filterPersons} handleDelete={handleDeletePerson}/>
    </div>
  )
}

export default App