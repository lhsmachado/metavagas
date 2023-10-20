import { Router } from "express";
import { CitySearchModule } from "../app/citySearch/CitySearchModule";

const routes = Router()
const { controller } = CitySearchModule.getInstances()

routes.get('/dashboard', controller.dashboardData.bind(controller))


export { routes }