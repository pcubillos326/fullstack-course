const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :response-time :body'))

let phonebook = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/info', (request, response) => {
  const count = phonebook.length
  response.send(
    `<p>Phonebook has info for ${count} people<br />${new Date()}</p>`
  )
})

app.get('/api/persons', (request, response) => {
  response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = phonebook.find((person) => person.id === id)
  if (!person) {
    return response.status(404).end()
  }
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const { id } = request.params
  phonebook = phonebook.filter((person) => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const { body } = request
  const { name, number } = body

  if (!name || !number) {
    return response.status(400).json({
      error: 'name and number are required',
    })
  }

  if (phonebook.find((person) => person.name === name)) {
    return response.status(400).json({
      error: 'name already exists',
    })
  }

  const newId = Math.floor(Math.random() * 1560).toString()
  const person = {
    id: newId,
    name,
    number,
  }
  phonebook = phonebook.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
