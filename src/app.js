import express from "express"
import bookRoutes from "./routes/bookRoutes.js"
import memberRouter from "./routes/memberRoutes.js"
import borrowingRoutes from "./routes/borrowingRoutes.js"

const app = express()
const router = express.Router()

app.use(express.json())
app.use("/api", router)
router.use(bookRoutes, memberRouter, borrowingRoutes)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server start on PORT: ${PORT}`)
})
