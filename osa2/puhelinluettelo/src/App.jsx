import { useState, useEffect } from 'react'
import axios from 'axios'
import noteServise from './services/notes'

const Notefication = ({message}) => {

  if (message !== null){
    return(<div className="accept_mess">
      <h2>{message}</h2>
      </div>)
  }else{
    console.log("Hier fantastish")
  }
}

const Person = ({ deletePer,id, name, number, sub }) => {
  const bool = name.includes(sub)
  if (bool) {
    return (<>
      <p>{name} {number}
      <button onClick={() => deletePer(id)}>delete</button></p>
    </>)
  }
}

const Filter = ({ inWord, handleSearch }) => {
  return (
    <>
      filter shown with <input
        value={inWord}
        onChange={handleSearch}></input>
    </>
  )
}

const PersonForm = ({ addNote, newName, handleChange, newNumber, handleNewNumber }) => {
  return (
    <>
      <form onSubmit={addNote}>
        <div>

          name: <input value={newName}
            onChange={handleChange} />

        </div>
        <div>

          number: <input value={newNumber}
            onChange={handleNewNumber} />

        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Persons = ({ deletePer, persons, inWord }) => {
  return (
    <>
      {persons.map(person =>
        <Person key={person.id} id = {person.id} name={person.name}
          number={person.number}
          sub={inWord} deletePer = {deletePer}/>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [inWord, setinWord] = useState('')
  const [indexGiv, setindexGiv] = useState(0)
  const [accept_mess, setAcceptMess] = useState(null)

  useEffect(() => {
      noteServise.getAll().then(
        result => {setPersons(result)

          const largestIndex = result.reduce((max, person) => {
            return Math.max(max, Number(person.id));

          }, 0);

          setindexGiv(largestIndex)
        }
      )
  }, [])

  const deletPer = (id) => {
    noteServise.remove(id).then(response =>
    {
      setPersons(persons.filter
        (person => person.id !== id))

        setAcceptMess(`${response.name} has been deleted`)

        setTimeout(() =>{
          setAcceptMess(null)
              }, 2000)

    })
  }

  const addNote = (event) => {
    event.preventDefault()

    const foundItem = persons.find(perosn => perosn.name === newName)
    if (foundItem === undefined) {

      const ojbect = {
        name: newName,
        number: newNumber,
        id: String(indexGiv + 1),
      }

    setindexGiv(indexGiv + 1)

    noteServise.create(ojbect).then(response =>{
    console.log(response)   
    setPersons(persons.concat([response]))
  
    setNewName('')
    setNewNumber('')

    setAcceptMess(`${newName} has been added`)

    setTimeout(() =>{
      setAcceptMess(null)
          }, 2000)
  })
    }
    else {
      const bel = confirm(`${newName} is aleredy added to phonebook, Do you want change the number?`)
      if (bel){
        const get_id = persons.find(person => person.name === newName)
        const ojgect = {
          name: newName,
          number: newNumber,
          id: get_id.id, 
        }

        noteServise.change_num(get_id.id,ojgect).then(response =>
          { setPersons(persons.map(person => person.id !== get_id.id ? person : response))
            setNewName('')
            setNewNumber('')

            setAcceptMess(`${newName} number has been changed`)

            setTimeout(() =>{
              setAcceptMess(null)
          }, 2000)
          }).catch(error => {

            setNewName('')
            setNewNumber('')
            setAcceptMess(`${newName} has alredy been removed`)

            noteServise.getAll().then(
              result => {setPersons(result)
      
                const largestIndex = result.reduce((max, person) => {
                  return Math.max(max, Number(person.id));
      
                }, 0);
      
                setindexGiv(largestIndex)
              }
            )

            setTimeout(() =>{
              setAcceptMess(null)
          }, 2000)
          })
      }
    }
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setinWord(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notefication message={accept_mess}/>

      <Filter inWord={inWord} handleSearch={handleSearch} />

      <h2>Add New</h2>

      <PersonForm addNote={addNote} 
        newName={newName} handleChange={handleChange}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber} />

      <h2>Numbers</h2>
      <Persons deletePer = {deletPer} persons={persons} inWord={inWord} />
    </div>
  )

}

export default App
