import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const CitySchema = new Schema({
   name:{type:String, required:true},
   uf:{type:String, required:true}
},
{
   timestamps:true
} )



type CityType = InferSchemaType<typeof CitySchema>



const City = model("City", CitySchema)
export { City, CityType }