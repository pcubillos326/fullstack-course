import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterByName, setFilterByName] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        const persons = response.data
        setPersons(persons)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())){
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
  }

  const handleNewName = (event) => {
    const name = event.target.value
    setNewName(name)
  }

  const handleNewNumber = (event) => {
    const number = event.target.value
    setNewNumber(number)
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
      <PersonsList persons={filterPersons} />
    </div>
  )
}

export default App