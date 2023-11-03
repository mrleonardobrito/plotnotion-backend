import { Router } from "express"
import notionRoutes from "./notion/database"

const apiRoutes = Router()

apiRoutes.use("/notion", notionRoutes)

export default apiRoutes