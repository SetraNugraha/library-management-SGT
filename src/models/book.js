import prisma from "../config/database.js"

const findAllBooks = async (title, author, page, limit) => {
  try {
    let filter = {}
    if (title) {
      filter.title = { contains: title, mode: "insensitive" }
    }

    if (author) {
      filter.author = { contains: author, mode: "insensitive" }
    }

    const offset = (page - 1) * limit

    const results = await prisma.books.findMany({
      where: filter,
      skip: offset,
      take: limit,
    })

    const totalBooks = await prisma.books.count({ where: filter })
    const totalPages = Math.ceil(totalBooks / limit)

    return {
      data: results,
      pagination: {
        total: totalBooks,
        page: page,
        limit: limit,
        totalPages: totalPages,
      },
    }
  } catch (error) {
    console.error("Error in findAllBooks: ", error)
    throw new Error("Failed to fetch all books")
  }
}

export default {
  findAllBooks,
}
