import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { IPayload } from 'types'

const SECRET = process.env.JWT_SECRET || 'secret'


export default {
    sign: (payload: IPayload) => 
       jwt.sign(payload, SECRET, {expiresIn: '1h', algorithm: 'HS256'}),

    verify: (token: string) => jwt.verify(token, SECRET),   
}