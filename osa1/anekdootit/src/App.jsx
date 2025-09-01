import { useState } from 'react'

const Button = (props) => (
	<button onClick={props.onClick}>
	  {props.text}
	</button>
  )

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  let mostVotes = votes.indexOf(Math.max(...votes));

  const nextAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
	console.log('uusi anekdootti', random)
  }

  const voteAnecdote = () => {
	console.log('äänestetty anekdootti:', selected)
	console.log('alkuperäinen taulukko', votes)
	const copy = [...votes]
	copy[selected] += 1
	setVotes(copy)
	console.log('uusi taulukko', copy)
  }

  if (votes[mostVotes] === 0) { 
	return (
		<div>
			<h1>Anecdote of the day</h1>
			{anecdotes[selected]}<br></br>
			<Button onClick={voteAnecdote} text="vote" />
			<Button onClick={nextAnecdote} text="next anecdote" />
			<h1>Anecdote with most votes</h1>
			no votes yet
		</div>
	)
  }

  return (
    <div>
		<h1>Anecdote of the day</h1>
		{anecdotes[selected]}<br></br>
		<Button onClick={voteAnecdote} text="vote" />
		<Button onClick={nextAnecdote} text="next anecdote" />
		<h1>Anecdote with most votes</h1>
		{anecdotes[mostVotes]}<br></br>
		has {votes[mostVotes]} votes
    </div>
  )
}

export default App