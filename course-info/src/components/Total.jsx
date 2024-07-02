const Total = (props) => {
  return (
    <section>
      <p>Number of exercises {props.parts.reduce((prev, curr) => prev + curr.exercises, 0)}</p>
    </section>
  )
}

export default Total