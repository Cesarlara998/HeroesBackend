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
    private readonly heroeDatasource: HeroeDataSource;
    private readonly teamDataSource: TeamsDataSource;
    constructor() {
        this.heroeDatasource = new HeroeDataSource;
        this.marvelService = new MarvelService();
        this.teamDataSource = new TeamsDataSource();

    }
    public get = async (request: Request, response: Response, next: NextFunction): Promise<Response<ContextPaginator> | Response<any, Record<string, any>>> => {
        try {
            return response.send( await this.teamDataSource.GetMyTeams(request.socket.remoteAddress));

        } catch (error) {
            return response.status(500).send('Error');

        }
    }

    public post = async (request: Request, response: Response, next: NextFunction): Promise<Response<ContextPaginator> | Response<any, Record<string, any>>> => {
        try {            
            const team: team = {description: request.body.description,name:request.body.name,ip_owner:request.socket.remoteAddress,};
            const teamDB = await this.teamDataSource.CreateTeam(team);
            return response.send(teamDB);
        } catch (error) {
            console.log(error);
            
            return response.status(500).send('Error');

        }
    }

    public put = async (request: Request, response: Response, next: NextFunction): Promise<Response<ContextPaginator> | Response<any, Record<string, any>>> => {
        try {            
            const heroe = await this.heroeDatasource.CreateOrUpdate(request.body.character);
            
            // const team: team = {description: request.body.description,name:request.body.name,ip_owner:request.socket.remoteAddress,};
            const teamDB = await this.teamDataSource.PutHero(request.body.team,request.socket.remoteAddress,heroe._id);
            
            return response.send({status:true,data:teamDB});
        } catch (error) {
            
            return response.status(500).send('Error');

        }
    }

    public delete = async (request: Request, response: Response, next: NextFunction): Promise<Response<ContextPaginator> | Response<any, Record<string, any>>> => {
        try {
            const idTeam = String(request.query.team)
            if (!idTeam) {
                return response.status(500).send('Team is required');
            }
            const deleteTeam = await this.teamDataSource.DeleteTeam(idTeam,request.socket.remoteAddress)
            return response.send(deleteTeam);
        } catch (error) {
            
            
            return response.status(500).send('Error');
1
        }
    }
    public patch = async (request: Request, response: Response, next: NextFunction): Promise<Response<ContextPaginator> | Response<any, Record<string, any>>> => {
        try {
            const part = String(request.query.part)
            if (!part) {
                return response.status(500).send('part is required');
            }
            let ds;
             if (part === "team") ds = await this.teamDataSource.UpdateTeam(request.body,request.socket.remoteAddress);
             if (part === "member"){ 
                const heroe = await this.heroeDatasource.CreateOrUpdate(request.body.member);                
                if (!heroe._id) return response.status(500).send('Heroe no encontrado');
                ds = await this.teamDataSource.deleteHero(request.body.team,request.socket.remoteAddress,heroe._id);
            }
             
            return response.send(ds);
        } catch (error) {
           console.log(error);
            
            
            return response.status(500).send('Error');
1
        }
    }
}