import { Router } from 'express';
import rescue from 'express-rescue';
import AuthController from '../controllers/auth.controller';
import { signin } from '../controllers/tets.controller';

const authRouter = Router();

authRouter.post('/signin', AuthController.signin);
authRouter.route('/signup').post(rescue(AuthController.signup));


export default authRouter;