const PersonForm = ({ name, number, handleName, handleNumber, handleForm}) => {
  return ( 
    <form onSubmit={handleForm}>
      <div>
    name: <input value={name} onChange={handleName}/>
      </div>
      <div>number: <input value={number} onChange={handleNumber}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm