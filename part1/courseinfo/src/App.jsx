const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercise1 = 10;
  const part2 = "Using props to pass data";
  const exercise2 = 7;
  const part3 = "State of a component";
  const exercise3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        exercise1={exercise1}
        part2={part2}
        exercise2={exercise2}
        part3={part3}
        exercise3={exercise3}
      />
      <Total
        exercise1={exercise1}
        exercise2={exercise2}
        exercise3={exercise3}
      />
    </div>
  );
};

const Header = (props) => {
  console.log(props);

  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Part = ({ name, exercise }) => {
  console.log({ name, exercise });

  return (
    <>
      <p>
        {name} {exercise}
      </p>
    </>
  );
};

const Content = (props) => {
  console.log(props);

  return (
    <>
      <Part name={props.part1} exercise={props.exercise1} />
      <Part name={props.part2} exercise={props.exercise2} />
      <Part name={props.part3} exercise={props.exercise3} />
    </>
  );
};

const Total = ({ exercise1, exercise2, exercise3 }) => {
  console.log({ exercise1, exercise2, exercise3 });
  return (
    <>
      <p>Number of exercises {exercise1 + exercise2 + exercise3}</p>
    </>
  );
};
export default App;
