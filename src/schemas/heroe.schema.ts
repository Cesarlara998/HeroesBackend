import { model, Schema } from "mongoose";

const HeroeSchema: Schema = new Schema({
    thumbnail: {
        extension: {type: String},
        path: {type: String},
    },
    descripcion: {type: String},
    id:{type: Number},
    modified: {type: String},
    name:{type: String},
    resourceUri:{type: String},
})

const heroe = model("Heroe", HeroeSchema);
export default heroe