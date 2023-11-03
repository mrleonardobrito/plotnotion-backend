import Database from '../../domain/model/Database'

abstract class DatabaseUseCase {
    abstract getDatabases(): Promise<Database[]>
}

export default DatabaseUseCase