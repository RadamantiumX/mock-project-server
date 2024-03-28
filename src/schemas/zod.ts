import z from 'zod'
import { AuthInput } from 'types'
import { PostInput } from 'types'
import { ResponsePostInput } from 'types'

const userSchema = z.object({
    nickname: z.string({
        invalid_type_error: 'The nickname must be a valid alphanumeric characters',
        required_error: 'The nickname is required'
    }).min(5),
    email: z.string().email(),
    password: z.string().min(6).max(30),
    
})
const responsePostSchema = z.object({
    content: z.string({
        required_error: 'Empty content'
    }).max(255),
    authorId: z.number(),
    videoId: z.string(),
    postId: z.number(),
})

const postSchema = z.object({
    content: z.string({
        required_error: 'Empty content'
    }).max(255),
    authorId: z.number(),
    videoId: z.string()
})

export function validatePostSchema(input: AuthInput){
    return responsePostSchema.safeParse(input)
}

export function validateResponsePostSchema(input: ResponsePostInput){
    return postSchema.safeParse(input)
}

export function validateUserSchema(input: PostInput){
    return userSchema.safeParse(input)
}