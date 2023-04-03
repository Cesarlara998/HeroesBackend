import {Character} from "./characters.interface";
import team from "./team.interface";

interface HeroeDB {
    CreateOrUpdate(Heroe: Character) : Promise<Character>;
    CollectionCreate(Heroe: Character[],total:number,contador:number,action)
}

interface TeamDB {
    CreateTeam(team: team) : Promise<{status:boolean,team:team}>;
    // CollectionCreate(Heroe: Character[],total:number,contador:number,action)
}

export {HeroeDB,TeamDB}