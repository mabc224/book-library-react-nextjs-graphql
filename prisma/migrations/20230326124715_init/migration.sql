-- CreateEnum
CREATE TYPE "Collection" AS ENUM ('READ', 'READING', 'WANT_TO_READ');

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Book" (
    "bookId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "date" DATE NOT NULL,
    "cover" TEXT,
    "collection" "Collection" NOT NULL DEFAULT 'WANT_TO_READ',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rating" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("bookId")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
