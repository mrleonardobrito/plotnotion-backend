import Database from '../../domain/model/Database'

abstract class DatabaseAdapter {
    abstract getDatabases(): Promise<Database[]>;
}

export default DatabaseAdapter