import mongoose, { Model, ObjectId } from "mongoose";
import { commonError } from "../../../utils/commonErrors";
import { STATUS_CODE } from "../../../utils/statusCode";
import { TechSearchType } from "../entities/techSearch";

class TechSearchRepository{
    constructor(private model:Model<TechSearchType>){}

    async create(data:any){
        try{
            return await this.model.create(data)
        }catch(e:any){
            return commonError(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }

    async findAndIncrement(data:string){
        console.log(data)
        const id = new mongoose.Types.ObjectId(data)
        try{
            return await this.model.updateOne(
                {
                    technology: id
                },
                { $inc: { count: 1 } },
                { new: true }
            )
        }
        catch(e:any){
            return commonError(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }

    async techsMostSearched(){
        return this.model.find()
        .sort({count: -1}).limit(5).populate("technology", "-createdAt -updatedAt -__v ").select("-createdAt -updatedAt -__v -_id")
    }
}

export { TechSearchRepository }