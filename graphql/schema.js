export const typeDefs = `
  scalar Date
  scalar File

  type User {
    userId: ID
    name: String!
  }
  
  enum Collection {
    READ
    READING
    WANT_TO_READ
  }
  
  type Book {
    bookId: ID
    userId: ID
    title: String
    author: String
    cover: String
    date: Date
    rating: Int
    collection: Collection
  }

  type Query {
    userBooks(userId: ID!, collection: Collection!): [Book]
    userBook(userId: ID!, bookId: ID!): Book
  }
  
  type Mutation {
    addBook(title: String!, author: String!, file: File, date: String!, collection: Collection): Book!
    modifyBook(bookId: ID!, title: String, author: String, file: File, date: String, collection: Collection, rating: Int): Book!
  }
`
