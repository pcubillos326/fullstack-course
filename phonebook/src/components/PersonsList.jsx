import Person from "./Person"

const PersonsList = ({persons}) => (
  persons.map(person => <Person key={person.id}  person={person} />)
)

export default PersonsList