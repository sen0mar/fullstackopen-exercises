import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGoodFeedback = () => {
    setGood(good + 1);
  };

  const addNeutralFeedback = () => {
    setNeutral(neutral + 1);
  };

  const addBadFeedback = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="Good" onClick={addGoodFeedback} />
      <Button text="Neutral" onClick={addNeutralFeedback} />
      <Button text="Bad" onClick={addBadFeedback} />
      <h1>Statistics</h1>
      <Statistic text="Good" rating={good} />
      <Statistic text="Neutral" rating={neutral} />
      <Statistic text="Bad" rating={bad} />
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistic = ({ text, rating }) => {
  return (
    <div>
      {text}:{rating}
    </div>
  );
};

export default App;
