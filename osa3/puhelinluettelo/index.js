const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

// Define a custom token to log the request body
morgan.token('body', (req) => JSON.stringify(req.body));

// Use a single morgan middleware with custom format and skip logic
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  skip: function (req, res) {
    return req.originalUrl.startsWith('/.well-known/')
  }
}))

/*app.use(morgan('tiny', {
  skip: function (req, res) {
    return req.url.startsWith('/.well-known/');
  }
}))*/

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
    {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
]

const generateId = () => {
  const id = Math.floor(Math.random()*100000)
  console.log("Id: ", id)
  return id
}

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people <br /><br /> ${Date()} </p>`)
  console.log('Taulukon koko: ', persons.length)
  console.log('Aika: ', Date())
})

app.get('/api/persons', (request, response) => {
  console.log(persons)
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  console.log("Haettu henkilö: ", person)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
	console.log("Nimi puuttuu")
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

    if (!body.number) {
	console.log("Numero puuttuu")
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

    if (persons.find(person => person.name === body.name)) {
	console.log("Henkilö on jo lisätty")
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
	id: generateId(),
    name: body.name,
    number: body.number
  }

  console.log("Lisätty henkilö: ", person)
  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id
    persons = persons.filter(person => person.id !== id)
	console.log("Poistetun henkilön id: ", id)
    response.status(204).end()

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})