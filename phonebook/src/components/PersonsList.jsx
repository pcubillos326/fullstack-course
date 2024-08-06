import Person from './Person'

const PersonsList = ({ persons, handleDelete }) =>
  persons.map((person) => (
    <Person key={person.id} person={person} handleDelete={() => handleDelete(person)} />
  ))

export default PersonsList
