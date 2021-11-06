import React, { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const avg = (good - bad) / total
  const positivePercentage = good * 100 / total

  if (total > 0) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="all" value={total}/>
            <StatisticLine text="average" value={avg}/>
            <StatisticLine text="positive" value={positivePercentage + ' %'}/>
          </tbody>
        </table>
      </div>
    )
  }
  return <p>No feedback given</p>
  
}

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Button = ({ text, onClick }) => 
  <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button onClick={() => setGood(good + 1)} text="good"/>
        <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
        <Button onClick={() => setBad(bad + 1)} text="bad"/>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App