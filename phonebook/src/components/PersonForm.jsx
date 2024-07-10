const PersonForm = ({ name, phone, handleName, handlePhone, handleForm}) => {
  return ( 
    <form onSubmit={handleForm}>
      <div>
    name: <input value={name} onChange={handleName}/>
      </div>
      <div>number: <input value={phone} onChange={handlePhone}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm