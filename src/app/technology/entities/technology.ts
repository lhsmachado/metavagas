import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const TechnologySchema = new Schema({
    technology:{ type:String, required:true}
   
},
{ timestamps:true })

const Technology = model("Technology", TechnologySchema)

type TechnologyType = InferSchemaType<typeof TechnologySchema>

export { Technology, TechnologyType }