import { model, Schema } from "mongoose";

const Team: Schema = new Schema({
    date: {type:Date, default: Date.now()},
    name: {type: String,required:true},
    description : {type: String,required:true},
    ip_owner: {type:String,required:true},
    characters:[{type: Schema.Types.ObjectId, ref: 'heroe'}],
})
Team.methods.toJSON = function(){
    const toobject = this.toObject();
    delete toobject.ip_owner
    return toobject;
    
};
const TeamSchema = model("Team", Team);
export default TeamSchema