import {Request, Response} from "express"
import { UserService } from "../services/UserService";
import { bodyCreateValidation } from "../utils/UserValidation";
import { STATUS_CODE } from "../../../utils/statusCode";
import { commonError } from "../../../utils/commonErrors";

class UserController {
    constructor(private service: UserService){}

    async create(req: Request , res: Response){
        const { body } = req

        try{
            await bodyCreateValidation.validate(body)
        }catch(e:any){
            return res.status(STATUS_CODE.BAD_REQUEST).json(commonError(e.errors, STATUS_CODE.BAD_REQUEST))
        }

        const result = await this.service.create(body)
        if('error' in result) {
            return res.status(result.status).json(result)
        }

        return res.status(STATUS_CODE.CREATED).json(result)
    }

}

export { UserController }