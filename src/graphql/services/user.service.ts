import { prisma } from "../../db/db"
import { GraphQLResolveInfo } from "graphql"
import { extractSelection } from "../utils/extractSelections"
import { AuthInput } from "types"
import bcrypt from "bcryptjs"


interface GetUsersArgs{
    info: GraphQLResolveInfo
}

interface GetUserArgs extends GetUsersArgs {
    id: number
}

export const getUser = async ({id, info}: GetUserArgs) => {
     
}

export const createUser  = async ({nickname, email, password}:AuthInput) => {
    console.log({email,nickname})
    const hashPassword:any = bcrypt.hash(password, 8)
    const createdUser = await prisma.user.create({
        data: {
            nickname: nickname,
            email: email,
            password: JSON.stringify(hashPassword)
        }
    })

    return createdUser
}