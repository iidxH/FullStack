
import { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')
  const [notification, setNotification] = useState('')
  const [error, setError] = useState('')

    useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
			console.log('Fetched persons:', initialPersons)
        	setPersons(initialPersons)
      	})
  }, [])

  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
		event.preventDefault()
		console.log('button clicked', event.target)
		const personObject = {
			name: newName,
			number: newNumber,
		}

		console.log(personObject)

		if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase() 
			& person.number === newNumber)) {
				alert(`${newName} is already added to phonebook`)
		} else if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase() 
			& person.number !== newNumber)) {
				if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

					const person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
					console.log('Person: ', person)
					const id = person.id
						personService
						.update(id, personObject)
						.then(returnedPerson => {
							setPersons(persons.map(person => (person.id !== id ? person : returnedPerson)))
							setNewName('')
							setNewNumber('')
							setFiltered('')
							setNotification(
								`Changed number of ${personObject.name} to ${personObject.number}`
							)
							setTimeout(() => {
								setNotification(null)
							}, 5000)
						})
						.catch(error => {
							if (error.response && error.response.status === 404) {
								setError(`Information of ${newName} has already been removed from server`)
							setTimeout(() => {
								setError(null)
							}, 5000)
							setPersons(persons.filter(person => person.id !== id))
							}
							
						})
						
				}
			
			} else {
				personService
				.create(personObject)
				.then(returnedPerson => {
					setPersons(persons.concat(returnedPerson))
					setNewName('')
					setNewNumber('')
					setFiltered('')
					setNotification(
						`Added ${personObject.name}`
					)
					setTimeout(() => {
          				setNotification(null)
        			}, 5000)
					
			})
		}
  }

const deletePerson = (id) => {
  const personToDelete = persons.find(person => person.id === id)
  const name = personToDelete.name

  if (window.confirm(`Delete ${name}?`)) {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
		setNotification(
			`Removed ${name}`
		)
		setTimeout(() => {
        	setNotification(null)
        }, 5000)
      })
  }
};

    const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

    const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

    const handleFilterChange = (event) => {
    //console.log(event.target.value)
	setFiltered(event.target.value)
  }

	const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes((filtered).toLowerCase())    
  )

  return (
    <div>
	  <h2>Phonebook</h2>
	    {notification && <Notification message={notification} />}
		{error && <Error message={error} />}
		<Filter filterHandler={handleFilterChange}/>
      <h2>Add a new</h2>
		<PersonForm name={newName} number={newNumber} addPerson={addPerson} nameHandler={handleNameChange} numberHandler={handleNumberChange}/>
      <h2>Numbers</h2>
	  	<ul>
		  {personsToShow.map(person => 
          <Persons person={person} key={person.id} deletePerson={deletePerson}/>
        )}
		</ul>
    </div>
  )

}

export default App