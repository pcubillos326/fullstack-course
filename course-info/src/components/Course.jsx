import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({course}) => {
  return <div>
    <Header course={course.name}/>
    <main>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </main>
  </div>
}

export default Course