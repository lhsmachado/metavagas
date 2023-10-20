import {Request, Response} from "express"
import { bodyCreateValidation } from "../utils/JobsValidation";
import { STATUS_CODE } from "../../../utils/statusCode";
import { ErrorResponseType, commonError } from "../../../utils/commonErrors";
import { JobsService } from "../services/JobsService";

class JobsController {
    constructor(private service: JobsService){}

    async create(req: Request , res: Response){
        const { body } = req
        console.log(body)
        try{
            await bodyCreateValidation.validate(body)
        }catch(e:any){
            return res.status(STATUS_CODE.BAD_REQUEST).json(commonError(e.errors, STATUS_CODE.BAD_REQUEST))
        }

        const result = await this.service.create(body)
        console.log('erro',result)
        if(result.error) {
            return res.status(result.status).json(result)
        }

        return res.status(STATUS_CODE.CREATED).json(result)
    }
    
    async find(req: Request , res: Response){
        
        const filter = {
            position: req.query.position,
            salary: req.query.salary,
            cityID: req.query.cityID,
            company: req.query.company,
            description: req.query.description,
            link: req.query.link,
            technology: Array.isArray(req.query.technology) ? req.query.technology : [req.query.technology].filter(Boolean),
            minSalary: req.query.minSalary,
            maxSalary: req.query.maxSalary,
            companySize: req.query.companySize,
            experience: req.query.experience,
            page: req.query.page,
            limit: req.query.limit
        };

        try{
            const teste = await this.service.findJobs(filter)
            return res.status(STATUS_CODE.OK).json(teste)
        }catch(e:any){
            return res.status(STATUS_CODE.BAD_REQUEST).json(commonError(e.errors, STATUS_CODE.BAD_REQUEST))
        }
    }
}

export { JobsController }