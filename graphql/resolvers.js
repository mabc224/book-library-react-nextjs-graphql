import { DateResolver } from 'graphql-scalars'
import path from 'path'
import fs from 'fs'
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
  addBook: (_, args) => {
   const {title, author, file, date, collection} = args
   console.log('File: ', file)
   return prisma.book.create({data: {title, author, date: new Date(date), collection, userId: 1}})
  },
  modifyBook: async (_, args) => {
   const {bookId, title, author, file, date, collection, rating} = args
   return prisma.book.update({where: {bookId: parseInt(bookId, 10)}, data: {title, author, date: new Date(date), collection, rating}})
  },

 }
}

