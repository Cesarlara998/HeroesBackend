import { model, Schema } from "mongoose";

const Collection: Schema = new Schema({
    date: {type:Date, default: Date.now()},
    HeroeCollection:[{type: Schema.Types.ObjectId, ref: 'heroe'}],
    action: {type:String},
})

const CharacterPetition = model("CharacterPetition", Collection);
export default CharacterPetition