require('dotenv').config()
const express = require('express')

const app = express()

const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

app.use(cors())

app.use(express.json())

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :response-time :body'))

app.get('/info', async (request, response) => {
  const count = await Person.find({})

  response.send(
    `<p>Phonebook has info for ${
      count.length || 0
    } people<br />${new Date()}</p>`
  )
})

app.get('/api/persons', async (request, response) => {
  try {
    const persons = await Person.find({})
    response.json(persons)
  } catch (error) {
    next(error)
  }
})

app.get('/api/persons/:id', async (request, response) => {
  const { id } = request.params
  try {
    const person = await Person.findById(id)
    if (!person) {
      return response.status(404).end()
    }
    response.json(person)
  } catch (error) {
    next(error)
  }
})

app.delete('/api/persons/:id', async (request, response, next) => {
  const { id } = request.params
  try {
    const person = await Person.findByIdAndDelete(id)
    console.log('a', person)
    response.status(204).json(person)
  } catch (error) {
    next(error)
  }
})

app.put('/api/persons/:id', async (request, response) => {
  const { id } = request.params
  const { name, number } = request.body
  try {
    const person = {
      name,
      number,
    }

    const updated = await Person.findByIdAndUpdate(id, person, { new: true })

    response.json(updated)
  } catch (error) {
    next(error)
  }
})

app.post('/api/persons', async (request, response) => {
  const { body } = request
  const { name, number } = body

  if (!name || !number) {
    return response.status(400).json({
      error: 'name and number are required',
    })
  }

  try {
    const person = new Person({
      name,
      number,
    })

    person.save().then(() => {
      response.json(person)
    })
  } catch (error) {
    next(error)
  }
})

const errorHandler = (error, request, response, next) => {
  console.log(error)
  if (error.name === 'CastError') {
    return response.status(400).json({
      error: 'malformed Id',
    })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
