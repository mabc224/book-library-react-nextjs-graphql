import { createSchema, createYoga, } from 'graphql-yoga'
import { applyMiddleware } from 'graphql-middleware'
import { rule, shield, not } from 'graphql-shield'
import { GraphQLError } from 'graphql'
import { resolvers } from '@/graphql/resolvers'
import { typeDefs } from '@/graphql/schema'
import { getTokenPayload, getUserId } from '@/utils'

// Rules
const isAuthenticated = rule({cache: 'contextual'})(async (parent, args, ctx, info) => {
 console.log('isAuthenticated: ', ctx?.userId)
 // return ctx.userId !== null
 if (ctx.userId === null) {
  throw new GraphQLError('You must be logged in to query this schema', {
   extensions: {
    code: 'UNAUTHENTICATED',
   }
  })
 } else {
  return true
 }
})

// Permissions
const permissions = shield({
 Query: {
  userBooks: isAuthenticated,
  userBook: isAuthenticated,
 },
 Mutation: {
  addBook: isAuthenticated,
  modifyBook: isAuthenticated,
 }
}, {
 allowExternalErrors: true
})

export default createYoga({
 schema: applyMiddleware(createSchema({
  typeDefs,
  resolvers,
 }), permissions),
 context: async ({request}) => {
  try {
   const userId = await getUserId(request)
   return {userId}
  } catch (e) {
   return {userId: null}
  }
 },
 graphqlEndpoint: '/api/graphql'
})

export const config = {
 api: {
  bodyParser: false
 }
}
