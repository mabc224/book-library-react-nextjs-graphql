import { DateResolver } from 'graphql-scalars'
import prisma from '@/lib/prisma'

export const resolvers = {
 Date: DateResolver,
 Query: {
  userBooks: (_, args) => {
   const {userId, collection} = args;
   return prisma.book.findMany({where: {userId: parseInt(userId, 10), collection}})
  },
 },
 Mutation: {}
}

