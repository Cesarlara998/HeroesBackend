import { model, Schema } from "mongoose";

const Favorite: Schema = new Schema({
    characters:[{type: Schema.Types.ObjectId, ref: 'heroe',unique: true, sparse: true, index: true}],
    ip_owner: {type:String,required:true}
})

const FavoriteSchema = model("favorite", Favorite);
export default FavoriteSchema