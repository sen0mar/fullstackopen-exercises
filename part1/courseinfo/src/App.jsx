const App = () => {
  const course = {
    name: "Half Stack application development",

    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },

      {
        name: "Using props to pass data",
        exercises: 7,
      },

      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Parts course={course} />
      <Total course={course} />
    </div>
  );
};

const Header = ({ course }) => {
  console.log(course);

  return (
    <>
      <h1>{course.name}</h1>
    </>
  );
};

const Parts = ({ course }) => {
  console.log(course);

  return (
    <>
      <p>
        {course.parts[0].name} {course.parts[0].exercises}
      </p>
      <p>
        {course.parts[1].name} {course.parts[1].exercises}
      </p>
      <p>
        {course.parts[2].name} {course.parts[2].exercises}
      </p>
    </>
  );
};

const Total = ({ course }) => {
  console.log(course);

  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <p>
      <strong>Total: {total} exercises</strong>
    </p>
  );
};

export default App;
