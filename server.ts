import expres from 'express'
import {Express,json} from 'express'
import bodyParser from "body-parser"
import dotenv from 'dotenv'
import { urlencoded } from 'body-parser'
import allRoute from './src/router'
import db from './src/models'
import multer from 'multer'

const upload = multer()

const app:Express = expres()
const indexRoute:expres.Router = allRoute
dotenv.config()

app.use(expres.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(upload.none())


app.use('/api/v1',indexRoute)

db.sequelize.sync({logging: false}).then(()=>console.log('sync'))

const port:any = process.env.PORT || 3000
const server = app.listen(port,"0.0.0.0", ()=>{
    console.log(`RUN SERVER ${port}`)

})