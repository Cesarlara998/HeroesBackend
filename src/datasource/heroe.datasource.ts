import { Character } from "../interfaces/Characters.interface";
import HeroeDB from "../interfaces/heroeDB.interface";

export default class HeroeDataSource implements HeroeDB  {
    constructor(){}

    CreateOrUpdate(Heroe: Character):Character {
        throw new Error("Method not implemented.");
    }
    CollectionCreate(Heroe: Character[]) {
        throw new Error("Method not implemented.");
    }
    

    
}