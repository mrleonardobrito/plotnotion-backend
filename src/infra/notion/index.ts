import { Client } from "@notionhq/client"

type Connection = unknown

interface ConnectionManager {
    getConnection(): Connection
    disconnect(): void
    isConnected(): boolean
}

class NotionConnectionManager implements ConnectionManager {
    private _client: Client
    
    constructor() {
        this._client = new Client({
            auth: 'secret_4eLQrKRy29y2Tq3jrIu4H731wn0FcUTh6Je3Mca6HHm'
        })
    }   

    getConnection(): Client {
        return this._client
    }

    disconnect() {
        this._client = undefined
    }

    isConnected(): boolean {
        return this._client !== undefined
    }

}

export default NotionConnectionManager