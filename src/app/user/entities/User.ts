import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required:true },
    password:{ type:String, required:true },
    email: { type:String, required:true, unique:true },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Jobs" }],
    searchs: [{
        city:{type:String},
        technology:{type:String}
    }]
},
{ timestamps:true })

const User = model("User", UserSchema)

type UserType = InferSchemaType<typeof UserSchema>

export { User, UserType }