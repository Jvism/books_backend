import { PrismaClient } from '@prisma/client'
import { seedData } from './seedData'
import { BookStatus, type Book } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  seedData.categories.forEach(async (category, index) => {
    await prisma.category.create({
      data:{
        name: category
      }
    })
  })

  seedData.authors.forEach(async (author, index) => {
    await prisma.author.create({
      data: {
        name: author
      }
    })
  })

  seedData.books.forEach(async (book, index) => {    
    const bookCreated = book.publishDate ? 
    await prisma.book.create({
      data: {
        id: index,
        title: book.title,
        status: book.status === "PUBLISH" ? BookStatus.PUBLISH : BookStatus.MEAP,
        publishDate: new Date(book.publishDate),
        shortDescription: book.shortDescription,
        longDescription: book.longDescription,
        thumbnailUrl: book.thumbnailUrl,
        pages: book.pages
      }
    })
    :
    await prisma.book.create({
      data: {
        id: index,
        title: book.title,
        status: book.status === "PUBLISH" ? BookStatus.PUBLISH : BookStatus.MEAP,
        shortDescription: book.shortDescription,
        longDescription: book.longDescription,
        thumbnailUrl: book.thumbnailUrl,
        pages: book.pages
      }
    })

    book.authors.forEach(async author => {
      const authorFound = await prisma.author.findFirst({
        where: {
          name: author
        }
      })
      if (authorFound) {
        await prisma.authorBook.create({
          data: {
            bookId: bookCreated.id,
            authorId: authorFound.id
          }
        })
      }
    })

    book.categories.forEach(async category => {
      const categoryFound = await prisma.category.findUnique({
        where: {
          name: category
        }
      })
      if (categoryFound) {
        await prisma.bookCategory.create({
          data: {
            bookId: bookCreated.id,
            categoryId: categoryFound.id
          }
        })
      }
    })
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })