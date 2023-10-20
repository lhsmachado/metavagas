import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const CitySearchSchema = new Schema({
    technology:{ type: mongoose.Schema.Types.ObjectId, ref: "Technology", required:true },
    city:{ type: mongoose.Schema.Types.ObjectId, ref: "City", required:true },
    count:{type: Number, required:true}
},
{ timestamps:true })

const CitySearch = model("CitySearch", CitySearchSchema)

type CitySearchType = InferSchemaType<typeof CitySearchSchema>

export { CitySearch, CitySearchType }