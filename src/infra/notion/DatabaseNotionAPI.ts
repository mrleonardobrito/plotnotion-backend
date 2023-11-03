import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Database from "../../core/domain/model/Database";
import DatabaseAdapter from "../../core/interfaces/adapters/DatabaseAdapter";
import NotionConnectionManager from "./index"; 

class DatabaseNotionAPI extends DatabaseAdapter{
    constructor(protected readonly client: NotionConnectionManager) {
        super()
    }

    async getDatabases(): Promise<Database[]> {
        try {
            const client = this.client.getConnection()
            const response = await client.search({
                filter: {
                    value: 'database',
                    property: 'object'
                }
            })

            return response.results.map((db: DatabaseObjectResponse) => {
                const dto = {
                    id: db.id,
                    name: db.title[0].plain_text,
                    properties: Object.keys(db.properties).map((key) => {
                        return {
                            id: db.properties[key].id,
                            name: db.properties[key].name,
                            type: db.properties[key].type
                        }
                    })
                }

                return Database.fromJson(dto)
            })
        } catch(err) {
            throw new Error(err.message)
        }
    }
}

export default DatabaseNotionAPI