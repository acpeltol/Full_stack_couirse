import { useState } from 'react'

const StatisticLine = (props) => {
  return(
    <tr>
      <td> {props.text}</td> 
      <td>{props.value}</td>
    </tr>
    )
}

const Button = ({handleClick, text}) => (
    <button onClick = {handleClick}>{text}</button>
  )


const Statistics = (props) => {
  const {good, bad, neutral, total, averagedevider} = props
  if (total > 0){
  return(
    <>
    <table>
      <tbody>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={total}/>
      <StatisticLine text="average" value={averagedevider/ total}/>
      <StatisticLine text="positive" value={(good / total) * 100}/>
      </tbody>
    </table>
    </>
  )}
  else{
    return(
    <div>
      <p>No feedback given</p>
    </div>)
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const[averagedevider, setAveragedevider] = useState(0)

  const handleGood = () =>{
    setAveragedevider(averagedevider + 1)
    setGood(good + 1)
    setTotal(total + 1)
  }

  const handleNeutral = () =>{
    setTotal(total + 1)
    setNeutral(neutral + 1)
  }

  const handleBad = () =>{
    setAveragedevider(averagedevider - 1)
    setBad(bad + 1)
    setTotal(total + 1)
  }





  return (
    <div>
      <h2>Give feedback</h2>

      <Button handleClick={handleGood} text = "Good"/>
      <Button handleClick={handleNeutral} text = "Neutral"/>
      <Button handleClick={handleBad} text = "Bad"/>


      <h2>Statistics</h2>

      <Statistics good= {good} neutral = {neutral} bad = {bad}
      total = {total} averagedevider = {averagedevider}/>

      
      

    </div>
  )
}

export default App