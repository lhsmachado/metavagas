import express from "express"
import dotenv from "dotenv"
dotenv.config()
import { DatabaseConfig } from "./database/DatabaseConfig"
import { routes as userRoutes } from "./routes/userRoutes" 
import { routes as authRoutes } from "./routes/authRoutes"
import { routes as jobsRoutes} from "./routes/jobsRoutes"
import { routes as dashboardRoutes} from "./routes/citySearchRoutes"
DatabaseConfig.initialize()

const app = express()
const port = process.env.PORT
app.use(express.json())
app.use(userRoutes)
app.use(authRoutes)
app.use(jobsRoutes)
app.use(dashboardRoutes)

app.listen(port, ()=> console.log(`Server running at ${port}`))