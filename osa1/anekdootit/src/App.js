import { useState } from 'react'

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>
	  {text}
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

  const [points, setPoints] = useState(Array(7).fill(0))

  let largest = Math.max.apply(0, points);

  let index = points.indexOf(Math.max(...points));

  console.log(points)
  console.log('suurin määrä ääniä: ', largest)
  console.log('suurimman luvun indeksi: ', index)

  const nextAnecdote = () => {
	const random = Math.floor(Math.random() * (6 - 0 + 1) ) + 0;
	console.log('arvottu luku: ', random)
	setSelected(random)
  }

  const voteAnecdote = () => {
	const copy = [...points]
	copy[selected] += 1
	setPoints(copy)
  }

  if (largest === 0) {
	return (
		<div>
		<h1>Anecdote of the day</h1>
		{anecdotes[selected]} <br/>
		has {points[selected]} votes <br/> 
		<Button handleClick={voteAnecdote} text="vote"/>
		<Button handleClick={nextAnecdote} text="next anecdote"/>
    </div>
	)
  }

  return (
    <div>
		<h1>Anecdote of the day</h1>
		{anecdotes[selected]} <br/>
		has {points[selected]} votes <br/> 
		<Button handleClick={voteAnecdote} text="vote"/>
		<Button handleClick={nextAnecdote} text="next anecdote"/>
		<h1>Anecdote with most votes</h1>
		{anecdotes[index]} <br/> 
		has {largest} votes
    </div>
  )
}

export default App