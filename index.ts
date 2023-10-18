import express from "express"
import { configDotenv } from "dotenv";
import { Client } from "@notionhq/client";
import { DatabaseObjectResponse, DatePropertyItemObjectResponse, FormulaPropertyItemObjectResponse, NumberPropertyItemObjectResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

configDotenv()

const notion = new Client({auth: process.env.NOTION_KEY})
const app = express()
const port = 8000

app.use(express.json())

interface Property  {
    id: string;
    name: string;
    type: "number" | "date" | "formula"
}

type ChartBody = {
    database_id: string,
    x: Property,
    y: Property
}

const getDatabases = async () => {
    const dbs = await notion.search({
        filter: {
            property: "object",
            value: "database"
        }
    }) 

    const databases = dbs.results.map((db: DatabaseObjectResponse) => {
        return {
            id: db.id,
            title: db.title[0].plain_text
        }
    })

    return databases
}

const getProperties = async (databaseID: string) => {
    const db = await notion.databases.retrieve({
        database_id: databaseID
    }) 

    const props = Object.values(db.properties).map((prop) => {
        return {
            id: prop.id,
            name: prop.name,
            type: prop.type
        }
    })
    
    return props
}

const getPropertyData = (property) => {
    switch(property.type) {
        case "number":
            const numberProperty = property as NumberPropertyItemObjectResponse
            return numberProperty.number ? numberProperty.number : 0
        case "date":
            const dateProperty = property as DatePropertyItemObjectResponse
            return dateProperty.date?.start ? dateProperty.date?.start : "(date)"
        case "formula":
            const formulaProperty = property as FormulaPropertyItemObjectResponse
            const nProperty = formulaProperty.formula as NumberPropertyItemObjectResponse
            return nProperty.number ? nProperty.number : 0
        default:
            throw new Error("Unsuported Property type!")
    }
}

const getChartData = async(dbID: string, x: Property, y: Property) => {
    const database = await notion.databases.query({
        database_id: dbID,
        filter_properties: [x.id, y.id],
        sorts: [
            {
                property: x.name,
                direction: "ascending"
            }
        ]
    })

    const properties = database.results.map((p: PageObjectResponse) => p.properties)
    const x_label = properties.map((p) => getPropertyData(p[x.name]))
    const y_label = properties.map((p) => getPropertyData(p[y.name]))

    return {
        labels: x_label,
        datasets: [
            {
                data: y_label
            }
        ]
    }
}

app.get("/notion/database/:databaseID/properties", async(req, res) => {
    const { databaseID } = req.params
    try{
        const response = await getProperties(databaseID.toString())
        return res.status(200).json(response)
    } catch(err) {
        return res.status(500).json({ message: "Cannot retrieve data!"})
    }
})

app.get("/notion/databases", async (req, res) => {
    try {
        const response = await getDatabases()
        return res.status(200).json(response)
    } catch(err) {
        return res.status(500).json({ message: "Cannot retrieve data! "})
    }
})

app.post("/chart", async (req, res) => {
    const { database_id, x, y } = req.body as ChartBody
    try {
        const response = await getChartData(database_id, x, y)
        return res.status(200).json(response)
    } catch(err) {
        return res.status(500).json({ message: err })
    }
})


app.listen(port)