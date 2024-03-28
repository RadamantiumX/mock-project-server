import express, {json, urlencoded} from 'express';
import router from './routes';
import errorMiddleware from "../middlewares/error"
import dotenv from "dotenv"
// import { corsMiddleware } from '../middlewares/cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from "@apollo/server/express4"
import { typeDefs, resolvers } from '../graphql';
import cors from 'cors'


dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000
// app.use(corsMiddleware());
// app.use(express.json()).use(router).use(errorMiddleware)

const bootstrapServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    await server.start()

    app.use(cors());
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use("/graphql", expressMiddleware(server))

    app.listen(PORT, () => {
        console.log(`🚀 Express ready at http://localhost:${PORT}`)
        console.log(`🚀 GraphQL ready at http://localhost:${PORT}/graphql`)
    })
}

bootstrapServer()

// export default app