import {Character} from "./characters.interface";

export default interface HeroeDB {
    CreateOrUpdate(Heroe: Character) : Promise<Character>;
    CollectionCreate(Heroe: Character[],total:number,contador:number,action)

}