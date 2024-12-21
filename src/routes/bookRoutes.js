import express from "express"
import bookController from "../controllers/bookController.js"

const router = express.Router()

// GET
router.get("/books", bookController.getAllBooks)

export default router
