export default function Course({ course }) {
  const sum = course.parts.reduce((acc, curr) => acc + curr.exercises, 0);
  console.log(sum);
  return (
    <div>
      <h1>{course.name}</h1>
      <div>
        {course.parts.map((part) => (
          <p key={part.id}>
            {part.name}: {part.exercises}
          </p>
        ))}
      </div>
      <p>
        <strong>{`Total of ${sum} exercises`}</strong>
      </p>
    </div>
  );
}
