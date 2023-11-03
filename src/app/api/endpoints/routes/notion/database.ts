import { Router } from "express"
import { getDatabaseHandlers } from "../../../dicontainer/handlers"

const notionRoutes = Router()

const databaseHandlers = getDatabaseHandlers()

notionRoutes.get("/databases", databaseHandlers.GetDatabasesHandler)

export default notionRoutes