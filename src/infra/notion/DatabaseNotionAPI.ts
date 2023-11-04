import { DatabaseObjectResponse, GetDatabaseResponse, PageObjectResponse, PropertyItemListResponse, PropertyItemObjectResponse, PropertyItemPropertyItemListResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import Database from "../../core/domain/model/Database";
import DatabaseAdapter from "../../core/interfaces/adapters/DatabaseAdapter";
import PropertyFactory from "./factory/properties";
import NotionConnectionManager from "./index";
import Column, { RawData } from "../../core/domain/model/Column";

type ColumnDTO = {
    id: string,
    name: string,
    type: string,
    row: RawData[]
}

type DatabaseDTO = {
    id: string,
    name: string,
    columns: ColumnDTO[]
}

class DatabaseNotionAPI extends DatabaseAdapter{
    constructor(protected readonly client: NotionConnectionManager) {
        super()
    }

    private async getDatabaseRows(dbID: string, property: ColumnDTO): Promise<RawData[]> {
        try {
            const client = this.client.getConnection()
            const response = await client.databases.query({
                database_id: dbID,
                filter_properties: [property.id]
            }) as QueryDatabaseResponse

            const pages = response.results as PageObjectResponse[]
            const rowData = pages.map((page) => {
                const properties = page.properties
                const propertyItem = properties[property.name] as PropertyItemObjectResponse
                const row = PropertyFactory.getPropertyRowData(propertyItem)

                return row
            })

            return rowData
        } catch(err) {
            throw new Error(err.message)
        }
    }

    async getDatabases(): Promise<Database[]> {
        try {
            const client = this.client.getConnection()
            const response = await client.search({
                filter: {
                    value: 'database',
                    property: 'object'
                }
            }) as QueryDatabaseResponse

            const databases = response.results as DatabaseObjectResponse[]
            const databaseList = databases.map(async (database) => {
                const columnsDTO = Object.keys(database.properties).map((key) => {
                    const column = database.properties[key]
                    const dto = {
                        id: column.id,
                        name: column.name,
                        type: column.type,
                        row: []
                    } as ColumnDTO
                    return dto
                }).filter((column) => PropertyFactory.isHandledProperty(column.type))

                const columns = [] as ColumnDTO[]

                for(const columnDTO of columnsDTO) {
                    const rows = await this.getDatabaseRows(database.id, columnDTO)
                
                    if(rows !== null) {
                        columnDTO.row = rows
                        columns.push(columnDTO)
                    }
                }
                
                const dto = {
                    id: database.id,
                    name: database.title[0].plain_text,
                    columns: columns
                } as DatabaseDTO
                
                return Database.fromJson(dto)
            })

            return await Promise.all(databaseList)
        } catch(err) {
            throw new Error(err.message)
        }
    }
}

export default DatabaseNotionAPI