import Model from "./model"
import DTO from "../types/http/DTO"
import Property from "./Property"

class Database extends Model {
    private _id: string
    private _name: string
    private _properties: Property[]

    static fromJson(json: DTO): Database {
        const obj = new Database()
        obj._id = String(json['id'])
        obj._name = String(json['name'])
        obj._properties = Array.isArray(json['properties']) 
            ? json['properties'].map(Property.fromJson)
            : [];
        return obj
    }

    toJson(): DTO {
        let dto = {} as DTO

        dto['id'] = this._id
        dto['name'] = this._name
        dto['properties'] = this._properties.map((prop) => prop.toJson())

        return dto
    }
}

export default Database