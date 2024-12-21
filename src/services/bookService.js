import book from "../models/book.js"

const getAllBooks = async (title, author, page, limit) => {
  try {
    const results = await book.findAllBooks(title, author, page, limit)
    return results
  } catch (error) {
    console.error("Error getAllbooks: ", error)
    throw error
  }
}

export default {
  getAllBooks,
}
