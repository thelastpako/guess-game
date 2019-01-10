const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json())
const server = app.listen(3001, function() {
    console.log('server running on port 3001');
});

const io = require('socket.io')(server);


app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true // enable set cookie
  }))


io.on('connection', function(socket) {
    if(socket.server.eio.clientsCount === 2){
        io.emit('rolesActive')
    }

    socket.on('setRole',(role) => {
        io.emit('setRole',role)
    })

    socket.on('imgReady', function(img,word,diff){
        io.emit('imgReady',img,word,diff)
    })

    socket.on('playerWon', function(){
        io.emit('playerWon')
    })

    socket.on('drawImage', () => {
        io.emit('draw')
    })
});

const addGameRoutes = require('./routes/gameRoutes')

addGameRoutes(app)

    // if(!this.painter){
    //     this.painter = socket.id
    //     io.to(socket.id).emit('role', 'painter');
    //     console.log('the painter',this.painter)
    //     return;
    // } else {
    //     if(!this.gueeser){
    //         this.gueeser = socket.id
    //         io.to(socket.id).emit('role', 'gueeser');
    //         console.log('the gueeser',this.gueeser)
    //         return;
    // }
    // }
