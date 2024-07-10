import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterByName, setFilterByName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())){
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {
      id: persons.length + 1,
      name: newName,
      phone: newPhone
    }
    setPersons(persons.concat(newPerson))
  }

  const handleNewName = (event) => {
    const name = event.target.value
    setNewName(name)
  }

  const handleNewPhone = (event) => {
    const phone = event.target.value
    setNewPhone(phone)
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
        phone={newPhone} 
        handleName={handleNewName} 
        handlePhone={handleNewPhone} 
        handleForm={handleSubmit} 
      />
      <h3>Numbers</h3>
      <PersonsList persons={filterPersons} />
    </div>
  )
}

export default App