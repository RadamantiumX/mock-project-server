import { GraphQLResolveInfo } from "graphql"
import { createUser } from "../services/user.service"

export const usersResolver = {
    Query: {

    },
    Mutation: {
        async createUser(_: any, {input}: Record<string, any>) {
            return await createUser({email: input.email, nickname: input.nickname, password: input.password})
        }
    }
}