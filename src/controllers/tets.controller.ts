import bcrypt from "bcryptjs";
import { prisma } from '../db/db';
import { NextFunction, Request, Response } from 'express';
import jwt from '../utils/jwt';
import { AuthInput } from "types";
import { validateUserSchema } from "../schemas/zod";

export const signin = async (req: Request, res: Response)=>{
   try{
       const {email, password} = req.body
       const user:any  = await prisma.user.findUnique({ where: { email } })
       
       if(!user){
          res.status(400).json({message: 'User no exists'})
       }

       const validPassword = await bcrypt.compare(password, user.password);
       if(!validPassword){
          res.status(401).json({message: "password don't match"})
       }

       const token = jwt.sign({ id: user.id, email: user.email });
       res.set({
         "Content-Type" : "application/json",
         "Access-Control-Allow-Origin" : "*"
       })
       res.status(201).json({ response:{token} })


   }catch(err){
     res.status(400).json(err)
   }
}