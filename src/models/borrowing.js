import prisma from "../config/database.js"

// Validate
const isStockReady = async (book_id) => {
  const book = await prisma.books.findUnique({
    where: {
      id: book_id,
    },
  })

  if (book.stock > 0) {
    return true
  }

  return false
}

// Validate
const isLimitBorrowing = async (member_id) => {
  const checkLimit = await prisma.borrowings.findMany({
    where: {
      member_id: member_id,
      status: "BORROWED",
    },
  })

  if (checkLimit.length >= 3) {
    return true
  }

  return false
}

// POST
const insertBorrowingBook = async (member_id, book_id) => {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const borrowing = await prisma.borrowings.create({
        data: {
          book_id: book_id,
          member_id: member_id,
          borrow_date: new Date(),
        },
      })

      await prisma.books.update({
        where: {
          id: book_id,
        },
        data: {
          stock: {
            decrement: 1,
          },
        },
      })

      return borrowing
    })

    return result
  } catch (error) {
    console.error("Error in model insert borrowing: ", error)
    throw new Error("Erro while borrowing book")
  }
}

// Validate
const isAlreadyReturn = async (borrowing_id) => {
  const book = await prisma.borrowings.findUnique({
    where: {
      id: borrowing_id,
    },
  })

  if (book.status === "RETURNED") {
    return true
  }

  return false
}

// PUT
const updateStatusToReturn = async (id) => {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const updateStatus = await prisma.borrowings.update({
        where: { id: id },
        data: { status: "RETURNED", return_date: new Date() },
      })

      await prisma.books.update({
        where: {
          id: updateStatus.book_id,
        },
        data: {
          stock: {
            increment: 1,
          },
        },
      })

      return updateStatus
    })

    return result
  } catch (error) {
    console.error("Error in model return book: ", error)
    throw new Error("Erro while return book")
  }
}

export default {
  insertBorrowingBook,
  updateStatusToReturn,
  isStockReady,
  isLimitBorrowing,
  isAlreadyReturn,
}
