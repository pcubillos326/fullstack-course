import Part from "./Part"

const Content = (props) => {
  return (
    <section>
      {props.parts.map(el => <Part key={el.name} name={el.name} exercises={el.exercises} />)}
    </section>
  )
} 

export default Content