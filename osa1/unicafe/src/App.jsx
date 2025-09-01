import { useState } from 'react'

const Button = (props) => (
	<button onClick={props.onClick}>
	  {props.text}
	</button>
  )

const StatisticsLine = (props) => (
	<td>
		{props.text} {props.value}
	</td>
)

const Statistics = (props) => {
	if (props.all === 0) {
		return (
			<>
				<h1>statistics</h1>
				<p>No feedback given</p>
			</>
		)
	} else {
		return (
			<>
				<h1>statistics</h1>		
					<table>	
						<tbody>
							<tr>
								<StatisticsLine value={props.good} text="good" />
							</tr>
							<tr>
								<StatisticsLine value={props.neutral} text="neutral" />
							</tr>
							<tr>
								<StatisticsLine value={props.bad} text="bad" />
							</tr>
							<tr>
								<StatisticsLine value={props.all} text="all" />
							</tr>
							<tr>
								<StatisticsLine value={props.average.toFixed(1)} text="average" />
							</tr>
							<tr>
								<StatisticsLine value={props.positive.toFixed(1) + " %"} text="positive" />
							</tr>
						</tbody>
					</table>
			</>
		)
	}
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] =  useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const setToGood = value => {
    console.log('hyvä', value)
    setGood(value)
	setAll(value + neutral + bad)
	setAverage((value - bad) / (all + 1))
	setPositive((value / (all + 1)) * 100)
  }

  const setToNeutral = value => {
    console.log('neutraali', value)
    setNeutral(value)
	setAll(good + value + bad)
	setAverage((good - bad) / (all + 1))
	setPositive((good / (all + 1)) * 100)
  }

  const setToBad = value => {
    console.log('huono', value)
    setBad(value)
	setAll(good + neutral + value)
	setAverage((good - value) / (all + 1))
	setPositive((good / (all + 1)) * 100)
  }

  return (
    <>
	  <h1>give feedback</h1>
      <Button onClick={() => setToGood(good + 1)} text="good" />
	  <Button onClick={() => setToNeutral(neutral + 1)} text="neutral" />
	  <Button onClick={() => setToBad(bad + 1)} text="bad" />
	  <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </>
  )
}

export default App