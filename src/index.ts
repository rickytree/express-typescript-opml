import express, { Application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './router'

//For env File 
dotenv.config()

const app: Application = express()
const port = process.env.PORT || 3000

// Set up cors
app.use(cors())

// Set up body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Set up router
app.use('/', router)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})