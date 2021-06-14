require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

class Server {
  constructor () {
    this.api = express()
    this.router = '/api'

    this.middleware()
    this.routers()
    this.database()
  }

  database () {
    mongoose
      .connect(process.env.MONGO_URL,
        {
          dbName: process.env.MONGO_DB,
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true
        }, err => {
          if (err) { throw new Error(err) }
          console.info('Connected to Mongo Database \n')
          console.info('>'.repeat(40))
          console.info('   Project 2 Server Live')
          console.info(`   PORT: hhtp://localhost:${process.env.PORT}`)
          console.info('>'.repeat(40) + '\n')
        })
  }

  middleware () {
    this.api.use(cors())
    this.api.use(morgan('dev'))
    this.api.use(express.json())
  }

  routers () {
    this.api.use(this.router, require('./routers/index'))
  }

  listen () {
    this.api.listen(process.env.PORT, () => {
      console.log('Running server')
    })
  }
}

module.exports = Server
