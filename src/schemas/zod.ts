import z from 'zod'
import { UserInput } from 'types'

const userSchema = z.object({
    nickname: z.string({
        invalid_type_error: 'The nickname must be a valid alphanumeric characters',
        required_error: 'The nickname is required'
    }).min(5),
    email: z.string().email(),
    password: z.string().min(8).max(30),
    
})

export function validateUserSchema(input: UserInput){
    return userSchema.safeParse(input)
}