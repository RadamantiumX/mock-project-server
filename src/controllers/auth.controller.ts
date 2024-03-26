import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../db/db';
import jwt from '../utils/jwt';
import { AuthInput } from "types";
import { validateUserSchema } from "../schemas/zod";
class AuthController {
  async signin(req: Request, res: Response, next: NextFunction) {
    const { email, password }:AuthInput = req.body;
    if (!email || !password) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: 'Some required fields are missing',
      });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'User not found',
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return next({
        status: StatusCodes.UNAUTHORIZED,
        message: 'Invalid password or email provided',
      });
    }

    const token = jwt.sign({ id: user.id, email: user.email });

    res.status(StatusCodes.OK).json({ token });
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    const { email, password, nickname }:AuthInput = req.body;
    const uniqueUser = await prisma.user.findUnique({ where: { email } });
    const validate = validateUserSchema(req.body);
    if (!uniqueUser){
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: 'User already exists',
      })
    }
  
    if(!validate){
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: 'Some required fields are missing',
      })
    }

    const fixedEmail = email.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({ data:{ nickname: nickname, email: fixedEmail,  password: hashedPassword }  })
    const token = jwt.sign({ id: newUser.id, email: newUser.email})
    res.status(StatusCodes.OK).json({ token });
  }
}

export default new AuthController();


