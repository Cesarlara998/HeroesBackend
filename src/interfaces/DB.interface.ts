import {Character} from "./characters.interface";
import team from "./team.interface";

interface HeroeDB {
    CreateOrUpdate(Heroe: Character) : Promise<Character>;
    CollectionCreate(Heroe: Character[],total:number,contador:number,action)
}

interface TeamDB {
    CreateTeam(team: team) : Promise<{status:boolean,team:any}>;
    GetMyTeams(ip_owner:string): Promise<any[]>;
    DeleteTeam(id_team:string,ip_owner:string): Promise<{status:boolean,message:string}>;
    PutHero(teamId:string,ip_owner:string,ChaaracterId:string);
    
}


export {HeroeDB,TeamDB}