import { useState } from 'react'

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>
	  {text}
	</button>
  )

const StatisticLine = ({ text, value, text2 }) => {
	return (
	  <tr><td>{text}</td> <td>{value} {text2}</td></tr>
	)
  }

const Statistics = (props) => {
	return (
		<div>
		  <table>
		    <tbody>
			  <StatisticLine value={props.good} text="good" />
		  	  <StatisticLine value={props.neutral} text="neutral"/>
		      <StatisticLine value={props.bad} text="bad" />
		      <StatisticLine value={props.all} text="all" />
		      <StatisticLine value={props.average.toFixed(1)} text="average" />
		      <StatisticLine value={props.positive.toFixed(1)} text="positive" text2="%"/>
		    </tbody>
		  </table>
		</div>
	)

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
	setAll(all + 1)
	setAverage(((good+1)-bad)/(all+1))
	setPositive((good+1)/(all+1)*100)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
	setAll(all + 1)
	setAverage((good-bad)/(all+1))
	setPositive(good/(all+1)*100)
  }

  const handleBad = () => {
    setBad(bad + 1)
	setAll(all + 1)
	setAverage((good-(bad+1))/(all+1))
	setPositive(good/(all+1)*100)
  }

  console.log('good: ', good)
  console.log('bad: ', bad)
  console.log('neutral: ', neutral)
  console.log('all: ', all)
  console.log('average: ', average)
  console.log('positive: ', positive)

  if (all===0) {
	  return (
    <div>
		<h1>Give feedback</h1>
		<Button handleClick={handleGood} text="good" />
		<Button handleClick={handleNeutral} text="neutral" />
		<Button handleClick={handleBad} text="bad" />
		<h1>Statistics</h1>
		<p>No feedback given</p>
    </div>
  )

  }
  return (
    <div>
		<h1>Give feedback</h1>
		<Button handleClick={handleGood} text="good" />
		<Button handleClick={handleNeutral} text="neutral" />
		<Button handleClick={handleBad} text="bad" />
		<h1>Statistics</h1>
		<Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App