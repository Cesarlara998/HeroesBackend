import { model, Schema } from "mongoose";

const Team: Schema = new Schema({
    date: {type:Date, default: Date.now()},
    name: {type: String,required:true},
    description : {type: String,required:true},
    ip_owner: {type:String,required:true},
    heroes:[{type: Schema.Types.ObjectId, ref: 'heroe'}],
})

const TeamSchema = model("Team", Team);
export default TeamSchema