import DatabaseServices from "../../../core/services/DatabaseServices";
import NotionConnectionManager from "../../../infra/notion";
import DatabaseNotionAPI from "../../../infra/notion/DatabaseNotionAPI";
import DatabaseHandlers from "../endpoints/handlers/DatabaseHandlers";

export function getDatabaseHandlers(): DatabaseHandlers {
    return new DatabaseHandlers(new DatabaseServices(new DatabaseNotionAPI(new NotionConnectionManager())))
}