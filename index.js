const express = require('express')
const shortid = require('shortid')
const { json } = require('express')

const server = express()

server.use(express.json())

let users = [
    {
        id: shortid.generate(),
        name: "Dee Downs",
        bio: '26 year old adulting and excited for her next nap'
    }
]

//GET all users
server.get('/api/users', (req, res) => {
    users ? res.status(200).json({ data: users}) : res.status(500).json({ errorMessage: "The users information could not be retrieved." })
})

//GET user by id
server.get('/api/users/:id', (req, res) => {
    const id = (req.params.id) 

    let found = users.find(user => user.id === id)

    if(found) {
        res.status(200).json(found)
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }

    try {
        res.status(200).json({ data: found })
    } catch (error) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
})

//POST new user
server.post('/api/users', (req, res) => {
    const user = req.body
    user.id = shortid.generate()
    users.push(user)
    user.name && user.bio ? res.status(201).json({ data: user }) : res.status(400).json({ Errormessage: 'Please provide name and bio for the user.'})
    try {
        res.status(201).json({ data: user })
    } catch (error) {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }

})

//DELETE user by id
server.delete('/api/users/:id', (req, res) => {
    const id = (req.params.id)
    users = users.filter(user => user.id != id)
    // res.status(204).end()

    if(!users) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }

    try {
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message:  "The user could not be removed" })
    }

    // res.status(200).json(users)
 
})

//PUT request
server.put('api/users/:id', (req, res) => {
    const changes = req.body
    const id = (req.params.id)

    let found = users.find(user => user.id === id)

    
    if(found) {
        Object.assign(found, changes)
        res.status(200).json(found)
    } else {
        res.status(404).json({ message: 'The user with the specified ID does not exist'})
    }

    // try {
    //     res.status(200).json(users)
    // } catch (error) {
    //     res.status(500).json({ errorMessage: "The user information could not be modified." })
    // }



})

const port = 8000
server.listen(port, () => {
    console.log(`listening on server ${port}`)
})