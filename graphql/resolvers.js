import { DateResolver } from 'graphql-scalars'
import fs from 'fs/promises'
import path from 'path'
import { Blob } from 'buffer'
import prisma from '@/lib/prisma'

export const resolvers = {
 Date: DateResolver,
 Query: {
  userBooks: (_, args) => {
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
   let fileName = '';
   try {
    if (file) {
     const {name, type, blobParts} = await file
     fileName = name;
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
   let fileName = existingRow.cover || '';

   try {
    if (file) {
     const {name, type, blobParts} = await file
     fileName = name;
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

 }
}

