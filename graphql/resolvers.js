import { DateResolver } from 'graphql-scalars'
import { GraphQLError } from 'graphql'
import fs from 'fs/promises'
import path from 'path'
import bcryptjs from 'bcryptjs'
import { SignJWT } from 'jose'
import { Blob } from 'buffer'
import prisma from '@/lib/prisma'

const APP_SECRET = process.env.APP_SECRET

export const resolvers = {
 Date: DateResolver,
 Query: {
  userBooks: (_, args, context) => {
   const {userId, collection} = args
   return prisma.book.findMany({where: {userId: parseInt(userId, 10), collection}})
  },
  userBook: (_, args) => {
   const {userId, bookId} = args
   return prisma.book.findFirst({where: {userId: parseInt(userId, 10), bookId: parseInt(bookId, 10)}})
  },
 },
 Mutation: {
  addBook: async (_, args) => {
   const {title, author, file, date, collection} = args
   let fileName = ''
   try {
    if (file) {
     const {name, type, blobParts} = await file
     fileName = name
     const filePath = path.join(process.cwd(), 'public', 'uploads', name)
     const blob = new Blob(blobParts, {
      type
     })

     const buffer = Buffer.from(await blob.arrayBuffer())
     await fs.writeFile(filePath, buffer)
    }
   } catch (e) {
    console.log(e)
   }

   return prisma.book.create({data: {title, author, date: new Date(date), collection, userId: 1, cover: fileName}})
  },
  modifyBook: async (_, args) => {
   const {bookId, title, author, file, date, collection, rating} = args
   const existingRow = await prisma.book.findFirst({where: {bookId: parseInt(bookId, 10)}})
   let fileName = existingRow.cover || ''

   try {
    if (file) {
     const {name, type, blobParts} = await file
     fileName = name
     const filePath = path.join(process.cwd(), 'public', 'uploads', name)
     const blob = new Blob(blobParts, {
      type
     })

     const buffer = Buffer.from(await blob.arrayBuffer())
     await fs.writeFile(filePath, buffer)
    }
   } catch (e) {
    console.log(e)
   }

   return prisma.book.update({
    where: {bookId: parseInt(bookId, 10)},
    data: {title, author, date: new Date(date), collection, rating, cover: fileName}
   })
  },
  signup: async (_, args) => {
   const {name, username, password} = args

   const existingRow = await prisma.user.findFirst({where: {username}})

   if (existingRow) {
    throw new GraphQLError('Username already exists, Choose new one.')
   }

   const user = await prisma.user.create({
    data: {
     username,
     password: bcryptjs.hashSync(password, 8),
     name,
    },
   })

   const token = await new SignJWT({userId: userRow.userId})
    .setProtectedHeader({alg: 'HS256'})
    .setExpirationTime('999h')
    .sign(new TextEncoder().encode(APP_SECRET))

   return {
    token,
    user,
   }
  },
  login: async (_, args) => {
   const {username, password} = args

   const userRow = await prisma.user.findFirst({where: {username}})

   if (!userRow) {
    throw new GraphQLError('Username not found')
   }

   const valid = await bcryptjs.compare(password, userRow.password)
   if (!valid) {
    throw new GraphQLError('Invalid password')
   }

   const token = await new SignJWT({userId: userRow.userId})
    .setProtectedHeader({alg: 'HS256'})
    .setExpirationTime('999h')
    .sign(new TextEncoder().encode(APP_SECRET))

   return {
    token,
    user: userRow,
   }
  },
 }
}

