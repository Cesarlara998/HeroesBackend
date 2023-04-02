import {Character} from "./Characters.interface";

export default interface HeroeDB {
    CreateOrUpdate(Heroe: Character) : Character;
    CollectionCreate(Heroe: Character[])

}