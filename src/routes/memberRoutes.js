import express from "express"
import memberController from "../controllers/memberController.js"

const router = express.Router()

// Register New Member
router.post("/members", memberController.registerNewMember)

// GET history Borrowings
router.get("/members/:id/borrowings", memberController.getHistoryBorrowingByMemberId)

export default router
