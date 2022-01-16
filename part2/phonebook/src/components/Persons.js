const Persons = ({ persons, onDelete }) => {
  return (
    <ul>
      {persons.map(person => (
        <li key={person.name}>
          {person.name} {person.number}
          <button onClick={() => onDelete(person)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

export default Persons
