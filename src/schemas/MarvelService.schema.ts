import { model, Schema } from "mongoose";

const HeroeSchema: Schema = new Schema({
    date: {type:Date, default: Date.now()},
    HeroeCollection:[{type: Schema.Types.ObjectId, ref: 'Heroe'}],
})

const heroe = model("Heroe", HeroeSchema);
export default heroe