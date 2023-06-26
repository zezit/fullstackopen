const express = require('express')
var morgan = require('morgan')
const app = express()

const mongoose = require('mongoose')

const userDB = process.env.USER_DB
const passwordDB = process.env.PASSWORD_DB

const url =
    `mongodb+srv://${userDB}:${passwordDB}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'HTML is Easy',
    important: true,
})

note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
morgan.token('body', req => {
    return JSON.stringify(req.body)
})

let data = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const generateNewPersonId = () => Math.round(Math.random() * 999E17)

const personExists = (personId) => {
    return data.find(each => each.id === personId) ? false : true
}

app.get('/api/persons', (request, response) => {
    response.json(data)
})

app.get('/api/persons/:id', (request, response) => {
    const person = data.filter(each => each.id === Number(request.params.id))

    if (person.length) {
        response.status(200)
            .json(person)
        return
    }

    response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    if (!personExists(id)) {
        const Newdata = data.filter(each => each.id !== id)

        data = Newdata
        response.status(204).end()
        return
    }

    response.status(404)
        .json({
            error: "Person not found"
        })
        .end()
})

app.post('/api/persons', (request, response) => {
    const person = request.body

    if (!person.name || !person.number) {
        response.status(400)
            .json({
                error: "Name or number missing"
            })
            .end()
        return
    }

    if (data.find(each => each.name.toLocaleLowerCase() === person.name.toLocaleLowerCase())) {
        response.status(400)
            .json({
                error: "Name already exists"
            })
            .end()
        return
    }

    const newPerson = {
        id: generateNewPersonId(),
        ...person
    }

    data.push(newPerson)

    response.status(200)
        .json(newPerson)
        .end()
})

app.get('/info', (request, response) => {
    const header = `
    <p>Phonebook has infor for ${data.length} people</p>
    `
    const date = new Date()
    response.send(header + date)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})