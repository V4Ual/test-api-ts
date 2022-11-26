import expres,{Express, json} from 'express'
import dotenv from 'dotenv'
import { urlencoded } from 'body-parser'
import allRoute from './src/router'
import db from './src/models'
const app:Express = expres()
const indexRoute:expres.Router = allRoute
dotenv.config()

app.use(expres.static('public'))
app.use(json())
app.use(urlencoded({extended:true}))
app.use('/api/v1',indexRoute)

db.sequelize.sync({logging: false}).then(()=>console.log('sync'))

const port:any = process.env.PORT || 3000
const server = app.listen(port,"0.0.0.0", ()=>{
    console.log(`RUN SERVER ${port}`)

})