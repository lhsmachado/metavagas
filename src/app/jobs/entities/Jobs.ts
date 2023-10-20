import mongoose, { InferSchemaType, Schema, Types, model } from "mongoose";
import paginate from "mongoose-paginate-v2"

interface IJobs {
    position:string,
    salary:number,
    cityID:Types.ObjectId,
    technology:Array<string>,
    website:string,
    company:string,
    companySize: 'pequena' | 'media' | 'grande',
    description:string,
    link:string,
    jobType: 'clt' | 'pj',
    localType: 'hibrido' | 'remoto' | 'presencial',
    experience: 'junior' | 'pleno' | 'senior'
}

const JobsSchema = new Schema<IJobs>({
    position:{ type:String, required:true},
    salary:{ type:Number, required:true },
    cityID: { type: mongoose.Schema.Types.ObjectId, ref: "City", required:true },
    technology:[{ type: mongoose.Schema.Types.ObjectId, ref: "Technology", required:true }],
    website:{type:String, required:true },
    company:{type:String, required:true},
    companySize: { type: String, required: true, enum: ['pequena', 'media', 'grande'], default: null },
    description:{type:String, required:true},
    link:{type:String, required:true},
    jobType:{type: String, required: true, enum: ['clt', 'pj'], default:null },
    localType: {type: String, required:true, enum: ['hibrido', 'remoto', 'presencial'], default: null},
    experience:{type: String, required:true, enum: ['junior', 'pleno', 'senior'], default:null}
},{
    timestamps:true
 })

JobsSchema.plugin(paginate)
const Jobs = model("Jobs", JobsSchema)

interface JobsType extends mongoose.Document, IJobs {}





export { Jobs, JobsType }