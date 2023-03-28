import { jwtVerify } from 'jose'

const APP_SECRET = process.env.APP_SECRET

export const getTokenPayload = async (token) => {
 const secret = new TextEncoder().encode(APP_SECRET)
 return jwtVerify(token, secret)
}

export const getUserId = (req, authToken) => {
 if (req) {
  const authHeader = req.headers.authorization
  if (authHeader) {
   const token = authHeader.replace('Bearer ', '')
   if (!token) {
    throw new Error('No token found')
   }
   const {userId} = getTokenPayload(token)
   return userId
  }
 } else if (authToken) {
  const {userId} = getTokenPayload(authToken)
  return userId
 }

 throw new Error('Not authenticated')
}
