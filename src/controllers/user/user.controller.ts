import db from "../../models";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { cookie } from "express-validator";
const User = db.User;

export default class userController {
  constructor() {}

  creatUser = async (req: Request, res: Response): Promise<Response> => {
    const {
      firstName,
      lastName,
      email,
      date_of_birth,
      conform_password,
      password,
      version,
      model,
    } = req.body;

    

    if (password == conform_password) {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        date_of_birth,
        version,
        model,
      });
      return res.status(200).json(user);
    } else {
      return res.status(500).send("internal server error");
    }
  };

  findAll = async (req: Request, res: Response): Promise<Response> => {
    const user = await User.findAll();
    return res.status(200).json(user);
  };

  login = async (req: Request, res: Response) => {

    try {
        const email = req.body.email;
        const password = req.body.password;
    
        const user = await User.findOne({ where: { email: email } });
      
        if (password == user.dataValues.password) {
          const id = user.dataValues.id;
          const secret: any = process.env.SECRET;
          const token:any = jwt.sign({ email, password, id }, secret);
          cookie('jwt',token)
          res.status(200).send({ token: token });
        } else {
          res.status(401).send("unauthorized ");
        }
        
    } catch (error) {
        res.send('some thing is wrong')
    }
   
  };

  delete = async(req:Request,res:Response):Promise<Response> =>{
    try {
        const cookie = req.body.token
        const decode:any =  jwt.decode(cookie)
        User.destroy({where:{id:decode.id}})
        return res.status(200).send("delete data")
        
    } catch (error) {
        return res.status(404).send("unauthorized ")
    }
  }

  update = async(req:Request,res:Response) =>{
    try {
        const cookie = req.body.token
        const decode:any =  jwt.decode(cookie)
        if(decode.seccess = 'true'){

            const data = await User.update(req.body,{where:{id:decode.id}})
            return res.status(200).send(data)
        }
        
    } catch (error) {
        return res.status(404).send("unauthorized ")
    }
  }
}

