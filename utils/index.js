import { jwtVerify } from 'jose'

const APP_SECRET = process.env.APP_SECRET

export const getTokenPayload = async (token) => {
 const secret = new TextEncoder().encode(APP_SECRET)
 return jwtVerify(token, secret, {algorithms: ['HS256']})
}

export const getUserId = async (req, authToken) => {
 if (req) {
  const authHeader = req.headers.authorization || req.headers.get('authorization')
  if (authHeader) {
   const token = authHeader.replace('Bearer ', '')
   if (!token) {
    throw new Error('No token found')
   }
   const {payload: {userId}} = await getTokenPayload(token)
   return userId
  }
 } else if (authToken) {
  const {payload: {userId}} = await getTokenPayload(authToken)
  return userId
 }

 throw new Error('Not authenticated')
}
