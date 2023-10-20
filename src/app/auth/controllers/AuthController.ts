import { Request, Response } from "express";
import * as yup from 'yup';
import { bodyValidation } from "../utils/authValidations";
import { STATUS_CODE } from "../../../utils/statusCode";
import { commonError } from "../../../utils/commonErrors";
import { AuthService } from "../services/AuthService";

class AuthController {
    constructor(private service: AuthService){}
    
    async login(req:Request, res:Response){

        const { body } = req
        
        try{
            await bodyValidation.validate(body)
        } catch(e:any){
            return res.status(STATUS_CODE.BAD_REQUEST).json(commonError(e.errors, STATUS_CODE.BAD_REQUEST))
        }

        const result = await this.service.login(body)
        if("error" in result) {
            return res.status(result.status).json(result)
        }

        return res.status(STATUS_CODE.OK).json(result)
    }
}

export { AuthController }