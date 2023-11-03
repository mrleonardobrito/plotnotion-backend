import Database from '../domain/model/Database';
import DatabaseAdapter from '../interfaces/adapters/DatabaseAdapter';
import DatabaseUseCase from '../interfaces/usecases/DatabaseUseCase';

class DatabaseServices extends DatabaseUseCase {
    constructor(protected readonly adapter: DatabaseAdapter) {
        super()
    }

    async getDatabases(): Promise<Database[]> {
        return await this.adapter.getDatabases()
    }
}

export default DatabaseServices