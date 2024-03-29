import z from 'zod'
import { AuthInput } from 'types'
import { PostInput } from 'types'
import { ResponsePostInput } from 'types'

// Minimum 8 characters, at least one uppercase letter,
// one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
)

const userSchema = z.object({
    nickname: z.string({
        invalid_type_error: 'The nickname must be a valid alphanumeric characters',
        required_error: 'The nickname is required'
    }).min(5,{
        message: 'The nickname must be larger than 5 characters minimum.'
    }),
    email: z.string().email({
        message: 'Please entry a valida email address'
    }),
    password: z.string().min(6).max(30).regex(passwordValidation, {
        message: 'Your password is not valid'
    }),
    confirmPassword: z.string().min(6).max(30)
   
}).refine((values) =>{
        return values.password === values.confirmPassword
    },
    {
        message: "Password must match!",
        path: ["confirmPassword"]
    }
)
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

export function validatePostSchema(input: PostInput){
    return responsePostSchema.safeParse(input)
}

export function validateResponsePostSchema(input: ResponsePostInput){
    return postSchema.safeParse(input)
}

export function validateUserSchema(input: AuthInput){
    return userSchema.safeParse(input)
}