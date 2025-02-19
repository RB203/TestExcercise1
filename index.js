// const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')


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

// const app = http.createServer((request, response) => {
  // response.writeHead(200, { 'Content-Type': 'application/json' })
  // response.end(JSON.stringify(notes))
  // })
  
  app.use(express.json())
  
  app.use(cors())

  app.use(express.static('dist'))
  
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/notes', (request, response) => {
    response.json(notes)
  })
  
  app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
      response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

// app.post('/api/notes', (request, response) => {
//   const note = request.body
//   console.log(note)
//   response.json(note)
// })


app.post('/api/notes', (request, response) => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id)) 
    : 0

  const note = request.body
  note.id = maxId + 1

  notes = notes.concat(note)

  response.json(note)
})

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)
const PORT = process.env.PORT || 3033
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})