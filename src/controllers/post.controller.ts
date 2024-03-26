import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../db/db';
import jwt from '../utils/jwt';
import { PostInput } from "types";
import { validatePostSchema } from "../schemas/zod";

class PostController {
   async post(req: Request, res: Response, next: NextFunction){
       // const { content, authorId, videoId } = req.body;
      /**
       * If data provided is not valid (eg: typeof authorId !== 'number' ) with schema DB
       * add change of type data here... ⬇
       */
      const validate = validatePostSchema(req.body);

      if (!validate){
         return next({
            status: StatusCodes.BAD_REQUEST,
            message: 'Fields are required',
         })
      }
     const newPost = await prisma.post.create({ data: req.body  })
     res.status(StatusCodes.OK).json({ message: 'Comment added successfully...' });
   }
   
   async deletePost(req: Request, res: Response, next: NextFunction){
       const { id } = req.body
       const verifyId = await prisma.post.findFirst({ where:{ id } })
       if (!verifyId){
         return next({
            status: StatusCodes.BAD_REQUEST,
            message: 'Post not found',
         })
       }

       const deletePost = await prisma.post.delete({ where: {id} })

       res.status(StatusCodes.OK).json({ message: 'Post deleted successfully...' });
   }
}

export default new PostController;