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

const port = 8000
server.listen(port, () => {
    console.log(`listening on server ${port}`)
})