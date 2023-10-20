import { Router } from "express";
import { AuthModule } from "../app/auth/AuthModule";

const routes = Router()
const { controller } = AuthModule.getInstances()

routes.post('/login', controller.login.bind(controller))

export { routes }