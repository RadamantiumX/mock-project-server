import { Router } from 'express';
import rescue from 'express-rescue';
import AuthController from '../controllers/auth.controller';

const authRouter = Router();

authRouter.route('/signin').post(rescue(AuthController.signin));
authRouter.route('/signup').post(rescue(AuthController.signup));


export default authRouter;