import { Request, Response } from "express";
import { STATUS_CODE } from "../../../utils/statusCode";
import { CitySearchService } from "../service/CitySearchService";
import { commonError } from "../../../utils/commonErrors";

class CitySearchController{
    constructor(private service: CitySearchService){}

    async dashboardData(req: Request, res: Response){
        try{
            const result = await this.service.DashboardData()

            return res.status(STATUS_CODE.OK).json(result)
        }catch(e:any){
            return res.status(STATUS_CODE.BAD_REQUEST).json(commonError(e.errors, STATUS_CODE.BAD_REQUEST))
        }
    }


}

export {CitySearchController}