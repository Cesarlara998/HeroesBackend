import { Character } from "../interfaces/characters.interface";
import {HeroeDB} from "../interfaces/DB.interface";
import CharacterPetition from "../schemas/MarvelService.schema";
import heroeSchema from "../schemas/heroe.schema";

export default class HeroeDataSource implements HeroeDB {
    constructor() { }

    async CreateOrUpdate(heroe: Character): Promise<any> {
        try {
            const Search = await heroeSchema.findOne({ id: heroe.id });

        if (Search) {
            if (Search.modified !== heroe.modified) {
                Search.descripcion = heroe.descripcion;
                Search.modified = heroe.modified;
                Search.name = heroe.name;
                Search.resourceUri = heroe.resourceUri;
                Search.thumbnail.extension = heroe.thumbnail.extension;
                Search.thumbnail.path = heroe.thumbnail.path;
                await Search.save();
                return Search;
            }
            
            return Search;
        }
        const added = await heroeSchema.create({...heroe});
        
        return heroe
        } catch (error) {
            throw error
        }
        

    }
    async CollectionCreate(heroe: Character[],action) {
        try {
            const petition = new CharacterPetition({
                HeroeCollection: heroe,
                action: action
            }).save();
        } catch (error) {
            throw error
        }
    }



}