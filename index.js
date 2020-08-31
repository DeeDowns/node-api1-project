const express = require('express')
const shortid = require('shortid')

const server = express()

server.use(express.json())

let users = [
    {
        id: shortid.generate(),
        name: "Dee Downs",
        bio: '26 year old adulting and excited for her next nap'
    }
]

server.get('/api/users', (req, res) => {
    res.status(200).json({ data: users})
})

server.get('/api/users/:id', (req, res) => {
    const id = (req.params.id) 

    let found = users.find(user => user.id === id)

    if(found) {
        res.status(200).json(found)
    } else {
        res.status(400).json({ message: 'not found'})
    }
})

server.post('/api/users', (req, res) => {
    const user = req.body
    user.id = shortid.generate()
    users.push(user)
    user.name && user.bio ? res.status(201).json({ data: user }) : res.status(400).json({ message: 'provide name and bio'})
})

const port = 8000
server.listen(port, () => {
    console.log(`listening on server ${port}`)
})