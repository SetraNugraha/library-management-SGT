import borrowing from "../models/borrowing.js"

const createBorrowingBook = async (member_id, book_id) => {
  try {
    const checkStock = await borrowing.isStockReady(book_id)
    if (!checkStock) {
      throw new Error("out of stock")
    }

    const checkLimit = await borrowing.isLimitBorrowing(member_id)
    if (checkLimit) {
      throw new Error("max borrowing 3 books")
    }

    const result = await borrowing.insertBorrowingBook(member_id, book_id)

    return result
  } catch (error) {
    console.error("error serivce borrowing book: ", error)
    throw error
  }
}

const updateStatusBorrowing = async (id) => {
  try {
    const checkStatus = await borrowing.isAlreadyReturn(id)

    if (checkStatus) {
      throw new Error("book already returned")
    }

    const result = await borrowing.updateStatusToReturn(id)
    return result
  } catch (error) {
    console.error("error serivce borrowing book: ", error)
    throw error
  }
}

export default {
  createBorrowingBook,
  updateStatusBorrowing
}
