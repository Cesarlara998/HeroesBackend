import { Character } from "../interfaces/characters.interface";
import { TeamDB } from "../interfaces/DB.interface";
import team from "../interfaces/team.interface";
import CharacterPetition from "../schemas/MarvelService.schema";
import heroeSchema from "../schemas/heroe.schema";
import TeamSchema from "../schemas/team.schema"; "../schemas/team.schema";

export default class TeamsDataSource implements TeamDB {
    constructor() { }
    async CreateTeam(team: team): Promise<{ status: boolean; team: team; }> {
        try {
            const petition = await new TeamSchema({
                ...team
            }).save();
            delete team.ip_owner;
            return { status: true, team: team }
        } catch (error) {
            throw error
        }
    }
}