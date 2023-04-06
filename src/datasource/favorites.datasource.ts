import { FavoritesDB } from "../interfaces/DB.interface";
import { Character } from "../interfaces/characters.interface";
import FavoriteSchema from "../schemas/Favorite.schema";
import TeamSchema from "../schemas/Team.schema";

export default class FavoritesDataSource implements FavoritesDB{
    constructor() {}
    async GetFavorite(ip_owner: String): Promise<any[]> {
        try {
            const data =  await FavoriteSchema.findOne({ ip_owner: ip_owner }).populate("characters");
            return data.characters
        } catch (error) {
            throw error
        }
    }
    async InsertFavorite(HeroeId: String, ip_owner: string): Promise<{ status: boolean; message: string; }> {
        try {
            let FavoriteIndex = await FavoriteSchema.findOne({ ip_owner: ip_owner });
            if (!FavoriteIndex) {
                FavoriteIndex = new FavoriteSchema({ip_owner:ip_owner,characters:[]})
            }
            const fav =  await FavoriteSchema.updateOne(
                { ip_owner: ip_owner },
                { $addToSet: { characters: HeroeId } },
                { upsert: true }
              )
              if (fav.modifiedCount === 0) return {status: false,message: 'Heroe ya existente como favorito'};
            FavoriteIndex.save()
            return {status: true,message: 'Favorito agregado'}
        } catch (error) {  
            if (error?.code === 11000) throw "Heroe ya existente como favorito"
            throw error

        }
    }
    async DeleteFavorite(idHeroe: any, ip_owner: any): Promise<{ status: boolean; message: string; }> {
        try {
            
            const resp = await FavoriteSchema.updateOne({ ip_owner: ip_owner},
                { $pullAll: 
                    {characters: [
                        { _id:idHeroe}
                    ]} },
                    {new:true})
                
            return { status: true, message: 'Registro eliminado' }

        } catch (error) {
            throw error
        }    }


}