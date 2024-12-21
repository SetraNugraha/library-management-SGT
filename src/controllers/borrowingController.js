import borrowingService from "../services/borrowingService.js"

const createBorrowingBook = async (req, res) => {
  try {
    const { member_id, book_id } = req.body

    if (!member_id && !book_id) {
      return res.status(400).json({
        success: false,
        message: "member id & book id are required",
      })
    }

    if (typeof member_id !== "string" && typeof book_id !== "string") {
      return res.status(400).json({
        success: false,
        message: "member id & book id must be a string",
      })
    }

    const result = await borrowingService.createBorrowingBook(member_id, book_id)

    return res.status(201).json({
      success: true,
      message: "borrowing success",
      data: result,
    })
  } catch (error) {
    console.error("error in controller create borrowing book: ", error)

    if (error.message === "out of stock") {
      return res.status(404).json({
        success: false,
        message: "out of stock",
      })
    }
    if (error.message === "max borrowing 3 books") {
      return res.status(400).json({
        success: false,
        message: "max borrowing 3 books",
      })
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

const updateBorrowingStatus = async (req, res) => {
  try {
    const borrowingId = req.params.id

    if (typeof borrowingId !== "string") {
      return res.status(400).json({
        success: false,
        message: "borrowing id must be a string",
      })
    }

    const result = await borrowingService.updateStatusBorrowing(borrowingId)

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Update status to return success",
      })
    }
  } catch (error) {
    console.error("error in controller update borrowing status: ", error)

    if (error.message === "book already returned") {
      return res.status(400).json({
        success: false,
        message: "book already returned",
      })
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

export default {
  createBorrowingBook,
  updateBorrowingStatus,
}
