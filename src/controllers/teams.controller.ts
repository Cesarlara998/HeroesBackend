import { Request, Response, NextFunction } from "express";
import MarvelService from "../services/marvel.service";
import HeroeDataSource from "../datasource/heroe.datasource";
import { Character } from "../interfaces/characters.interface";
import Petition from "../schemas/MarvelService.schema";
import Paginator from "../interfaces/paginator.interface";
import TeamsDataSource from "../datasource/teams.datasource";
import team from "../interfaces/team.interface";

interface ContextPaginator extends Paginator {
    data: Character[];
}

export default class TeamController {
    private readonly marvelService: MarvelService;
    private readonly dataSource: TeamsDataSource;
    constructor() {
        this.marvelService = new MarvelService();
        this.dataSource = new TeamsDataSource();

    }
    public get = async (request: Request, response: Response, next: NextFunction): Promise<Response<ContextPaginator> | Response<any, Record<string, any>>> => {
        try {
            return response.send('Error');

        } catch (error) {
            return response.status(500).send('Error');

        }
    }

    public post = async (request: Request, response: Response, next: NextFunction): Promise<Response<ContextPaginator> | Response<any, Record<string, any>>> => {
        try {            
            const team: team = {description: request.body.description,name:request.body.name,ip_owner:request.socket.remoteAddress,};
            const teamDB = await this.dataSource.CreateTeam(team);
            delete team.ip_owner;
            return response.send(teamDB);
        } catch (error) {
            console.log(error);
            
            return response.status(500).send('Error');

        }
    }

}