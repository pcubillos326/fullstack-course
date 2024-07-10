const Total = (props) => {
  return (
    <section>
      <p><strong>Number of exercises {props.parts.reduce((prev, curr) => prev + curr.exercises, 0)}</strong></p>
    </section>
  )
}

export default Total