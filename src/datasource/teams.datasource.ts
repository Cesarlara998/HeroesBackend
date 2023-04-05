import { Character } from "../interfaces/characters.interface";
import { TeamDB } from "../interfaces/DB.interface";
import team from "../interfaces/team.interface";
import CharacterPetition from "../schemas/MarvelService.schema";
import heroeSchema from "../schemas/heroe.schema";
import TeamSchema from "../schemas/team.schema"; "../schemas/team.schema";

export default class TeamsDataSource implements TeamDB {
    constructor() { }
    async deleteHero(teamId: string, ip_owner: string, CharacterId: string): Promise<{ status: boolean; message: string; }> {
        try {
            
            const resp = await TeamSchema.updateOne({ ip_owner: ip_owner, _id: teamId },
                { $pullAll: 
                    {characters: [
                        { _id:CharacterId}
                    ]} },
                    {new:true})
                console.log(resp);
                
            return { status: true, message: 'Registro eliminado' }

        } catch (error) {
            throw error
        }
    }



    async UpdateTeam(team: team, ip_owner: string): Promise<{ status: boolean; message: string; }> {
        try {
            const resp = await TeamSchema.findOneAndUpdate({ ip_owner: ip_owner, _id: team._id }, { $set: team })
            console.log(resp);

            return { status: true, message: 'ok' }

        } catch (error) {
            throw error
        }
    }
    async GetMyTeams(ip_owner: string): Promise<any[]> {
        try {
            return await TeamSchema.find({ ip_owner: ip_owner }).populate("characters");
        } catch (error) {
            throw error
        }
    }
    async CreateTeam(team: team): Promise<{ status: boolean; team: any; }> {
        try {
            const petition = await new TeamSchema({
                ...team
            }).save();
            delete petition.ip_owner;
            return { status: true, team: petition }
        } catch (error) {
            throw error
        }
    }

    async PutHero(teamId: string, ip_owner: string, characterId: string) {
        try {
            const Search = await TeamSchema.findOne({ ip_owner: ip_owner, _id: teamId });
            Search.characters.push(characterId);
            Search.save()
            return Search.populate("characters");
        } catch (error) {
            throw error
        }
    }

    async DeleteTeam(id_team: string, ip_owner: string): Promise<{ status: boolean; message: string; }> {
        try {
            const deleteTeam = await TeamSchema.deleteOne({ ip_owner: ip_owner, _id: id_team });
            return { status: true, message: 'ok' }
        } catch (error) {
            throw error
        }
    }

}