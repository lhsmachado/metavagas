import { Model } from "mongoose";
import { TechnologyType } from "../entities/technology";
import { ErrorResponseType, commonError } from "../../../utils/commonErrors";
import { STATUS_CODE } from "../../../utils/statusCode";
import { TechnologyCreateResponse, TechnologyFindByNameResponse } from "../utils/technologyTypes";

class TechnologyRepository{
    constructor(private model: Model<TechnologyType>){}

    async create(technology:string): Promise<TechnologyCreateResponse | ErrorResponseType | null>{{
        try{
            return await this.model.create({technology})
        }catch(e:any){
            return commonError(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
        }}
    }

    async findByName(technology:string): Promise<TechnologyFindByNameResponse | ErrorResponseType | null>{
        return await this.model.findOne({technology})
    }

}

export { TechnologyRepository }