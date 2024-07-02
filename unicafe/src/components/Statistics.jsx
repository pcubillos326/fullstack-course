import { StatisticLine } from "./StatisticLine"

export const Statistics = ({ good, neutral, bad}) => {
  const all = good + neutral + bad
  if(all === 0){
    return <p>No feedback given</p>
  }
  return (
    <section>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <tr>
            <StatisticLine text={"Good"} value={good} />
          </tr>
          <tr>
            <StatisticLine text={"Neutral"} value={neutral} />
          </tr>
          <tr>
            <StatisticLine text={"Bad"} value={bad} />
          </tr>
          <tr>
            <StatisticLine text={"All"} value={all} />
          </tr>
          <tr>
            <StatisticLine text={"Average"} value={(good-bad) / all} />
          </tr>
          <tr>
            <StatisticLine text={"Positive"} value={`${(good / all)*100}%`} />
          </tr>
        </tbody>
      </table>
    </section>
  )
}