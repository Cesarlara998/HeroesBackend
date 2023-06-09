import {Character} from "./characters.interface";
import team from "./team.interface";

interface HeroeDB {
    CreateOrUpdate(Heroe: Character) : Promise<any>;
    CollectionCreate(Heroe: Character[],total:number,contador:number,action);
    FindById(Id:string): Promise<any>;
}

interface TeamDB {
    CreateTeam(team: team) : Promise<{status:boolean,team:any}>;
    GetMyTeams(ip_owner:string): Promise<any[]>;
    DeleteTeam(id_team:string,ip_owner:string): Promise<{status:boolean,message:string}>;
    UpdateTeam(team:team,ip_owner:string): Promise<{status:boolean,message:string}>;
    PutHero(teamId:string,ip_owner:string,ChaaracterId:string);
    deleteHero(teamId:string,ip_owner:string,ChaaracterId:string): Promise<{status:boolean,message:string}>;
}

interface FavoritesDB {
    GetFavorite(ip_owner:String): Promise<any[]>;
    InsertFavorite(HeroeId:string,ip_owner: string): Promise<{status:boolean,message:string}>;
    DeleteFavorite(idHeroe,ip_owner): Promise<{status:boolean,message:string}>;
}

export {HeroeDB,TeamDB,FavoritesDB}