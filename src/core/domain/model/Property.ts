import DTO from "../types/http/DTO";
import Model from "./model";

class Property extends Model {
    private _id: string
    private _name: string
    private _type: string
    private _values: string[] | number[]

    static fromJson(json: DTO): Property {
        const obj = new Property()
        obj._id = String(json['id'])
        obj._name = String(json['name'])
        obj._type = String(json['type'])

        return obj
    }

    toJson(): DTO {
        let dto = {} as DTO
        
        dto['id'] = this._id
        dto['name'] = this._name
        dto['type'] = this._type
        if(this._values) {
            dto['values'] = this._values
        } 

        return dto
    }
}

export default Property