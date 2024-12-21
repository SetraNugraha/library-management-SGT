import express from "express"
import borrowingController from "../controllers/borrowingController.js"

const router = express.Router()

// Borrowing
router.post("/borrowings", borrowingController.createBorrowingBook)

// Return Book
router.put("/borrowings/:id/return", borrowingController.updateBorrowingStatus)

export default router
