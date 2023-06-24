const express = require('express')
const app = express()
app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

const generateNewNoteId = () => {
  return (notes.length > 0
    ? Math.max(...notes.map(n => n.id)) + 1
    : 0)
}

app.get('/', (request, response) => {
  response
    .send(`
  <h1>Hello World!</h1>
  <p>There are ${notes.length} notes in the list</p>
  <a href="/api/notes">Go to /api/notes</a>
  `)
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  }
  else {
    response.status(404).json({
      error: 'Note not found'
    })
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  let deleted = null
  notes = notes.filter(note => {
    if (note.id === id) deleted = note
    return note.id !== id
  })

  if (deleted !== null) {
    response
      .status(204)
      .end()
  }
  else {
    response.status(404).json({
      error: 'Note not found'
    })
  }
})

app.post('/api/notes', (request, response) => {
  if (!request.body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = request.body

  console.log("Note received: ", note)

  const newNote = {
    id: generateNewNoteId(),
    ...note
  }

  notes.push(newNote);
  response.json(newNote)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})