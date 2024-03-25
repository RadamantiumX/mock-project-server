import { Router } from 'express';
import rescue from 'express-rescue';
import authController from '../controllers/auth.controller';

const authRouter = Router();

authRouter.route('/signin').post(rescue(authController.signin));
authRouter.route('/signup').post(rescue(authController.signup));


export default authRouter;