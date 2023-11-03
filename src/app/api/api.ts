import cors from "cors";
import express from "express"
import apiRoutes from "./endpoints/routes";
import { configDotenv } from "dotenv";
import { defaultErrorHandler } from "./endpoints/handlers/errors/handler";

configDotenv()

const app = express()
const port = 8000

app.use(cors())
app.use(express.json())
app.use("/api", apiRoutes)
app.use(defaultErrorHandler)

app.listen(port)
