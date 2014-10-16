'use strict'

express = require 'express'
app = express()

path = require 'path'


knex = require('knex')(
    client: 'pg',
    connection: "what the heck?"
)

bookshelf = require('bookshelf')(knex);

User = bookshelf.Model.extend
    tableName: 'users'

app.use express.static path.join __dirname, '..', '..', 'static'

server = app.listen 5000, ->

    host = server.address().address
    port = server.address().port

    console.log "Example app listening at http://#{host}:#{port}"


    ################
    #### ROUTES ####
    ################

templates = require './templates'

app.route '/'
    .get (req, res) ->
        res.end templates.index {}
