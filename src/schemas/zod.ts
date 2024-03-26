import z from 'zod'
import { AuthInput } from 'types'
import { PostInput } from 'types'

const userSchema = z.object({
    nickname: z.string({
        invalid_type_error: 'The nickname must be a valid alphanumeric characters',
        required_error: 'The nickname is required'
    }).min(5),
    email: z.string().email(),
    password: z.string().min(8).max(30),
    
})

const postSchema = z.object({
    content: z.string({
        required_error: 'Empty content'
    }).max(255),
    authorId: z.number(),
    videoId: z.string(),
    postId: z.number(),
})

export function validateUserSchema(input: AuthInput){
    return userSchema.safeParse(input)
}

export function validatePostSchema(input: PostInput){
    return userSchema.safeParse(input)
}