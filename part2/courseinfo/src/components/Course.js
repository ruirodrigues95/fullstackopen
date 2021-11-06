const Header = props => <h1>{props.courseName}</h1>

const Content = ({ parts }) => (
  <>
    {parts.map(part => (
      <Part key={part.id} name={part.name} numExercises={part.exercises} />
    ))}
  </>
)

const Total = ({ parts }) => {
  const sum = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p>Number of exercises {sum}</p>
}

const Part = props => (
  <p>
    {props.name} {props.numExercises}
  </p>
)

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
