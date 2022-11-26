import db from '../../models'
import  { Request,Response } from 'express'
import jwt from 'jsonwebtoken'
import { cookie } from 'express-validator'
const User = db.User


export default class userController{
    constructor(){}

    creatUser = async(req:Request,res:Response):Promise<Response> => {
     const { firstName,lastName,email,password} = req.body
     const user = await  User.create({firstName,lastName,email,password})
     return res.status(200).json(user)
    }

    findAll = async(req:Request,res:Response):Promise<Response> =>{
        const user = await User.findAll()
        return res.status(200).json(user)
    }

    login = async(req:Request,res:Response) =>{
        const email =  req.body.email
        const password =req.body.password


        const user = await User.findOne({where:{email: email}})
        console.log(user)
        if(password == user.dataValues.password){

            const id = user.dataValues.id
            const secret:any = process.env.SECRET
            const token =  jwt.sign({ email, password,id }, secret)
            res.send({token:token})
            cookie("jwt",token)
        }else{
            res.status(404).send('not found')
        }


    }


}