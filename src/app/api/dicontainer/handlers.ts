import DatabaseHandlers from "../endpoints/handlers/DatabaseHandlers";
import { getDatabaseService } from "./services";

export function getDatabaseHandlers(): DatabaseHandlers {
    return new DatabaseHandlers(getDatabaseService())
}