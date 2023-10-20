import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const TechSearchSchema = new Schema({
    technology:{ type: mongoose.Schema.Types.ObjectId, ref: "Technology", required:true },
    count:{type: Number, required:true}
},
{ timestamps:true })

const TechSearch = model("TechnologySearch", TechSearchSchema)

type TechSearchType = InferSchemaType<typeof TechSearchSchema>

export { TechSearch, TechSearchType }