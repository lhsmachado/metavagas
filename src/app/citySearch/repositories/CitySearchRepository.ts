import { Model } from "mongoose";
import { CitySearch, CitySearchType } from "../entities/CitySearch";
import { ErrorResponseType, commonError } from "../../../utils/commonErrors";
import { STATUS_CODE } from "../../../utils/statusCode";


class CitySearchRepository{
    constructor(private model:Model<CitySearchType>){}

    async create(data:any){
        try{
            return await this.model.create(data)
        }catch(e:any){
            return commonError(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }

    
    async findAndIncrement(data: { city: any; technology: any; }) {
        try{
            return await this.model.findOneAndUpdate(
                {technology: data.technology, city:data.city},
                { $inc: { count: 1 } },
                { new: true })
        }
        catch(e:any){
            return commonError(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }

    async citySearchedbyTech(id: string){
        try{
            console.log('aqui', id)
            return this.model.find({technology:id}).sort({count: -1}).limit(5).populate("city", "-createdAt -updatedAt -__v ").populate('technology', "-createdAt -updatedAt -__v").select("-createdAt -updatedAt -__v")
        }catch(e:any){
            return commonError(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }

}

export { CitySearchRepository }