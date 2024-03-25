import express, {json} from 'express';
import router from './routes';
import errorMiddleware from "../middlewares/error"
import { corsMiddleware } from '../middlewares/cors';

const app = express();
app.use(corsMiddleware());
app.use(express.json()).use(router).use(errorMiddleware)

export default app