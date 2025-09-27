const Persons = ( props ) => {
	console.log('Person: ', props)
	return (
		<li key={props.person.id}>{props.person.name} {props.person.number} 
		<button onClick={() => props.deletePerson(props.person.id)}>delete</button></li>
	)
}

export default Persons