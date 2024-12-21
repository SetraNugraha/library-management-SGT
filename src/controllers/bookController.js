import bookService from "../services/bookService.js"

const getAllBooks = async (req, res) => {
  try {
    const { title, author, page = 1, limit = 10 } = req.query

    if (title && typeof title !== "string") {
      return res.status(400).json({
        status: false,
        message: "title must be a string",
      })
    }

    if (author && typeof author !== "string") {
      return res.status(400).json({
        status: false,
        message: "author must be a string",
      })
    }

    if (page && isNaN(page)) {
      return res.status(400).json({
        status: false,
        message: "page must be a number",
      })
    }

    if (limit && isNaN(limit)) {
      return res.status(400).json({
        status: false,
        message: "limit must be a number",
      })
    }

    const books = await bookService.getAllBooks(title, author, parseInt(page), parseInt(limit))

    if (books.pagination.page > books.pagination.totalPages) {
      return res.status(404).json({
        success: "false",
        message: "Page not found",
      })
    }

    const results = books.data.map((book) => ({
      ...book,
      available: book.stock > 1,
    }))

    return res.status(200).json({
      success: true,
      message: "Get books success",
      data: results,
      pagination: books.pagination,
    })
  } catch (error) {
    console.error("Error in controller getAllBooks", error)
    return res.status(500).json({
      success: false,
      message: "failed to fetch books",
    })
  }
}

export default {
  getAllBooks,
}
