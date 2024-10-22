const Header = ({name}) => {
    return(
    <>
      <h1>{name}</h1>
    </>)
  }
  
  
  const Content = ({parts}) => {
    return(
    <>
      {parts.map(part => 
        <Part key = {part.id} part = {part.name} exercises = {part.exercises}/>)}
    </>)
  
  }
  
  const Part = (props) => {
    return(
    <>
    <p>{props.part} {props.exercises}</p>
  
    </>)
  
  }
  
  
  const Total = ({parts}) => {
  
    const part_nums = parts.map(part => part.exercises)
  
    const total = part_nums.reduce((s, p) => s + p, 0)
  
    return(
      <>
      <p>total of {total} exercises</p>
      </>
    )
  
  }
  
  const Course = ({course}) => {
      return(
        <div>
          <Header name = {course.name}/>
          <Content parts = {course.parts}/>
          <Total parts = {course.parts}/>
        </div>
      )
  }

export default Course;