const gameService = require('../services/gameService')

function addGameRoutes(app) {

    app.get('/words', (req,res) => {
        gameService.query()
            .then(words => res.json(words))
            .catch(console.log)
    })
}

module.exports = addGameRoutes;