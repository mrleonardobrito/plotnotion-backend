import { Router } from "express"
import { getDatabaseHandlers } from "../../../dicontainer/handlers"
import DatabaseHandlers from "../../../../../app/api/endpoints/handlers/DatabaseHandlers"
import DatabaseServices from "../../../../../core/services/DatabaseServices"
import DatabaseNotionAPI from "../../../../../infra/notion/DatabaseNotionAPI"
import NotionConnectionManager from "../../../../../infra/notion"

const notionRoutes = Router()
const connection = new NotionConnectionManager()
const databaseAPI = new DatabaseNotionAPI(connection)
const databaseService = new DatabaseServices(databaseAPI)
const databaseHandlers = new DatabaseHandlers(databaseService)

notionRoutes.get("/databases", databaseHandlers.GetDatabasesHandler)

export default notionRoutes