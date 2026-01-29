import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGoodFeedback = () => setGood(good + 1);

  const addNeutralFeedback = () => setNeutral(neutral + 1);

  const addBadFeedback = () => setBad(bad + 1);

  const all = good + neutral + bad;
  const totScore = good - bad;

  const average = all === 0 ? 0 : totScore / all;
  const positive = all === 0 ? 0 : (good / all) * 100;

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="Good" onClick={addGoodFeedback} />
      <Button text="Neutral" onClick={addNeutralFeedback} />
      <Button text="Bad" onClick={addBadFeedback} />
      <h1>Statistics</h1>
      {all === 0 ? (
        <div>No feedback given</div>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="Good" rating={good} />
            <StatisticLine text="Neutral" rating={neutral} />
            <StatisticLine text="Bad" rating={bad} />
            <StatisticLine text="All" rating={all} />
            <StatisticLine text="Average" rating={average.toFixed(2)} />
            <StatisticLine
              text="Positive Feedback"
              rating={`${positive.toFixed(1)}%`}
            />
          </tbody>
        </table>
      )}
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, rating }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{rating}</td>
    </tr>
  );
};

export default App;
