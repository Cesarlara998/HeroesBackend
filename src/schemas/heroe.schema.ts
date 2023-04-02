import { model, Schema } from "mongoose";

const Heroe: Schema = new Schema({
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

const heroeSchema = model("heroe", Heroe);
export default heroeSchema