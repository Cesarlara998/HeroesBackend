import { model, Schema } from "mongoose";

const Collection: Schema = new Schema({
    date: {type:Date, default: Date.now()},
    HeroeCollection:[{type: Schema.Types.ObjectId, ref: 'heroe'}],
    offset:{type:Number},
    total:{type:Number},
})

const CharacterPetition = model("CharacterPetition", Collection);
export default CharacterPetition