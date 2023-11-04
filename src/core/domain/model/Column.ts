import Model from './model'
import DTO from '../types/http/DTO'

export type RawData = string | number

class Column extends Model {
    private _id: string
    private _name: string
    private _type: string
    private _row: RawData[]

    static fromJson(json: DTO): Column {
        const obj = new Column()
        obj._id = String(json['id'])
        obj._name = String(json['name'])
        obj._type = String(json['type'])
        obj._row = Array.isArray(json['row']) ? json['row'] : [];

        return obj
    }

    static fromData(id: string, name: string, type: string, row: RawData[]): Column {
        const obj = new Column()
        obj._id = id
        obj._name = name
        obj._type = type
        obj._row = row

        return obj
    }

    toJson(): DTO {
        let dto = {} as DTO
        
        dto['id'] = this._id
        dto['name'] = this._name
        dto['type'] = this._type
        dto['row'] = this._row ? this._row : [];

        return dto
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get type(): string {
        return this._type
    }


    get row(): RawData[] {
        return this._row
    }
}

export default Column