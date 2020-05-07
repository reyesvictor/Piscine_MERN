const express = require('express')

const app = express()

const port = process.env.PORT || 4242
process.env.NODE_ENV = 'development'
const hostname = 'localhost'

app.get('/', (request, response) => {
  if (process.env.NODE_ENV === 'development') {
    response.send(`Welcome to my NODEMON API in delevelopment mode ! Hostname is ${hostname}`)
  }
})

app.listen(port, hostname, () => {
  console.log(`Running on port ${port}`)
})
