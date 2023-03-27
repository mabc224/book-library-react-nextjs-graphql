/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
const {PrismaClient} = require('@prisma/client')
const {faker} = require('@faker-js/faker')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const hashedPassword = bcrypt.hashSync('password', 8)

async function main () {

 const generatedUsers = []
 for (let i = 0; i < 10; i++) {
  const data = {
   name: faker.name.fullName(),
   username: `user${i}`,
   password: hashedPassword
  }
  generatedUsers.push(data)
 }
 await prisma.user.createMany({
  data: generatedUsers,
 })

 const generatedBooks = []
 for (let i = 0; i < 200; i++) {
  const data = {
   title: faker.commerce.productName(),
   author: faker.name.fullName(),
   cover: '',
   date: faker.date.recent(),
   collection: faker.helpers.arrayElement(['READ', 'READING', 'WANT_TO_READ']),
   userId: faker.helpers.arrayElement(Array.from({length: 10}, (_, i) => i + 1)),
   rating: faker.helpers.arrayElement(Array.from({length: 5}, (_, i) => i + 1)),
  }
  generatedBooks.push(data)
 }
 await prisma.book.createMany({
  data: generatedBooks,
 })
}

main()
 .catch((e) => {
  console.error(e)
  process.exit(1)
 })
 .finally(async () => {
  await prisma.$disconnect()
 })
