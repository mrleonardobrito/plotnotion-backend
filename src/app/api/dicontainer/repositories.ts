import DatabaseAdapter from "../../../core/interfaces/adapters/DatabaseAdapter";
import NotionConnectionManager from "../../../infra/notion";
import DatabaseNotionAPI from "../../../infra/notion/DatabaseNotionAPI";

export function getDatabaseRepository(): DatabaseAdapter {
    return new DatabaseNotionAPI(new NotionConnectionManager())
}