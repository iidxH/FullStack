const Header = ({ name }) => {
	console.log(name)
	return (
		<h2>{name}</h2>
	)
}

const Part = ({ name, exec }) => {
	console.log(name)
	console.log(exec)
	return (
		<p>
		{name} {exec}
		</p>
	)
}

const Content = ({ parts }) => {
	console.log(parts)
	return (
		<>
		  {parts.map(part => 
			<Part key={part.id} name={part.name} exec={part.exercises}/>)}
		</>
	)
}

const Total = ({ parts }) => {
	console.log('All parts:', parts)
	const total = parts.reduce((sum, part) => sum + part.exercises, 0)
	return (
		<p>	<b>
		total of exercises	{total}
		</b></p>
	  )
	}


const Course = ({ course }) => {
  return (
	<div>
		<Header name={course.name}/>
		<Content parts={course.parts}/>
		<Total parts={course.parts}/>
	</div>	
  )
}

export default Course