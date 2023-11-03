import { getDatabaseRepository } from "./repositories";
import DatabaseUseCase from "../../../core/interfaces/usecases/DatabaseUseCase";
import DatabaseServices from "../../../core/services/DatabaseServices"; 

export function getDatabaseService(): DatabaseUseCase {
    return new DatabaseServices(getDatabaseRepository())
}