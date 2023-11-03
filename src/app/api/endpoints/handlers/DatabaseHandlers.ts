import { Request, Response, NextFunction } from "express"
import DatabaseUseCase from "../../../../core/interfaces/usecases/DatabaseUseCase"

class DatabaseHandlers {
    constructor(
        protected readonly dbUseCase: DatabaseUseCase
    ) {
        this.GetDatabasesHandler = this.GetDatabasesHandler.bind(this);
    }

    async GetDatabasesHandler (req: Request, res: Response, next: NextFunction) {
        try{
            const databases = await this.dbUseCase.getDatabases()
            const dto = databases.map((db) => db.toJson())

            res.status(200).json(dto)
        } catch(err) {
            next(err)
        }
        
    }
}

export default DatabaseHandlers 