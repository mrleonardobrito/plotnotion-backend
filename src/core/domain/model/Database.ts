import Model from "./model"
import Column from "./Column"
import DTO from "../types/http/DTO"

class Database extends Model {
    private _id: string
    private _name: string
    private _columns: Column[]

    static fromJson(json: DTO): Database {
        const obj = new Database()
        obj._id = String(json['id'])
        obj._name = String(json['name'])
        obj._columns = Array.isArray(json['columns']) 
            ? json['columns'].map(Column.fromJson)
            : [];
        return obj
    }

    toJson(): DTO {
        let dto = {} as DTO

        dto['id'] = this._id
        dto['name'] = this._name
        dto['columns'] = this._columns.map((prop) => prop.toJson())

        return dto
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get columns(): Column[] {
        return this._columns
    }

    set columns(columns: Column[]) {
        this._columns = columns
    }
}

export default Database